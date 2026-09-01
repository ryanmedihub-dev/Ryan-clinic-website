import { NextResponse } from "next/server";
import {
  verifyInterviewSessionToken,
  isSessionAlreadyProcessed,
  markSessionAsProcessed,
} from "@/lib/ai-interview/session.js";
import { evaluateCandidateAnswers } from "@/lib/ai-interview/openai.js";
import {
  validateAndNormalizeCandidateData,
  submitPassingCandidateToCrm,
} from "@/lib/ai-interview/crm-submission.js";
import { TOTAL_QUESTIONS } from "@/lib/ai-interview/config.js";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const { sessionToken, candidateData, answers, timedOut } = body;

    // 1. Session token validation
    if (!sessionToken || typeof sessionToken !== "string") {
      return NextResponse.json(
        { success: false, message: "Valid interview session token is required." },
        { status: 400 }
      );
    }

    // 2. Answers must be an array (can be partial when timer expired)
    if (!Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json(
        { success: false, message: "At least one answer must be submitted for evaluation." },
        { status: 400 }
      );
    }

    // 3. Verify cryptographic HMAC session.
    //    When timedOut=true the client is auto-submitting at expiry — the 15s transit buffer
    //    in SESSION_EXPIRY_MS absorbs last-second race conditions, so we still verify normally.
    const verification = verifyInterviewSessionToken(sessionToken);
    if (!verification.valid || !verification.payload) {
      if (verification.expired) {
        // Even if the token just ticked over expiry, evaluate whatever was submitted
        // ONLY if this is a timer-triggered submission (timedOut=true). Otherwise reject.
        if (!timedOut) {
          console.warn("[AI-Interview] Submission rejected: 4-minute assessment time limit expired.");
          return NextResponse.json(
            { success: false, expired: true, message: "Assessment session has expired (4-minute time limit exceeded)." },
            { status: 400 }
          );
        }
        // For timedOut path: parse the payload without the expiry guard so we can still evaluate.
        // The HMAC signature was already verified — only the timestamp check failed.
        const expiredPayload = (() => {
          try {
            const parts = sessionToken.split(".");
            if (parts.length !== 2) return null;
            return JSON.parse(Buffer.from(parts[0], "base64url").toString("utf8"));
          } catch {
            return null;
          }
        })();
        if (!expiredPayload || !expiredPayload.sessionId || !Array.isArray(expiredPayload.questions)) {
          return NextResponse.json(
            { success: false, message: "Invalid session payload after expiry." },
            { status: 401 }
          );
        }
        // Fall through with expired payload — treat it as a valid timed-out submission
        return await processEvaluation({ payload: expiredPayload, answers, candidateData, timedOut: true });
      }
      return NextResponse.json(
        { success: false, message: verification.error || "Session verification failed." },
        { status: 401 }
      );
    }

    // PATH A — Manual submit: enforce all 7 answers are present
    if (!timedOut && answers.length !== TOTAL_QUESTIONS) {
      return NextResponse.json(
        { success: false, message: `All ${TOTAL_QUESTIONS} questions must be answered for evaluation.` },
        { status: 400 }
      );
    }

    return await processEvaluation({ payload: verification.payload, answers, candidateData, timedOut: !!timedOut });
  } catch (err) {
    console.error("[AI-Interview] Error in /api/ai-interview/evaluate:", err.message);
    return NextResponse.json(
      { success: false, message: "Unable to finalize interview assessment." },
      { status: 500 }
    );
  }
}

/**
 * Core evaluation logic shared by both PATH A (manual submit) and PATH B (timer expiry).
 * Missing answers are treated as incorrect — denominator always = TOTAL_QUESTIONS.
 *
 * @param {{ payload: Object, answers: Array, candidateData: Object, timedOut: boolean }} args
 */
