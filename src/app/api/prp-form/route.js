import { NextResponse } from "next/server";
import { DBConnection } from "@/lib/db";
import PRPSubmission from "@/models/PRPSubmission";
import { appendPRPToGoogleSheet } from "@/lib/googleSheets";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      fullName,
      phone,
      email,
      age,
      gender,
      city,
      currentSessionNumber,
      totalSessionsCompleted,
    } = body;

    // ── 1. Server-side validation ──────────────────────────────────────────
    const errors = {};

    if (!fullName || !String(fullName).trim()) {
      errors.fullName = "Full name is required.";
    }

    const phoneClean = String(phone || "").replace(/[\s-]/g, "");
    if (!phoneClean) {
      errors.phone = "Phone number is required.";
    } else if (!/^\+?[0-9]{10,15}$/.test(phoneClean)) {
      errors.phone = "Please enter a valid 10-digit phone number.";
    }

    if (email && email.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        errors.email = "Please enter a valid email address.";
      }
    }

    const ageNum = Number(age);
    if (!age && age !== 0) {
      errors.age = "Age is required.";
    } else if (!Number.isInteger(ageNum) || ageNum < 1 || ageNum > 120) {
      errors.age = "Please enter a valid age (1–120).";
    }

    if (!gender || !["Male", "Female", "Other"].includes(gender)) {
      errors.gender = "Please select a valid gender.";
    }

    if (!city || !String(city).trim()) {
      errors.city = "City is required.";
    }

    const sessionNum = Number(currentSessionNumber);
    if (!currentSessionNumber && currentSessionNumber !== 0) {
      errors.currentSessionNumber = "Current session number is required.";
    } else if (!Number.isInteger(sessionNum) || sessionNum < 1 || sessionNum > 5) {
      errors.currentSessionNumber = "Session number must be between 1 and 5.";
    }

    const completedNum = Number(totalSessionsCompleted);
    if (totalSessionsCompleted === "" || totalSessionsCompleted === undefined || totalSessionsCompleted === null) {
      errors.totalSessionsCompleted = "Total sessions completed is required.";
    } else if (!Number.isInteger(completedNum) || completedNum < 0) {
      errors.totalSessionsCompleted = "Total sessions completed must be 0 or higher.";
    } else if (completedNum >= sessionNum) {
      // e.g. currentSession=2, completed=5 is invalid
      errors.totalSessionsCompleted =
        "Total sessions completed must be less than the current session number.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, message: "Validation failed.", errors },
        { status: 400 }
      );
    }

    // ── 2. Database save ───────────────────────────────────────────────────
    await DBConnection();

    const submission = await PRPSubmission.create({
      fullName: String(fullName).trim(),
      phone: phoneClean,
      email: email ? String(email).trim().toLowerCase() : "",
      age: ageNum,
      gender,
      city: String(city).trim(),
      currentSessionNumber: sessionNum,
      totalSessionsCompleted: completedNum,
    });

    // ── 3. Append to Google Sheets ─────────────────────────────────────────
    try {
      await appendPRPToGoogleSheet({
        createdAt: submission.createdAt,
        fullName: submission.fullName,
        phone: submission.phone,
        email: submission.email,
        age: submission.age,
        gender: submission.gender,
        city: submission.city,
        currentSessionNumber: submission.currentSessionNumber,
        totalSessionsCompleted: submission.totalSessionsCompleted,
      });
    } catch (sheetErr) {
      // Log error safely without leaking credentials or tokens
      console.error(
        "[/api/prp-form] Google Sheets append failed for submission ID:",
        submission._id,
        sheetErr?.message || sheetErr
      );

      // Controlled server error: do NOT report complete success and do NOT delete MongoDB document
      return NextResponse.json(
        {
          success: false,
          message: "Your submission was saved, but failed to sync to our records. Please contact support.",
        },
        { status: 500 }
      );
    }

    // ── 4. Success only after BOTH MongoDB + Google Sheets succeed ─────────
    return NextResponse.json(
      { success: true, id: submission._id },
      { status: 201 }
    );
  } catch (err) {
    console.error("[/api/prp-form] Error:", err?.message || err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

