import test from "node:test";
import assert from "node:assert/strict";
import {
  isDoctorPubliclyEligible,
  sortDoctorsForDisplay,
  resolveBranchDoctors,
  expandDoctorProfiles,
} from "./doctorProfiles.mjs";

const makeDoc = (overrides = {}) => ({
  _id: "doc-1",
  slug: "hair-transplant-doctor-in-test",
  pageName: "Test Doctor",
  status: "published",
  isActive: true,
  deletedAt: null,
  displayOrder: 1,
  createdAt: "2026-01-01T00:00:00.000Z",
  basicInfo: {
    doctorName: "Dr. Alpha",
    designation: "Lead Surgeon",
    city: "Mumbai",
    yearsExperience: 10,
    proceduresCount: 2000,
    successRate: "97%",
    rating: 4.7,
    phoneNumber: "+91-9911111247",
    whatsappNumber: "+91-9217958539",
    clinicName: "Ryan Clinic",
    profileImage: { image: "/uploads/alpha.jpg", alt: "Dr. Alpha" },
    ...(overrides.basicInfo || {}),
  },
  doctorCard: {
    shortQualification: "MS",
    cardDescription: "Verified bio for Alpha.",
    qualifications: [{ degree: "MS", institute: "AIIMS" }],
    certifications: ["Board Certified"],
    specializations: ["Sapphire FUE"],
    ...(overrides.doctorCard || {}),
  },
  ...overrides,
});

test("isDoctorPubliclyEligible enforces published, active, non-deleted, and non-demo rules", () => {
  assert.equal(isDoctorPubliclyEligible(makeDoc()), true);
  assert.equal(isDoctorPubliclyEligible(makeDoc({ status: "draft" })), false);
  assert.equal(isDoctorPubliclyEligible(makeDoc({ isActive: false })), false);
  assert.equal(isDoctorPubliclyEligible(makeDoc({ deletedAt: "2026-01-02T00:00:00.000Z" })), false);
  assert.equal(isDoctorPubliclyEligible(makeDoc({ slug: "demo-doctor-mumbai" })), false);
  assert.equal(
    isDoctorPubliclyEligible(makeDoc({ slug: "demo-doctor-mumbai" }), { allowDemo: true }),
    true
  );
  assert.equal(isDoctorPubliclyEligible(null), false);
});

test("resolveBranchDoctors handles 0, 1, 2, 3, and 4+ doctors with order and draft filtering", () => {
  assert.deepEqual(resolveBranchDoctors({ assignedDoctors: [], assignedDoctor: null, cityDoctors: [] }), []);

  const doc1 = makeDoc({ _id: "1", displayOrder: 2, basicInfo: { doctorName: "Dr. One", city: "Mumbai" } });
  const doc2 = makeDoc({ _id: "2", displayOrder: 1, basicInfo: { doctorName: "Dr. Two", city: "Mumbai" } });
  const draftDoc = makeDoc({ _id: "3", status: "draft", basicInfo: { doctorName: "Dr. Draft", city: "Mumbai" } });
  const deletedDoc = makeDoc({ _id: "4", deletedAt: "2026-05-01T00:00:00.000Z", basicInfo: { doctorName: "Dr. Del", city: "Mumbai" } });
  const demoDoc = makeDoc({ _id: "5", slug: "demo-doctor-mumbai", basicInfo: { doctorName: "Demo", city: "Mumbai" } });

  // Case A: Single doctor
  const single = resolveBranchDoctors({ assignedDoctors: [doc1], cityDoctors: [doc1, draftDoc, deletedDoc, demoDoc] });
  assert.equal(single.length, 1);
  assert.equal(single[0]._id, "1");

  // Explicit order overrides displayOrder, then appends city docs sorted by displayOrder, filtering out drafts/deleted/demo
  const doc3 = makeDoc({ _id: "6", displayOrder: 3, basicInfo: { doctorName: "Dr. Three", city: "Mumbai" } });
  const doc4 = makeDoc({ _id: "7", displayOrder: 4, basicInfo: { doctorName: "Dr. Four", city: "Mumbai" } });
  const ordered = resolveBranchDoctors({
    assignedDoctors: [doc1],
    assignedDoctor: demoDoc,
    cityDoctors: [doc4, doc2, doc3, doc1, draftDoc, deletedDoc, demoDoc],
  });
  assert.deepEqual(
    ordered.map((d) => d._id),
    ["1", "2", "6", "7"]
  );
});