async function processEvaluation({ payload, answers, candidateData, timedOut }) {
  const { sessionId, position, expType, expYears, questions } = payload;

  // 4. Duplicate submission check (in-memory process-level guard)
  if (isSessionAlreadyProcessed(sessionId)) {
    console.log(`[AI-Interview] Duplicate submission ignored for already-processed session: ${sessionId}`);
    return NextResponse.json({
      success: true,
      completed: true,
    });
  }

  // 5. Candidate profile validation & position consistency check
  const validation = validateAndNormalizeCandidateData(candidateData, position);
  if (!validation.valid) {
    return NextResponse.json(
      { success: false, message: validation.error || "Invalid candidate profile." },
      { status: 400 }
    );
  }

  // 6. Build answer map from submitted answers (partial is OK on timer expiry)
  const answerMap = new Map();
  const seenQuestionIds = new Set();

  for (const a of answers) {
    if (!a || !a.questionId) continue;
    if (!a.selectedOptionId) continue; // treat missing selectedOptionId as unanswered

    if (seenQuestionIds.has(a.questionId)) {
      return NextResponse.json(
        { success: false, message: "Duplicate question answer detected." },
        { status: 400 }
      );
    }

    // Verify the submitted option actually belongs to this question's authoritative options
    const sessionQ = questions.find((q) => q.id === a.questionId);
    if (sessionQ) {
      const optionExists =
        Array.isArray(sessionQ.options) &&
        sessionQ.options.some((opt) => opt.id === String(a.selectedOptionId).trim());
      if (!optionExists) {
        return NextResponse.json(
          { success: false, message: `Invalid option selected for question ${a.questionId}.` },
          { status: 400 }
        );
      }
    }

    seenQuestionIds.add(a.questionId);
    answerMap.set(String(a.questionId), String(a.selectedOptionId).trim());
  }

  // 7. Build qaPairs — every authoritative question gets an entry.
  //    Unanswered questions receive an empty selectedOptionId (never === correctOptionId → incorrect).
  const qaPairs = questions.map((q) => ({
    questionId: q.id,
    questionText: q.text,
    selectedOptionId: answerMap.get(q.id) || "",
    correctOptionId: q.correctOptionId || "",
  }));

  // 8. Perform deterministic server-side MCQ evaluation
  const evalResult = await evaluateCandidateAnswers({
    position,
    experienceType: expType,
    yearsOfExperience: expYears,
    qaPairs,
  });

  if (!evalResult.success) {
    return NextResponse.json(
      { success: false, message: evalResult.error || "Assessment processing failed. Please retry." },
      { status: 500 }
    );
  }

  // 9. Conditional CRM & Google Sheets routing based on threshold (BASE_SCORE = 65)
  if (evalResult.passed) {
    const dispatchResult = await submitPassingCandidateToCrm(validation.sanitized);

    if (!dispatchResult.crmOk && !dispatchResult.sheetOk) {
      console.error(
        `[AI-Interview] Session ${sessionId} passing submission failed at both CRM (${dispatchResult.crmError}) and Sheets (${dispatchResult.sheetError}).`
      );
      return NextResponse.json(
        { success: false, message: "Submission service temporarily unavailable. Please click retry." },
        { status: 500 }
      );
    }

    markSessionAsProcessed(sessionId, { passed: true, overallScore: evalResult.overallScore });

    console.log(
      `[AI-Interview] Session ${sessionId} PASSED (Score: ${evalResult.overallScore}% — ${evalResult.correctCount}/${TOTAL_QUESTIONS})` +
        (timedOut ? " [auto-submit on expiry]" : "") +
        `. CRM: ${dispatchResult.crmOk ? "OK" : "FAILED"} | Sheets: ${dispatchResult.sheetOk ? "OK" : "FAILED"}.`
    );
  } else {
    markSessionAsProcessed(sessionId, { passed: false, overallScore: evalResult.overallScore });

    console.log(
      `[AI-Interview] Session ${sessionId} NOT PASS (Score: ${evalResult.overallScore}% — ${evalResult.correctCount}/${TOTAL_QUESTIONS})` +
        (timedOut ? " [auto-submit on expiry]" : "") +
        `. Excluded from RyanCRM and Google Sheets.`
    );
  }

  // 10. Strictly neutral zero-leak response
  return NextResponse.json({ success: true, completed: true });
}
