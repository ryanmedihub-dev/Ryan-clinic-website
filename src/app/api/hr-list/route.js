import { NextResponse } from "next/server";
import { AUTHORITATIVE_ACTIVE_HR_LIST } from "@/lib/hrEmployees";

export async function GET() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch("https://www.ryanmedihub.com/api/hr/employees", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      // Revalidate periodically so newly added or updated HR employees reflect automatically
      next: { revalidate: 60 },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.employees) && data.employees.length > 0) {
        const employees = data.employees.map((emp) => ({
          _id: String(emp._id),
          name: String(emp.name || ""),
        }));

        return NextResponse.json({
          success: true,
          employees,
          source: "crm",
        });
      }
    }

    console.warn(
      `CRM HR API responded with status ${res.status}. Falling back to authoritative HR list.`
    );
    return NextResponse.json({
      success: true,
      employees: AUTHORITATIVE_ACTIVE_HR_LIST,
      source: "fallback",
    });
  } catch (error) {
    console.warn(
      "Failed to reach CRM HR API. Falling back to authoritative HR list:",
      error?.name === "AbortError" ? "Request timed out" : error?.message || error
    );
    return NextResponse.json({
      success: true,
      employees: AUTHORITATIVE_ACTIVE_HR_LIST,
      source: "fallback",
    });
  }
}
