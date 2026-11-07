import test from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { createApplyRouteHandlers } from "./applyRouteHandlers.mjs";
import { createRazorpayPaymentVerifier } from "./razorpayPaymentVerification.mjs";

const applicationId = "507f1f77bcf86cd799439011";
const paymentId = "pay_synthetic123";
const subscriptionId = "sub_synthetic123";
const paymentSecret = "synthetic-test-secret";
const paymentSignature = createHmac("sha256", paymentSecret)
  .update(`${paymentId}|${subscriptionId}`)
  .digest("hex");

function createFixture(role = "admin") {
  const calls = { database: 0, created: null, updated: null, paymentVerifications: [] };
  const records = [];
  const applicant = { _id: applicationId, fullName: "Synthetic Applicant", status: "pending" };

  const ApplyForm = {
    async create(data) {
      calls.created = data;
      const created = { ...data, _id: applicationId };
      records.push(created);
      return created;
    },
    async findOne(query) {
      return records.find((record) => record.razorpayPaymentId === query.razorpayPaymentId) ?? null;
    },
    async findOneAndUpdate(query, update, options) {
      calls.updated = { query, update, options };
      const record = records.find((item) => item._id === query._id);
      if (!record || record.razorpaySubscriptionId !== query.razorpaySubscriptionId) return null;
      Object.assign(record, update.$set);
      return record;
    },
    find(query) {
      const chain = {
        sort() { return chain; },
        skip() { return chain; },
        limit() { return chain; },
        async lean() { return query.status ? [applicant] : [applicant]; },
      };
      return chain;
    },
    async countDocuments() {
      return 1;
    },
    findByIdAndUpdate(id, update, options) {
      calls.updated = { id, update, options };
      return {
        select() {
          return { lean: async () => ({ _id: id, status: update.$set.status }) };
        },
      };
    },
  };

  const handlers = createApplyRouteHandlers({
    ApplyForm,
    async DBConnection() { calls.database += 1; },
    async requireAdmin() {
      if (role === "anonymous") return Response.json({ error: "Unauthorized" }, { status: 401 });
      if (role === "non-admin") return Response.json({ error: "Forbidden" }, { status: 403 });
      return null;
    },
    isValidId: (id) => /^[a-f\d]{24}$/i.test(id),
    verifyPayment: async (details) => {
      calls.paymentVerifications.push(details);
      return details.paymentId === paymentId &&
        details.subscriptionId === subscriptionId &&
        details.signature === paymentSignature;
    },
  });

  return { ...handlers, calls, records };
}

function request(path, options = {}) {
  return new Request(`http://localhost${path}`, options);
}

test("anonymous GET is rejected before connecting to the database and reveals no applicant data", async () => {
  const api = createFixture("anonymous");
  const response = await api.GET(request("/api/apply"));
  const body = await response.json();

  assert.equal(response.status, 401);
  assert.equal(api.calls.database, 0);
  assert.equal(JSON.stringify(body).includes("Synthetic Applicant"), false);
});

test("authenticated non-admin GET is rejected", async () => {
  const api = createFixture("non-admin");
  const response = await api.GET(request("/api/apply"));

  assert.equal(response.status, 403);
  assert.equal(api.calls.database, 0);
});

test("admin GET returns paginated records", async () => {
  const api = createFixture();
  const response = await api.GET(request("/api/apply?page=1&limit=20"));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "private, no-store");
  assert.equal(body.total, 1);
  assert.equal(body.data[0].fullName, "Synthetic Applicant");
});

test("anonymous and non-admin PATCH requests are rejected", async () => {
  for (const [role, expectedStatus] of [["anonymous", 401], ["non-admin", 403]]) {
    const api = createFixture(role);
    const response = await api.PATCH(request(`/api/apply?id=${applicationId}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: "approved" }),
    }));

    assert.equal(response.status, expectedStatus);
    assert.equal(api.calls.database, 0);
    assert.equal(api.calls.updated, null);
  }
});

test("admin PATCH accepts a valid status and returns only update confirmation fields", async () => {
  const api = createFixture();
  const response = await api.PATCH(request(`/api/apply?id=${applicationId}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ status: "approved" }),
  }));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "private, no-store");
  assert.deepEqual(body.data, { id: applicationId, status: "approved" });
  assert.equal("fullName" in body.data, false);
  assert.equal(api.calls.updated.options.runValidators, true);
});

