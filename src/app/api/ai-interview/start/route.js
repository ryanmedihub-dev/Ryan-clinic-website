import { NextResponse } from "next/server";
import { generateInterviewQuestions } from "@/lib/ai-interview/openai";
import { createInterviewSessionToken } from "@/lib/ai-interview/session";
import { TOTAL_QUESTIONS, ASSESSMENT_DURATION_SECONDS } from "@/lib/ai-interview/config";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const { position, experienceType, yearsOfExperience, language: reqLanguage } = body;

    if (!position || typeof position !== "string") {
      return NextResponse.json(
        { success: false, message: "Position is required to start interview." },
        { status: 400 }
      );
    }

    // Strictly validate language parameter — only "en" and "hinglish" allowed, defaults to "en"
    const rawLang = String(reqLanguage || "en").toLowerCase().trim();
    const language = rawLang === "hinglish" ? "hinglish" : "en";

    // Generate role-specific MCQs in selected language (server-side only)
    const questions = await generateInterviewQuestions({
      position: position.trim(),
      experienceType: experienceType || "Fresher",
      yearsOfExperience: Number(yearsOfExperience) || 0,
      language,
    });

    // Create signed, tamper-resistant session token sealing answer key and 4-min expiry
    const { sessionId, token, questions: sessionQuestions, expiresAt } = createInterviewSessionToken({
      position: position.trim(),
      experienceType: experienceType || "Fresher",
      yearsOfExperience: Number(yearsOfExperience) || 0,
      language,
      questions,
    });

    // Return questions with 4 options to client while strictly stripping correctOptionId
    return NextResponse.json({
      success: true,
      sessionId,
      sessionToken: token,
      language,
      totalQuestions: TOTAL_QUESTIONS,
      durationSeconds: ASSESSMENT_DURATION_SECONDS,
      expiresAt,
      questions: sessionQuestions.map((q, idx) => ({
        id: q.id,
        questionNumber: idx + 1,
        text: q.text,
        options: (q.options || []).map((opt) => ({
          id: opt.id,
          text: opt.text,
        })),
      })),
    });
  } catch (err) {
    console.error("[AI-Interview] Error in /api/ai-interview/start:", err.message);
    return NextResponse.json(
      { success: false, message: "Unable to initialize interview assessment. Please try again." },
      { status: 500 }
    );
  }
}
