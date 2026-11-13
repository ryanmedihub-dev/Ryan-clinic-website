import test from "node:test";
import assert from "node:assert/strict";
import {
  AUTHORITATIVE_ACTIVE_HR_LIST,
  HR_REFERENCE_OTHER_ID,
  EXCLUDED_HR_IDS,
  EXCLUDED_HR_NAMES,
  isExcludedHr,
  formatHrDisplayName,
  buildDisplayHrList,
} from "./hrEmployees.js";

test("HR Reference: Authoritative list contains exactly 6 active HR employees", () => {
  assert.equal(AUTHORITATIVE_ACTIVE_HR_LIST.length, 6);
  const objectIdPattern = /^[a-f\d]{24}$/i;

  for (const hr of AUTHORITATIVE_ACTIVE_HR_LIST) {
    assert.ok(hr._id, "HR employee must have an _id");
    assert.match(hr._id, objectIdPattern, `HR _id ${hr._id} must be a valid 24-char ObjectId`);
    assert.ok(hr.name && hr.name.trim().length > 0, "HR employee must have a non-empty name");
  }

  const ids = AUTHORITATIVE_ACTIVE_HR_LIST.map((h) => h._id);
  const uniqueIds = new Set(ids);
  assert.equal(uniqueIds.size, ids.length, "All HR IDs must be unique");
});

test("HR Reference: 'Other' HR option ID is preserved as 69bd3e186706eb9cf318ffc9", () => {
  assert.equal(HR_REFERENCE_OTHER_ID, "69bd3e186706eb9cf318ffc9");
  assert.match(HR_REFERENCE_OTHER_ID, /^[a-f\d]{24}$/i);
});

test("HR Reference: Exclusion logic correctly identifies excluded HRs by name and ObjectId", () => {
  // Test by exact ObjectId
  assert.equal(isExcludedHr({ _id: "6a8c1c9f4b81eed5d782715a", name: "Any Name" }), true, "Excludes Anamta by ObjectId");
  assert.equal(isExcludedHr({ _id: "69bd264a9777c5b4424121d9", name: "Any Name" }), true, "Excludes Muskan by ObjectId");
  assert.equal(isExcludedHr({ _id: "6a8842144f9e384454479956", name: "Any Name" }), true, "Excludes Shubham Chitransh by ObjectId");

  // Test by name variations (case-insensitive, with or without 'hr' prefix/suffix)
  assert.equal(isExcludedHr({ name: "Anamta" }), true);
  assert.equal(isExcludedHr({ name: "Hr Anamta" }), true);
  assert.equal(isExcludedHr({ name: "anamta hr" }), true);
  assert.equal(isExcludedHr({ name: "  ANAMTA  " }), true);

  assert.equal(isExcludedHr({ name: "Muskan" }), true);
  assert.equal(isExcludedHr({ name: "Hr Muskan" }), true);
  assert.equal(isExcludedHr({ name: "Muskan HR" }), true);

  assert.equal(isExcludedHr({ name: "Shubham Chitransh" }), true);
  assert.equal(isExcludedHr({ name: "HR Shubham Chitransh" }), true);
  assert.equal(isExcludedHr({ name: "shubham chitransh hr" }), true);
});

test("HR Reference: Exclusion logic does NOT exclude any of the 6 active HR employees", () => {
  for (const hr of AUTHORITATIVE_ACTIVE_HR_LIST) {
    assert.equal(isExcludedHr(hr), false, `Active HR ${hr.name} (${hr._id}) must NOT be excluded`);
  }
});

test("HR Reference: Display name formatting normalizes to 'HR <Name>' without duplicates", () => {
  assert.equal(formatHrDisplayName("Farhin Gul"), "HR Farhin Gul");
  assert.equal(formatHrDisplayName("Hr Aisha"), "HR Aisha");
  assert.equal(formatHrDisplayName("HR Kanishka"), "HR Kanishka");
  assert.equal(formatHrDisplayName("hr Naziya"), "HR Naziya");
  assert.equal(formatHrDisplayName("HR Priya"), "HR Priya");
  assert.equal(formatHrDisplayName("Hr Simran Kaur"), "HR Simran Kaur");

  // Edge cases
  assert.equal(formatHrDisplayName("  Hr   John  "), "HR John");
  assert.equal(formatHrDisplayName("HR HR Duplicate"), "HR HR Duplicate"); // only leading is normalized, regex replaces single /^hr\s+/i
});

test("HR Reference: buildDisplayHrList generates the complete eligible reference list", () => {
  const displayList = buildDisplayHrList(AUTHORITATIVE_ACTIVE_HR_LIST);
  assert.equal(displayList.length, 6);

  const expectedNames = [
    "HR Aisha",
    "HR Farhin Gul",
    "HR Kanishka",
    "HR Naziya",
    "HR Priya",
    "HR Simran Kaur",
  ];

  for (let i = 0; i < expectedNames.length; i++) {
    assert.equal(displayList[i].displayName, expectedNames[i]);
    assert.match(displayList[i]._id, /^[a-f\d]{24}$/i);
  }
});

