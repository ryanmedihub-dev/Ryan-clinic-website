import crypto from "crypto";
import { SESSION_EXPIRY_MS } from "./config.js";

/**
 * In-memory registry of processed sessions to prevent duplicate CRM submissions
 * on rapid double-clicks or repeated requests within the same server process.
 *
 * NOTE: This is an in-memory best-effort guard. As per system constraints,
 * no database locking or MongoDB models are used.
 */
const processedSessions = new Map();

/**
 * Prunes expired entries from memory every 15 minutes.
 */
function pruneExpiredSessions() {
  const now = Date.now();
  for (const [sessionId, data] of processedSessions.entries()) {
    if (now - data.processedAt > SESSION_EXPIRY_MS) {
      processedSessions.delete(sessionId);
    }
  }
}

// Periodic cleanup
if (typeof setInterval !== "undefined") {
  setInterval(pruneExpiredSessions, 1000 * 60 * 15).unref?.();
}

/**
 * Checks if an interview session has already been evaluated and processed.
 *
 * @param {string} sessionId
 * @returns {boolean}
 */
export function isSessionAlreadyProcessed(sessionId) {
  if (!sessionId) return false;
  return processedSessions.has(sessionId);
}

/**
 * Marks an interview session as processed in the runtime cache.
 *
 * @param {string} sessionId
 * @param {Object} meta
 * @param {boolean} meta.passed
 * @param {number} meta.overallScore
 */
export function markSessionAsProcessed(sessionId, { passed, overallScore }) {
  if (!sessionId) return;
  processedSessions.set(sessionId, {
    passed,
    overallScore,
    processedAt: Date.now(),
  });
}

/**
 * Derives HMAC secret from server environment
 */
function getSigningSecret() {
  const secret =
    process.env.AI_INTERVIEW_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "clinic-ryan-ai-screening-secret-fallback-2026";
  return secret;
}

/**
 * Creates a signed, tamper-resistant session token.
 * Contains non-PII interview metadata, MCQ options, and authoritative answer key.
 *
 * @param {Object} params
 * @param {string} params.position
 * @param {string} params.experienceType
 * @param {number|string} params.yearsOfExperience
 * @param {Array<{ id: string, text: string, options: Array<{ id: string, text: string }>, correctOptionId: string }>} params.questions
 * @returns {string} Signed token: base64UrlPayload.signature
 */
export function createInterviewSessionToken({ position, experienceType, yearsOfExperience, questions }) {
  const sessionId = "ses_" + crypto.randomBytes(12).toString("hex");
  const now = Date.now();

  const payload = {
    sessionId,
    position: String(position || "Other"),
    expType: String(experienceType || "Fresher"),
    expYears: Number(yearsOfExperience) || 0,
    questions: questions.map((q, idx) => ({
      id: String(q.id || `q_${idx + 1}`),
      text: String(q.text || "").trim(),
      options: (q.options || []).map((opt, optIdx) => ({
        id: String(opt.id || `opt_${optIdx + 1}`),
        text: String(opt.text || "").trim(),
      })),
      correctOptionId: String(q.correctOptionId || "opt_1"),
    })),
    iat: now,
    exp: now + SESSION_EXPIRY_MS,
  };

  const payloadStr = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", getSigningSecret())
    .update(payloadStr)
    .digest("base64url");

  return {
    sessionId,
    token: `${payloadStr}.${signature}`,
    questions: payload.questions,
    expiresAt: payload.exp,
    durationSeconds: Math.floor(SESSION_EXPIRY_MS / 1000),
  };
}

/**
 * Verifies and decodes the signed session token.
 * Ensures the authoritative question set, options, answer key, and 3-minute expiry are enforced.
 *
 * @param {string} token
 * @returns {{ valid: boolean, payload?: Object, error?: string, expired?: boolean }}
 */
export function verifyInterviewSessionToken(token) {
  if (!token || typeof token !== "string") {
    return { valid: false, error: "Missing or invalid session token." };
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return { valid: false, error: "Malformed session token format." };
  }

  const [payloadStr, signature] = parts;
  const expectedSig = crypto
    .createHmac("sha256", getSigningSecret())
    .update(payloadStr)
    .digest("base64url");

  // Constant-time comparison to prevent timing attacks
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSig);

  if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
    return { valid: false, error: "Session signature verification failed." };
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadStr, "base64url").toString("utf8"));

    if (!payload || !payload.sessionId || !Array.isArray(payload.questions)) {
      return { valid: false, error: "Invalid session payload structure." };
    }

    if (Date.now() > payload.exp) {
      return { valid: false, expired: true, error: "Assessment session has expired (4-minute time limit exceeded)." };
    }

    return { valid: true, payload };
  } catch {
    return { valid: false, error: "Failed to parse session payload." };
  }
}
