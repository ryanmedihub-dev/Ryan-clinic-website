"use client";
import { useEffect, useState } from "react";

const CORRECT_PASSWORD = "Dashzer@12";

const STATUS_COLORS = {
  pending: { bg: "#2a2010", text: "#c8a96e", border: "#c8a96e40" },
  approved: { bg: "#0a2015", text: "#4ade80", border: "#4ade8040" },
  rejected: { bg: "#200a0a", text: "#f87171", border: "#f8717140" },
};

const FIELD_LABELS = {
  fullName: "Full Name", age: "Age", gender: "Gender", city: "City",
  profession: "Profession", income: "Income",
  lookingFor: "Looking For", marriageTimeline: "Marriage Timeline",
  seriousnessScore: "Seriousness (1–10)", whyNow: "Why Now",
  smoke: "Smoke", drink: "Drink", lifestyle: "Lifestyle", weekend: "Weekend",
  height: "Height", bodyType: "Body Type", fitnessLevel: "Fitness", diet: "Diet",
  recharge: "Recharge", conflict: "Conflict Style", relationshipPriority: "Relationship Priority",
  ambitionLevel: "Ambition", fiveYears: "5-Year Plan",
  familyImportance: "Family (1–5)", religionImportance: "Religion (1–5)",
  livingPreference: "Living Preference", familyInvolvement: "Family Involvement",
  preferredAge: "Preferred Age", preferredCity: "Preferred City",
  preferredHeight: "Preferred Height", partnerFitness: "Partner Fitness",
  partnerDiet: "Partner Diet", attracts: "Attracted To", turnoffs: "Turn-offs",
  whySingle: "Why Single", idealPartner: "Ideal Partner", noCompromise: "Non-Negotiables",
  relocate: "Relocate?", children: "Children?",
};