test("sortDoctorsForDisplay orders ascending by displayOrder then createdAt desc", () => {
  const a = makeDoc({ _id: "a", displayOrder: 5, createdAt: "2026-05-01T00:00:00.000Z" });
  const b = makeDoc({ _id: "b", displayOrder: 1, createdAt: "2026-01-01T00:00:00.000Z" });
  const c = makeDoc({ _id: "c", displayOrder: 1, createdAt: "2026-03-01T00:00:00.000Z" });
  assert.deepEqual(
    sortDoctorsForDisplay([a, b, c]).map((d) => d._id),
    ["c", "b", "a"]
  );
});

test("expandDoctorProfiles expands combined teamDoctors without cross-contaminating stats or credentials", () => {
  const mumbaiDoc = makeDoc({
    _id: "mumbai-doc",
    slug: "hair-transplant-doctor-in-mumbai",
    basicInfo: {
      doctorName: "Dr. Harshada Vijay Rakh & Sayali Sanjay Kote",
      city: "Mumbai",
      yearsExperience: 15,
      proceduresCount: 5000,
      successRate: "97%",
      rating: 4.7,
      profileImage: { image: "/uploads/shared.jpg" },
      phoneNumber: "+91-9911111247",
      clinicName: "Ryan Skin & Hair Transplant Clinic",
    },
    teamDoctors: [
      {
        doctorName: "Dr. Harshada Vijay Rakh",
        qualification: "MDS Surgeon",
        designation: "Hair Transplant Doctor — Mumbai",
        about: "",
        profileImage: { image: "/uploads/harshada.jpg" },
      },
      {
        doctorName: "Sayali Sanjay Kote",
        qualification: "MBBS",
        designation: "Hair Transplant Doctor — Mumbai",
        about: "Sayali focuses on consultation and post-op care.",
        profileImage: { image: "/uploads/sayali.jpg" },
      },
    ],
  });

  const profiles = expandDoctorProfiles([mumbaiDoc], "Mumbai");
  assert.equal(profiles.length, 2);

  assert.equal(profiles[0].name, "Dr. Harshada Vijay Rakh");
  assert.equal(profiles[0].qualification, "MDS Surgeon");
  assert.equal(profiles[0].profileImage, "/uploads/harshada.jpg");
  assert.equal(profiles[0].yearsExperience, 0); // not copied from parent combined doc
  assert.equal(profiles[0].qualifications[0].degree, "MDS Surgeon");

  assert.equal(profiles[1].name, "Sayali Sanjay Kote");
  assert.equal(profiles[1].qualification, "MBBS");
  assert.equal(profiles[1].profileImage, "/uploads/sayali.jpg");
  assert.equal(profiles[1].bioLines[0], "Sayali focuses on consultation and post-op care.");
  assert.equal(profiles[1].qualifications.length, 1);
  assert.equal(profiles[1].qualifications[0].degree, "MBBS");
  assert.equal(profiles[1].rating, 4.7);
});

test("expandDoctorProfiles handles 4 independent doctor records and keeps alternating index alignment", () => {
  const docs = [1, 2, 3, 4].map((n) =>
    makeDoc({
      _id: `ind-${n}`,
      slug: `dr-test-${n}`,
      displayOrder: n,
      basicInfo: {
        doctorName: `Dr. Test ${n}`,
        designation: `Surgeon ${n}`,
        city: "Noida",
        yearsExperience: 5 + n,
        proceduresCount: 500 * n,
        successRate: "",
        rating: 4.7,
        profileImage: { image: `/uploads/doc-${n}.jpg` },
      },
      doctorCard: {
        shortQualification: n % 2 === 0 ? "MBBS" : "MDS",
        cardDescription: `Bio strictly for doctor ${n}.`,
        qualifications: [{ degree: n % 2 === 0 ? "MBBS" : "MDS", institute: "" }],
        certifications: [],
        specializations: ["Sapphire FUE"],
      },
    })
  );

  const expanded = expandDoctorProfiles(docs, "Noida");
  assert.equal(expanded.length, 4);
  expanded.forEach((p, idx) => {
    const n = idx + 1;
    assert.equal(p.name, `Dr. Test ${n}`);
    assert.equal(p.yearsExperience, 5 + n);
    assert.equal(p.bioLines[0], `Bio strictly for doctor ${n}.`);
    // Even index (Doctor 1, 3): text left / image right; Odd index (Doctor 2, 4): image left / text right
    const expectedLayout = idx % 2 === 0 ? "text-left" : "image-left";
    assert.equal(expectedLayout, n === 1 || n === 3 ? "text-left" : "image-left");
  });
});