test("PATCH rejects invalid status, malformed JSON, and invalid IDs", async () => {
  const api = createFixture();
  const invalidStatus = await api.PATCH(request(`/api/apply?id=${applicationId}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ status: "deleted" }),
  }));
  assert.equal(invalidStatus.status, 400);
  assert.equal(api.calls.updated, null);

  const invalidJson = await api.PATCH(request(`/api/apply?id=${applicationId}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: "{invalid",
  }));
  assert.equal(invalidJson.status, 400);

  const invalidId = await api.PATCH(request("/api/apply?id=bad-id", {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ status: "approved" }),
  }));
  assert.equal(invalidId.status, 400);
});

test("public POST accepts a valid synthetic non-paid submission", async () => {
  const api = createFixture("anonymous");
  const formData = new FormData();
  formData.set("fullName", "Synthetic Candidate");
  formData.set("age", "30");
  const response = await api.POST(request("/api/apply", { method: "POST", body: formData }));
  const body = await response.json();

  assert.equal(response.status, 201);
  assert.equal(body.success, true);
  assert.equal(api.calls.created.fullName, "Synthetic Candidate");
  assert.equal(api.calls.created.age, 30);
  assert.equal(api.calls.created.status, undefined);
  assert.equal(api.calls.created.paymentStatus, "pending");
  assert.equal(api.calls.created.razorpayPaymentId, undefined);
});

test("public POST rejects forged and invalid payment states without creating a record", async () => {
  for (const forgedStatus of ["paid", "completed", "unknown"]) {
    const api = createFixture("anonymous");
    const formData = new FormData();
    formData.set("fullName", "Synthetic Candidate");
    formData.set("paymentStatus", forgedStatus);
    const response = await api.POST(request("/api/apply", { method: "POST", body: formData }));
    assert.equal(response.status, 400);
    assert.equal(api.calls.created, null);
  }
});

test("missing, fabricated, and mismatched payment details cannot create a paid application", async () => {
  const cases = [
    { razorpayPaymentId: paymentId, razorpaySubscriptionId: subscriptionId },
    { razorpayPaymentId: "fake-payment", razorpaySubscriptionId: subscriptionId, razorpaySignature: paymentSignature },
    { razorpayPaymentId: paymentId, razorpaySubscriptionId: "sub_other123", razorpaySignature: paymentSignature },
  ];
  for (const values of cases) {
    const api = createFixture("anonymous");
    const formData = new FormData();
    formData.set("fullName", "Synthetic Candidate");
    for (const [key, value] of Object.entries(values)) formData.set(key, value);
    const response = await api.POST(request("/api/apply", { method: "POST", body: formData }));
    assert.equal(response.status, 400);
    assert.equal(api.calls.created, null);
  }
});

test("failed or cancelled checkout attempts leave applications unpaid", async () => {
  const failedApi = createFixture("anonymous");
  const failedForm = new FormData();
  failedForm.set("fullName", "Failed Synthetic Candidate");
  failedForm.set("razorpayPaymentId", paymentId);
  failedForm.set("razorpaySubscriptionId", subscriptionId);
  failedForm.set("razorpaySignature", "0".repeat(64));
  const failedResponse = await failedApi.POST(request("/api/apply", { method: "POST", body: failedForm }));
  assert.equal(failedResponse.status, 400);
  assert.equal(failedApi.calls.created, null);

  const cancelledApi = createFixture("anonymous");
  const cancelledForm = new FormData();
  cancelledForm.set("fullName", "Cancelled Synthetic Candidate");
  const cancelledResponse = await cancelledApi.POST(request("/api/apply", { method: "POST", body: cancelledForm }));
  assert.equal(cancelledResponse.status, 201);
  assert.equal(cancelledApi.records[0].paymentStatus, "pending");
});