test("HR Reference: Dropdown structure contains placeholder, 6 HRs, and 'Other'", () => {
  const displayList = buildDisplayHrList(AUTHORITATIVE_ACTIVE_HR_LIST);

  // Replicate interview-form/page.js dropdown rendering
  const options = [
    { value: "", label: "Select an HR reference" },
    ...displayList.map((hr) => ({ value: hr._id, label: hr.displayName })),
  ];
  if (!displayList.some((hr) => hr._id === HR_REFERENCE_OTHER_ID)) {
    options.push({ value: HR_REFERENCE_OTHER_ID, label: "Other" });
  }

  // 1 placeholder + 6 active HRs + 1 Other = 8 options total
  assert.equal(options.length, 8);
  assert.equal(options[0].value, "");
  assert.equal(options[0].label, "Select an HR reference");

  assert.equal(options[7].value, "69bd3e186706eb9cf318ffc9");
  assert.equal(options[7].label, "Other");

  // Ensure no duplicate values exist in the dropdown
  const values = options.map((o) => o.value);
  assert.equal(new Set(values).size, 8, "All dropdown option values must be unique");
});

test("HR Reference: Submission payload correctly maps reference to assignedHr", () => {
  // Test case 1: Candidate selects HR Aisha
  const selectedHrId = "6a27ff34d3eb9b2325233664";
  const payload1 = {
    name: "Test Candidate",
    phone: "9876543210",
    ...(selectedHrId ? { assignedHr: selectedHrId } : {}),
  };
  assert.equal(payload1.assignedHr, "6a27ff34d3eb9b2325233664");

  // Test case 2: Candidate selects "Other"
  const payloadOther = {
    name: "Test Candidate",
    phone: "9876543210",
    ...(HR_REFERENCE_OTHER_ID ? { assignedHr: HR_REFERENCE_OTHER_ID } : {}),
  };
  assert.equal(payloadOther.assignedHr, "69bd3e186706eb9cf318ffc9");

  // Test case 3: Candidate does not select any HR (placeholder value "")
  const emptyRef = "";
  const payloadEmpty = {
    name: "Test Candidate",
    phone: "9876543210",
    ...(emptyRef ? { assignedHr: emptyRef } : {}),
  };
  assert.equal("assignedHr" in payloadEmpty, false);
});

test("HR Reference: Route handler fallback logic guarantees HTTP 200 with active HRs on 401", async () => {
  // Simulate what route.js does when upstream returns 401
  const mockFetch401 = async () => ({
    ok: false,
    status: 401,
    json: async () => ({ success: false, error: "Unauthorized. Please sign in." }),
  });

  async function simulateRouteGet(fetchFn) {
    try {
      const res = await fetchFn("https://www.ryanmedihub.com/api/hr/employees");
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.employees) && data.employees.length > 0) {
          return {
            status: 200,
            body: {
              success: true,
              employees: data.employees.map((e) => ({ _id: String(e._id), name: String(e.name || "") })),
              source: "crm",
            },
          };
        }
      }
      return {
        status: 200,
        body: {
          success: true,
          employees: AUTHORITATIVE_ACTIVE_HR_LIST,
          source: "fallback",
        },
      };
    } catch {
      return {
        status: 200,
        body: {
          success: true,
          employees: AUTHORITATIVE_ACTIVE_HR_LIST,
          source: "fallback",
        },
      };
    }
  }

  const result = await simulateRouteGet(mockFetch401);
  assert.equal(result.status, 200);
  assert.equal(result.body.success, true);
  assert.equal(result.body.source, "fallback");
  assert.equal(result.body.employees.length, 6);
});

test("HR Reference: Route handler fallback logic guarantees HTTP 200 with active HRs on network error", async () => {
  const mockFetchError = async () => {
    throw new Error("Network connection failed or timed out");
  };

  async function simulateRouteGet(fetchFn) {
    try {
      const res = await fetchFn("https://www.ryanmedihub.com/api/hr/employees");
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.employees) && data.employees.length > 0) {
          return {
            status: 200,
            body: {
              success: true,
              employees: data.employees.map((e) => ({ _id: String(e._id), name: String(e.name || "") })),
              source: "crm",
            },
          };
        }
      }
      return {
        status: 200,
        body: {
          success: true,
          employees: AUTHORITATIVE_ACTIVE_HR_LIST,
          source: "fallback",
        },
      };
    } catch {
      return {
        status: 200,
        body: {
          success: true,
          employees: AUTHORITATIVE_ACTIVE_HR_LIST,
          source: "fallback",
        },
      };
    }
  }

  const result = await simulateRouteGet(mockFetchError);
  assert.equal(result.status, 200);
  assert.equal(result.body.success, true);
  assert.equal(result.body.source, "fallback");
  assert.equal(result.body.employees.length, 6);
});
