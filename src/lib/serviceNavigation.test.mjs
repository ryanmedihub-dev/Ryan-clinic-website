import test from "node:test";
import assert from "node:assert/strict";
import {
  createNavigationErrorResponse,
  createNavigationResponse,
  groupHeaderNavigation,
  NAVIGATION_FIELDS,
} from "./serviceNavigation.mjs";

const syntheticRecords = [
  {
    _id: "synthetic-1",
    metadata: {
      pageName: "Synthetic transplant",
      pageType: "transplant",
      description: "Transplant description",
      pageurl: "synthetic-transplant",
      title: "must not be returned",
    },
    bannerData: {
      title: "Transplant fallback",
      description: "Transplant fallback description",
      imageurl: "must not be returned",
    },
    assignedDoctor: { credentials: "must not be returned" },
    faq: [{ answer: "must not be returned" }],
  },
  {
    _id: "synthetic-2",
    metadata: {
      pageName: "Synthetic treatment",
      pageType: "treatment",
      description: "Treatment description",
      pageurl: "synthetic-treatment",
    },
    bannerData: { title: "Treatment fallback", description: "Fallback" },
  },
  {
    _id: "synthetic-3",
    metadata: {
      pageName: "Synthetic branch",
      pageType: "branch",
      description: "Branch description",
      pageurl: "synthetic-branch",
    },
    bannerData: { title: "Branch fallback", description: "Fallback" },
  },
];

test("navigation response contains only the header fields in source order", () => {
  assert.equal(NAVIGATION_FIELDS.startsWith("-_id "), true);
  assert.deepEqual(createNavigationResponse(syntheticRecords), {
    success: true,
    data: [
      {
        metadata: {
          pageName: "Synthetic transplant",
          pageType: "transplant",
          description: "Transplant description",
          pageurl: "synthetic-transplant",
        },
        bannerData: {
          title: "Transplant fallback",
          description: "Transplant fallback description",
        },
      },
      {
        metadata: {
          pageName: "Synthetic treatment",
          pageType: "treatment",
          description: "Treatment description",
          pageurl: "synthetic-treatment",
        },
        bannerData: { title: "Treatment fallback", description: "Fallback" },
      },
      {
        metadata: {
          pageName: "Synthetic branch",
          pageType: "branch",
          description: "Branch description",
          pageurl: "synthetic-branch",
        },
        bannerData: { title: "Branch fallback", description: "Fallback" },
      },
    ],
  });
});

test("header groups and maps the synthetic records using existing fallbacks", () => {
  const groups = groupHeaderNavigation(syntheticRecords);
  assert.deepEqual(groups.transplantPages, [
    {
      name: "Synthetic transplant",
      href: "/synthetic-transplant",
      description: "Transplant description",
    },
  ]);
  assert.deepEqual(groups.treatmentPages, [
    {
      name: "Synthetic treatment",
      href: "/synthetic-treatment",
      description: "Treatment description",
    },
  ]);
  assert.deepEqual(groups.branchPages, [
    {
      name: "Synthetic branch",
      href: "/synthetic-branch",
      description: "Branch description",
    },
  ]);
  assert.deepEqual(groupHeaderNavigation([]), {
    transplantPages: [],
    treatmentPages: [],
    branchPages: [],
  });
});

test("navigation errors are generic and do not expose provider details", () => {
  const response = createNavigationErrorResponse();
  assert.deepEqual(response, {
    success: false,
    message: "Failed to fetch navigation",
    data: [],
  });
  assert.equal(JSON.stringify(response).includes("Mongo"), false);
});