// ── Password Gate ─────────────────────────────────────────────────────────────
function PasswordGate({ onUnlock }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === CORRECT_PASSWORD) {
      sessionStorage.setItem("apply_admin_auth", "1");
      onUnlock();
    } else {
      setError(true);
      setInput("");
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0d0a0b", display: "flex",
      alignItems: "center", justifyContent: "center", fontFamily: "sans-serif",
    }}>
      <div style={{
        background: "#161113", border: "1px solid rgba(220,160,140,0.15)",
        borderRadius: 20, padding: "48px 40px", width: "100%", maxWidth: 380,
        textAlign: "center",
        boxShadow: error ? "0 0 0 2px #f87171" : "0 20px 60px rgba(0,0,0,0.5)",
        transition: "box-shadow 0.3s",
      }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🔒</div>
        <h2 style={{ color: "#f0e8e2", fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>Admin Access</h2>
        <p style={{ color: "#a09088", fontSize: 14, margin: "0 0 28px" }}>Enter password to view submissions</p>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ position: "relative" }}>
            <input
              type={show ? "text" : "password"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Password"
              autoFocus
              style={{
                width: "100%", padding: "13px 44px 13px 16px", borderRadius: 12,
                background: "#1a1315", border: `1px solid ${error ? "#f87171" : "rgba(220,160,140,0.2)"}`,
                color: "#f0e8e2", fontSize: 15, outline: "none",
                boxSizing: "border-box", fontFamily: "sans-serif",
                transition: "border-color 0.2s",
              }}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              style={{
                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", color: "#a09088", cursor: "pointer", fontSize: 16,
              }}
            >
              {show ? "🙈" : "👁"}
            </button>
          </div>
          {error && <p style={{ color: "#f87171", fontSize: 13, margin: 0 }}>Incorrect password</p>}
          <button
            type="submit"
            style={{
              padding: "13px", borderRadius: 100, border: "none",
              background: "linear-gradient(135deg, #c9614a, #e07b64)",
              color: "#fff", fontSize: 15, fontWeight: 500, cursor: "pointer",
              marginTop: 4,
            }}
          >
            Unlock →
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ApplySubmissionsPage() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("apply_admin_auth") === "1") setAuthed(true);
    setReady(true);
  }, []);

  if (!ready) return null;
  if (!authed) return <PasswordGate onUnlock={() => setAuthed(true)} />;
  return <Dashboard />;
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchData = async (pg = 1, status = filterStatus) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: pg, limit: 20 });
      if (status) params.set("status", status);
      const res = await fetch(`/api/apply?${params}`);
      const json = await res.json();
      if (json.success) {
        setApplications(json.data);
        setTotal(json.total);
        setTotalPages(json.totalPages);
        setPage(pg);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(1, filterStatus); }, [filterStatus]);

  const updateStatus = async (id, status) => {
    setUpdating(true);
    try {
      await fetch(`/api/apply?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setApplications((prev) => prev.map((a) => (a._id === id ? { ...a, status } : a)));
      if (selected?._id === id) setSelected((s) => ({ ...s, status }));
    } finally {
      setUpdating(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("apply_admin_auth");
    window.location.reload();
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0d0a0b", color: "#f0e8e2", fontFamily: "sans-serif", padding: "32px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: "#e07b64", margin: 0 }}>Apply Submissions</h1>
            <p style={{ color: "#a09088", fontSize: 14, marginTop: 4 }}>{total} total applications</p>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            {/* Filter */}
            {["", "pending", "approved", "rejected"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                style={{
                  padding: "7px 16px", borderRadius: 100, fontSize: 13, cursor: "pointer",
                  border: `1px solid ${filterStatus === s ? "#c9614a" : "rgba(220,160,140,0.2)"}`,
                  background: filterStatus === s ? "rgba(201,97,74,0.15)" : "transparent",
                  color: filterStatus === s ? "#e07b64" : "#a09088",
                }}
              >
                {s === "" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
            <button
              onClick={logout}
              style={{
                padding: "7px 16px", borderRadius: 100, fontSize: 13, cursor: "pointer",
                border: "1px solid rgba(248,113,113,0.3)", background: "transparent", color: "#f87171",
              }}
            >
              🔓 Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: 80, color: "#a09088" }}>Loading…</div>
        ) : applications.length === 0 ? (
          <div style={{ textAlign: "center", padding: 80, color: "#a09088" }}>No applications found.</div>
        ) : (
          <>
            <div style={{ overflowX: "auto", borderRadius: 16, border: "1px solid rgba(220,160,140,0.12)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: "#161113", borderBottom: "1px solid rgba(220,160,140,0.12)" }}>
                    {["Photo", "Name", "Age / Gender", "City", "Profession", "Intent", "Seriousness", "Status", "Submitted", "Actions"].map((h) => (
                      <th key={h} style={{ padding: "14px 16px", textAlign: "left", color: "#a09088", fontWeight: 500, whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, i) => {
                    const sc = STATUS_COLORS[app.status] || STATUS_COLORS.pending;
                    return (
                      <tr
                        key={app._id}
                        style={{ borderBottom: "1px solid rgba(220,160,140,0.08)", background: i % 2 === 0 ? "#0d0a0b" : "#100d0e", cursor: "pointer" }}
                        onClick={() => setSelected(app)}
                      >
                        <td style={{ padding: "12px 16px" }}>
                          {app.photoUrl ? (
                            <img src={app.photoUrl} alt={app.fullName} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(201,97,74,0.3)" }} />
                          ) : (
                            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#1e181a", border: "2px solid rgba(220,160,140,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>👤</div>
                          )}
                        </td>
                        <td style={{ padding: "12px 16px", fontWeight: 500, color: "#f0e8e2", whiteSpace: "nowrap" }}>{app.fullName || "—"}</td>
                        <td style={{ padding: "12px 16px", color: "#a09088", whiteSpace: "nowrap" }}>{app.age || "—"} / {app.gender || "—"}</td>
                        <td style={{ padding: "12px 16px", color: "#a09088" }}>{app.city || "—"}</td>
                        <td style={{ padding: "12px 16px", color: "#a09088" }}>{app.profession || "—"}</td>
                        <td style={{ padding: "12px 16px", color: "#a09088" }}>{app.lookingFor || "—"}</td>
                        <td style={{ padding: "12px 16px", textAlign: "center" }}>
                          <span style={{ display: "inline-block", background: "rgba(201,97,74,0.15)", color: "#e07b64", borderRadius: 100, padding: "2px 10px", fontSize: 13 }}>
                            {app.seriousnessScore || "—"}/10
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{ display: "inline-block", background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`, borderRadius: 100, padding: "3px 12px", fontSize: 12, fontWeight: 500 }}>
                            {app.status}
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px", color: "#a09088", whiteSpace: "nowrap", fontSize: 12 }}>
                          {new Date(app.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </td>
                        <td style={{ padding: "12px 16px" }} onClick={(e) => e.stopPropagation()}>
                          <div style={{ display: "flex", gap: 6 }}>
                            <button disabled={updating || app.status === "approved"} onClick={() => updateStatus(app._id, "approved")}
                              style={{ padding: "5px 10px", borderRadius: 6, fontSize: 11, cursor: "pointer", border: "1px solid #4ade8040", background: "#0a2015", color: "#4ade80", opacity: app.status === "approved" ? 0.4 : 1 }}>
                              ✓ Approve
                            </button>
                            <button disabled={updating || app.status === "rejected"} onClick={() => updateStatus(app._id, "rejected")}
                              style={{ padding: "5px 10px", borderRadius: 6, fontSize: 11, cursor: "pointer", border: "1px solid #f8717140", background: "#200a0a", color: "#f87171", opacity: app.status === "rejected" ? 0.4 : 1 }}>
                              ✗ Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
                <button onClick={() => fetchData(page - 1)} disabled={page === 1} style={paginationBtn(page === 1)}>← Prev</button>
                <span style={{ padding: "8px 16px", color: "#a09088", fontSize: 14 }}>Page {page} of {totalPages}</span>
                <button onClick={() => fetchData(page + 1)} disabled={page === totalPages} style={paginationBtn(page === totalPages)}>Next →</button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 50, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 16px", overflowY: "auto" }}
          onClick={() => setSelected(null)}
        >
          <div
            style={{ background: "#161113", border: "1px solid rgba(220,160,140,0.15)", borderRadius: 20, width: "100%", maxWidth: 680, padding: 36, position: "relative" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setSelected(null)} style={{ position: "absolute", top: 16, right: 20, background: "none", border: "none", color: "#a09088", fontSize: 24, cursor: "pointer", lineHeight: 1 }}>×</button>
            <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 28 }}>
              {selected.photoUrl ? (
                <img src={selected.photoUrl} alt={selected.fullName} style={{ width: 88, height: 88, borderRadius: "50%", objectFit: "cover", border: "3px solid rgba(201,97,74,0.4)", flexShrink: 0 }} />
              ) : (
                <div style={{ width: 88, height: 88, borderRadius: "50%", background: "#1e181a", border: "3px solid rgba(220,160,140,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, flexShrink: 0 }}>👤</div>
              )}
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: "#f0e8e2", margin: "0 0 4px" }}>{selected.fullName || "—"}</h2>
                <p style={{ color: "#a09088", fontSize: 14, margin: "0 0 8px" }}>{selected.age} yrs · {selected.gender} · {selected.city}</p>
                <div style={{ display: "flex", gap: 8 }}>
                  {["approved", "rejected", "pending"].map((s) => {
                    const sc = STATUS_COLORS[s];
                    return (
                      <button key={s} disabled={updating || selected.status === s} onClick={() => updateStatus(selected._id, s)}
                        style={{
                          padding: "5px 14px", borderRadius: 100, fontSize: 12, cursor: "pointer", fontWeight: 500,
                          border: `1px solid ${sc.border}`, background: selected.status === s ? sc.bg : "transparent",
                          color: selected.status === s ? sc.text : "#a09088", opacity: selected.status === s ? 1 : 0.7,
                        }}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px" }}>
              {Object.entries(FIELD_LABELS).map(([key, label]) => {
                const val = selected[key];
                if (val === undefined || val === null || val === "") return null;
                const display = Array.isArray(val) ? val.join(", ") : String(val);
                return (
                  <div key={key} style={{ gridColumn: ["whyNow", "whySingle", "idealPartner", "noCompromise"].includes(key) ? "1 / -1" : "auto" }}>
                    <p style={{ fontSize: 11, color: "#a09088", textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 3px" }}>{label}</p>
                    <p style={{ fontSize: 14, color: "#f0e8e2", margin: 0, lineHeight: 1.5 }}>{display}</p>
                  </div>
                );
              })}
            </div>
            <p style={{ marginTop: 24, fontSize: 12, color: "#a09088", textAlign: "right" }}>
              Submitted {new Date(selected.createdAt).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function paginationBtn(disabled) {
  return {
    padding: "8px 18px", borderRadius: 100, fontSize: 13, cursor: disabled ? "default" : "pointer",
    border: "1px solid rgba(220,160,140,0.2)", background: "transparent",
    color: disabled ? "#555" : "#a09088", opacity: disabled ? 0.4 : 1,
  };
}
