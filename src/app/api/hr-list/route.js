import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://www.ryanmedihub.com/api/hr/employees", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Revalidate periodically so newly added or updated HR employees reflect automatically
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`CRM HR API responded with status ${res.status}`);
      return NextResponse.json(
        { success: false, message: "Failed to fetch HR list from CRM" },
        { status: res.status }
      );
    }

    const data = await res.json();
    if (!data.success || !Array.isArray(data.employees)) {
      return NextResponse.json(
        { success: false, message: "Invalid response from CRM HR API" },
        { status: 502 }
      );
    }

    const employees = data.employees.map((emp) => ({
      _id: String(emp._id),
      name: String(emp.name || ""),
    }));

    return NextResponse.json({
      success: true,
      employees,
    });
  } catch (error) {
    console.error("Error in /api/hr-list proxy:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error fetching HR list" },
      { status: 500 }
    );
  }
}
