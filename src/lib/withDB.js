import { DBConnection } from "./db";
import { NextResponse } from "next/server";

export function withDB(handler) {
  return async function wrappedHandler(req, ...args) {
    try {
      await DBConnection();
      return await handler(req, ...args);
    } catch (error) {
      console.error("DB Connection Error:", error);
      return NextResponse.json({ success: false, message: "Database connection failed" }, { status: 500 });
    }
  };
}