test("a verified captured payment marks only its application paid and retries are idempotent", async () => {
  const api = createFixture("anonymous");
  const makeSubmission = (name) => {
    const formData = new FormData();
    formData.set("fullName", name);
    formData.set("razorpayPaymentId", paymentId);
    formData.set("razorpaySubscriptionId", subscriptionId);
    formData.set("razorpaySignature", paymentSignature);
    return request("/api/apply", { method: "POST", body: formData });
  };

  const first = await api.POST(makeSubmission("Synthetic Candidate"));
  const second = await api.POST(makeSubmission("Different Candidate"));
  assert.equal(first.status, 201);
  assert.equal(second.status, 200);
  assert.equal(api.records.length, 1);
  assert.equal(api.records[0].fullName, "Synthetic Candidate");
  assert.equal(api.records[0].paymentStatus, "paid");
  assert.equal(api.calls.paymentVerifications.length, 2);
});

test("an application ID cannot be supplied to bind a payment to another application", async () => {
  const api = createFixture("anonymous");
  const formData = new FormData();
  formData.set("applicationId", applicationId);
  formData.set("razorpayPaymentId", paymentId);
  formData.set("razorpaySubscriptionId", subscriptionId);
  formData.set("razorpaySignature", paymentSignature);
  const response = await api.POST(request("/api/apply", { method: "POST", body: formData }));
  assert.equal(response.status, 400);
  assert.equal(api.calls.created, null);
});

test("Razorpay verification requires a valid signature, captured payment, matching subscription, and configured plan", async () => {
  let payment = {
    id: paymentId,
    subscription_id: subscriptionId,
    status: "captured",
    captured: true,
    amount: 9900,
    currency: "INR",
    amount_refunded: 0,
  };
  let subscription = { id: subscriptionId, plan_id: "plan_synthetic" };
  let plan = { id: "plan_synthetic", item: { amount: 9900, currency: "INR" } };
  const verify = createRazorpayPaymentVerifier({
    keySecret: paymentSecret,
    planId: "plan_synthetic",
    async fetchPayment() { return payment; },
    async fetchSubscription() { return subscription; },
    async fetchPlan() { return plan; },
  });
  const details = { paymentId, subscriptionId, signature: paymentSignature };

  // Synthetic plan values exercise unit/currency matching; they do not set the live plan price.
  assert.equal(await verify(details), true);
  assert.equal(await verify({ ...details, signature: "0".repeat(64) }), false);
  payment = { ...payment, status: "authorized", captured: false };
  assert.equal(await verify(details), false);
  payment = { ...payment, status: "captured", captured: true, subscription_id: "sub_other123" };
  assert.equal(await verify(details), false);
  payment = { ...payment, subscription_id: subscriptionId, amount: 9901 };
  assert.equal(await verify(details), false);
  payment = { ...payment, amount: 9900, currency: "USD" };
  assert.equal(await verify(details), false);
  payment = { ...payment, currency: "INR", amount_refunded: 9900 };
  assert.equal(await verify(details), false);
  payment = { ...payment, amount_refunded: 0 };
  subscription = { ...subscription, plan_id: "plan_other" };
  assert.equal(await verify(details), false);
  subscription = { ...subscription, plan_id: "plan_synthetic" };
  plan = { ...plan, id: "plan_other" };
  assert.equal(await verify(details), false);
});

test("public POST rejects malformed numeric input without creating a record", async () => {
  const api = createFixture("anonymous");
  const formData = new FormData();
  formData.set("fullName", "Synthetic Candidate");
  formData.set("age", "not-a-number");
  const response = await api.POST(request("/api/apply", { method: "POST", body: formData }));

  assert.equal(response.status, 400);
  assert.equal(api.calls.created, null);
});
