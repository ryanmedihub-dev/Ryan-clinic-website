"use client";
import { useEffect, useState } from "react";

const CORRECT_PASSWORD = "Dashzer@12";

const STATUS_COLORS = {
  pending:  { bg: "#2a2010", text: "#c8a96e", border: "#c8a96e40" },
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

const WIDE_FIELDS = new Set(["whyNow", "whySingle", "idealPartner", "noCompromise"]);

// ── Global styles ─────────────────────────────────────────────────────────────
function GlobalStyle() {
  return (
    <style href="applied-submissions" precedence="default">{`
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html, body {
        background: #0d0a0b !important;
        color: #f0e8e2;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        -webkit-font-smoothing: antialiased;
      }

      /* ── Password gate ── */
      .pg-wrap {
        min-height: 100vh;
        background: #0d0a0b;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px 16px;
      }
      .pg-card {
        background: #161113;
        border: 1px solid rgba(220,160,140,0.15);
        border-radius: 20px;
        padding: 48px 40px;
        width: 100%;
        max-width: 380px;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        transition: box-shadow 0.3s;
      }
      .pg-card.error { box-shadow: 0 0 0 2px #f87171; }
      .pg-input {
        width: 100%;
        padding: 13px 44px 13px 16px;
        border-radius: 12px;
        background: #1a1315;
        border: 1px solid rgba(220,160,140,0.2);
        color: #f0e8e2;
        font-size: 15px;
        outline: none;
        transition: border-color 0.2s;
        font-family: inherit;
      }
      .pg-input.error { border-color: #f87171; }
      .pg-input::placeholder { color: rgba(160,144,136,0.5); }
      .pg-eye {
        position: absolute; right: 12px; top: 50%;
        transform: translateY(-50%);
        background: none; border: none;
        color: #a09088; cursor: pointer; font-size: 16px;
      }
      .pg-btn {
        width: 100%;
        padding: 13px;
        border-radius: 100px;
        border: none;
        background: linear-gradient(135deg, #c9614a, #e07b64);
        color: #fff;
        font-size: 15px;
        font-weight: 500;
        cursor: pointer;
        margin-top: 4px;
        font-family: inherit;
      }

      /* ── Dashboard ── */
      .dash-wrap {
        min-height: 100vh;
        background: #0d0a0b;
        color: #f0e8e2;
        padding: 28px 20px 48px;
      }
      .dash-inner { max-width: 1200px; margin: 0 auto; }

      /* header row */
      .dash-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 24px;
        flex-wrap: wrap;
      }
      .dash-title { font-size: 24px; font-weight: 700; color: #e07b64; }
      .dash-sub   { color: #a09088; font-size: 13px; margin-top: 3px; }

      /* filter + logout row */
      .filter-row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 20px;
      }
      .filter-btn {
        padding: 7px 14px;
        border-radius: 100px;
        font-size: 12px;
        cursor: pointer;
        border: 1px solid rgba(220,160,140,0.2);
        background: transparent;
        color: #a09088;
        font-family: inherit;
        transition: all 0.15s;
      }
      .filter-btn.active {
        border-color: #c9614a;
        background: rgba(201,97,74,0.15);
        color: #e07b64;
      }
      .logout-btn {
        padding: 7px 14px;
        border-radius: 100px;
        font-size: 12px;
        cursor: pointer;
        border: 1px solid rgba(248,113,113,0.3);
        background: transparent;
        color: #f87171;
        font-family: inherit;
        margin-left: auto;
      }

      /* ── Desktop table ── */
      .table-wrap {
        overflow-x: auto;
        border-radius: 16px;
        border: 1px solid rgba(220,160,140,0.12);
      }
      .app-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 13px;
        background: #0d0a0b;
      }
      .app-table thead tr {
        background: #161113;
        border-bottom: 1px solid rgba(220,160,140,0.12);
      }
      .app-table th {
        padding: 13px 14px;
        text-align: left;
        color: #a09088;
        font-weight: 500;
        white-space: nowrap;
      }
      .app-table tbody tr {
        border-bottom: 1px solid rgba(220,160,140,0.07);
        cursor: pointer;
        transition: background 0.15s;
      }
      .app-table tbody tr:nth-child(even) { background: #100d0e; }
      .app-table tbody tr:hover { background: #1a1315; }
      .app-table td { padding: 11px 14px; vertical-align: middle; }

      .avatar {
        width: 40px; height: 40px; border-radius: 50%;
        object-fit: cover;
        border: 2px solid rgba(201,97,74,0.3);
        flex-shrink: 0;
      }
      .avatar-placeholder {
        width: 40px; height: 40px; border-radius: 50%;
        background: #1e181a;
        border: 2px solid rgba(220,160,140,0.15);
        display: flex; align-items: center; justify-content: center;
        font-size: 18px; flex-shrink: 0;
      }
      .score-badge {
        display: inline-block;
        background: rgba(201,97,74,0.15);
        color: #e07b64;
        border-radius: 100px;
        padding: 2px 9px;
        font-size: 12px;
      }
      .status-badge {
        display: inline-block;
        border-radius: 100px;
        padding: 3px 10px;
        font-size: 11px;
        font-weight: 500;
        white-space: nowrap;
      }
      .action-btns { display: flex; gap: 5px; }
      .approve-btn {
        padding: 5px 9px; border-radius: 6px; font-size: 11px;
        cursor: pointer; border: 1px solid #4ade8040;
        background: #0a2015; color: #4ade80; font-family: inherit;
      }
      .reject-btn {
        padding: 5px 9px; border-radius: 6px; font-size: 11px;
        cursor: pointer; border: 1px solid #f8717140;
        background: #200a0a; color: #f87171; font-family: inherit;
      }

      /* ── Mobile cards (hidden on desktop) ── */
      .card-list { display: none; flex-direction: column; gap: 12px; }
      .app-card {
        background: #161113;
        border: 1px solid rgba(220,160,140,0.12);
        border-radius: 16px;
        padding: 16px;
        cursor: pointer;
        transition: border-color 0.15s;
      }
      .app-card:active { border-color: rgba(201,97,74,0.4); }
      .card-top {
        display: flex;
        gap: 14px;
        align-items: center;
        margin-bottom: 12px;
      }
      .card-avatar {
        width: 52px; height: 52px; border-radius: 50%;
        object-fit: cover;
        border: 2px solid rgba(201,97,74,0.3);
        flex-shrink: 0;
      }
      .card-avatar-ph {
        width: 52px; height: 52px; border-radius: 50%;
        background: #1e181a;
        border: 2px solid rgba(220,160,140,0.15);
        display: flex; align-items: center; justify-content: center;
        font-size: 24px; flex-shrink: 0;
      }
      .card-name { font-weight: 600; font-size: 15px; color: #f0e8e2; }
      .card-meta { font-size: 12px; color: #a09088; margin-top: 2px; }
      .card-chips {
        display: flex; flex-wrap: wrap; gap: 6px;
        margin-bottom: 12px;
      }
      .chip {
        font-size: 11px;
        padding: 3px 10px;
        border-radius: 100px;
        background: #1e181a;
        border: 1px solid rgba(220,160,140,0.12);
        color: #a09088;
      }
      .card-actions {
        display: flex; gap: 8px; padding-top: 10px;
        border-top: 1px solid rgba(220,160,140,0.08);
      }
      .card-action-btn {
        flex: 1; padding: 8px; border-radius: 8px;
        font-size: 12px; font-weight: 500; cursor: pointer;
        font-family: inherit; text-align: center;
      }

      /* ── Pagination ── */
      .pagination {
        display: flex; justify-content: center;
        align-items: center; gap: 8px; margin-top: 24px;
        flex-wrap: wrap;
      }
      .page-btn {
        padding: 8px 16px; border-radius: 100px; font-size: 13px;
        border: 1px solid rgba(220,160,140,0.2);
        background: transparent; color: #a09088; cursor: pointer;
        font-family: inherit;
      }
      .page-btn:disabled { opacity: 0.35; cursor: default; }
      .page-info { padding: 8px 12px; color: #a09088; font-size: 13px; }

      /* ── Modal ── */
      .modal-backdrop {
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.8);
        z-index: 100;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding: 0;
        overflow-y: auto;
      }
      .modal-box {
        background: #161113;
        border: 1px solid rgba(220,160,140,0.15);
        border-radius: 20px;
        width: 100%;
        max-width: 680px;
        padding: 28px 24px;
        position: relative;
        margin: 20px 12px 40px;
      }
      .modal-close {
        position: absolute; top: 14px; right: 16px;
        background: none; border: none;
        color: #a09088; font-size: 26px;
        cursor: pointer; line-height: 1;
      }
      .modal-profile {
        display: flex; gap: 16px; align-items: flex-start;
        margin-bottom: 24px; flex-wrap: wrap;
      }
      .modal-avatar {
        width: 76px; height: 76px; border-radius: 50%;
        object-fit: cover;
        border: 3px solid rgba(201,97,74,0.4);
        flex-shrink: 0;
      }
      .modal-avatar-ph {
        width: 76px; height: 76px; border-radius: 50%;
        background: #1e181a;
        border: 3px solid rgba(220,160,140,0.2);
        display: flex; align-items: center; justify-content: center;
        font-size: 32px; flex-shrink: 0;
      }
      .modal-name { font-size: 20px; font-weight: 700; color: #f0e8e2; margin: 0 0 4px; }
      .modal-sub  { color: #a09088; font-size: 13px; margin: 0 0 10px; }
      .modal-status-row { display: flex; gap: 6px; flex-wrap: wrap; }
      .modal-status-btn {
        padding: 5px 12px; border-radius: 100px;
        font-size: 11px; cursor: pointer; font-weight: 500;
        font-family: inherit;
      }
      .modal-fields {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 14px 20px;
      }
      .modal-field-wide { grid-column: 1 / -1; }
      .field-label-sm {
        font-size: 10px; color: #a09088;
        text-transform: uppercase; letter-spacing: 0.5px;
        margin: 0 0 3px;
      }
      .field-value {
        font-size: 14px; color: #f0e8e2;
        margin: 0; line-height: 1.5;
      }
      .modal-footer {
        margin-top: 20px; font-size: 11px;
        color: #a09088; text-align: right;
      }

      /* ── Responsive ── */
      @media (max-width: 700px) {
        .dash-wrap { padding: 20px 12px 48px; }
        .dash-title { font-size: 20px; }
        .table-wrap { display: none; }
        .card-list  { display: flex; }
        .modal-fields { grid-template-columns: 1fr; }
        .modal-field-wide { grid-column: 1; }
        .modal-box { padding: 22px 16px; margin: 0 0 0; border-radius: 20px 20px 0 0; align-self: flex-end; }
        .modal-backdrop { align-items: flex-end; padding: 0; }
      }

      @media (max-width: 480px) {
        .pg-card { padding: 36px 22px; }
      }
    `}</style>
  );
}

// ── Password Gate ─────────────────────────────────────────────────────────────
function PasswordGate({ onUnlock }) {
  const [input, setInput]   = useState("");
  const [error, setError]   = useState(false);
  const [show,  setShow]    = useState(false);

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
    <>
      <GlobalStyle />
      <div className="pg-wrap">
        <div className={`pg-card${error ? " error" : ""}`}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🔒</div>
          <h2 style={{ color: "#f0e8e2", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Admin Access</h2>
          <p style={{ color: "#a09088", fontSize: 14, marginBottom: 28 }}>Enter password to view submissions</p>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ position: "relative" }}>
              <input
                type={show ? "text" : "password"}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Password"
                autoFocus
                className={`pg-input${error ? " error" : ""}`}
              />
              <button type="button" className="pg-eye" onClick={() => setShow((s) => !s)}>
                {show ? "🙈" : "👁"}
              </button>
            </div>
            {error && <p style={{ color: "#f87171", fontSize: 13 }}>Incorrect password</p>}
            <button type="submit" className="pg-btn">Unlock →</button>
          </form>
        </div>
      </div>
    </>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ApplySubmissionsPage() {
  const [authed, setAuthed] = useState(false);
  const [ready,  setReady]  = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("apply_admin_auth") === "1") setAuthed(true);
    setReady(true);
  }, []);

  if (!ready) return <GlobalStyle />;
  if (!authed) return <PasswordGate onUnlock={() => setAuthed(true)} />;
  return <Dashboard />;
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [total,        setTotal]        = useState(0);
  const [page,         setPage]         = useState(1);
  const [totalPages,   setTotalPages]   = useState(1);
  const [loading,      setLoading]      = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [selected,     setSelected]     = useState(null);
  const [updating,     setUpdating]     = useState(false);

  const fetchData = async (pg = 1, status = filterStatus) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: pg, limit: 20 });
      if (status) params.set("status", status);
      const res  = await fetch(`/api/apply?${params}`);
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
    <>
      <GlobalStyle />
      <div className="dash-wrap">
        <div className="dash-inner">

          {/* Header */}
          <div className="dash-header">
            <div>
              <h1 className="dash-title">Apply Submissions</h1>
              <p className="dash-sub">{total} total application{total !== 1 ? "s" : ""}</p>
            </div>
          </div>

          {/* Filter + Logout */}
          <div className="filter-row">
            {["", "pending", "approved", "rejected"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`filter-btn${filterStatus === s ? " active" : ""}`}
              >
                {s === "" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
            <button className="logout-btn" onClick={logout}>🔓 Logout</button>
          </div>

          {/* Content */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#a09088" }}>Loading…</div>
          ) : applications.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#a09088" }}>No applications found.</div>
          ) : (
            <>
              {/* ── Desktop table ── */}
              <div className="table-wrap">
                <table className="app-table">
                  <thead>
                    <tr>
                      {["Photo","Name","Age / Gender","City","Profession","Intent","Serious","Status","Date","Actions"].map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => {
                      const sc = STATUS_COLORS[app.status] || STATUS_COLORS.pending;
                      return (
                        <tr key={app._id} onClick={() => setSelected(app)}>
                          <td>
                            {app.photoUrl
                              ? <img src={app.photoUrl} alt={app.fullName} className="avatar" />
                              : <div className="avatar-placeholder">👤</div>}
                          </td>
                          <td style={{ fontWeight: 500, color: "#f0e8e2", whiteSpace: "nowrap" }}>{app.fullName || "—"}</td>
                          <td style={{ color: "#a09088", whiteSpace: "nowrap" }}>{app.age || "—"} / {app.gender || "—"}</td>
                          <td style={{ color: "#a09088" }}>{app.city || "—"}</td>
                          <td style={{ color: "#a09088" }}>{app.profession || "—"}</td>
                          <td style={{ color: "#a09088" }}>{app.lookingFor || "—"}</td>
                          <td style={{ textAlign: "center" }}>
                            <span className="score-badge">{app.seriousnessScore || "—"}/10</span>
                          </td>
                          <td>
                            <span className="status-badge" style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}>
                              {app.status}
                            </span>
                          </td>
                          <td style={{ color: "#a09088", whiteSpace: "nowrap", fontSize: 11 }}>
                            {new Date(app.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </td>
                          <td onClick={(e) => e.stopPropagation()}>
                            <div className="action-btns">
                              <button disabled={updating || app.status === "approved"} onClick={() => updateStatus(app._id, "approved")}
                                className="approve-btn" style={{ opacity: app.status === "approved" ? 0.4 : 1 }}>✓ Approve</button>
                              <button disabled={updating || app.status === "rejected"} onClick={() => updateStatus(app._id, "rejected")}
                                className="reject-btn"  style={{ opacity: app.status === "rejected" ? 0.4 : 1 }}>✗ Reject</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* ── Mobile cards ── */}
              <div className="card-list">
                {applications.map((app) => {
                  const sc = STATUS_COLORS[app.status] || STATUS_COLORS.pending;
                  return (
                    <div key={app._id} className="app-card" onClick={() => setSelected(app)}>
                      <div className="card-top">
                        {app.photoUrl
                          ? <img src={app.photoUrl} alt={app.fullName} className="card-avatar" />
                          : <div className="card-avatar-ph">👤</div>}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="card-name">{app.fullName || "—"}</div>
                          <div className="card-meta">{app.age || "—"} yrs · {app.gender || "—"} · {app.city || "—"}</div>
                          <div className="card-meta" style={{ marginTop: 2 }}>{app.profession || "—"}</div>
                        </div>
                        <span className="status-badge" style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`, alignSelf: "flex-start", flexShrink: 0 }}>
                          {app.status}
                        </span>
                      </div>
                      <div className="card-chips">
                        {app.lookingFor && <span className="chip">{app.lookingFor}</span>}
                        {app.seriousnessScore && <span className="chip">🔥 {app.seriousnessScore}/10</span>}
                        {app.income && <span className="chip">{app.income}</span>}
                        <span className="chip" style={{ color: "#a09088", fontSize: 10 }}>
                          {new Date(app.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>
                      <div className="card-actions" onClick={(e) => e.stopPropagation()}>
                        <button disabled={updating || app.status === "approved"} onClick={() => updateStatus(app._id, "approved")}
                          className="card-action-btn"
                          style={{ border: "1px solid #4ade8040", background: "#0a2015", color: "#4ade80", opacity: app.status === "approved" ? 0.4 : 1 }}>
                          ✓ Approve
                        </button>
                        <button disabled={updating || app.status === "rejected"} onClick={() => updateStatus(app._id, "rejected")}
                          className="card-action-btn"
                          style={{ border: "1px solid #f8717140", background: "#200a0a", color: "#f87171", opacity: app.status === "rejected" ? 0.4 : 1 }}>
                          ✗ Reject
                        </button>
                        <button onClick={() => setSelected(app)}
                          className="card-action-btn"
                          style={{ border: "1px solid rgba(220,160,140,0.2)", background: "transparent", color: "#a09088" }}>
                          View →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button className="page-btn" onClick={() => fetchData(page - 1)} disabled={page === 1}>← Prev</button>
                  <span className="page-info">Page {page} of {totalPages}</span>
                  <button className="page-btn" onClick={() => fetchData(page + 1)} disabled={page === totalPages}>Next →</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ── Detail Modal ── */}
      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>×</button>

            {/* Profile header */}
            <div className="modal-profile">
              {selected.photoUrl
                ? <img src={selected.photoUrl} alt={selected.fullName} className="modal-avatar" />
                : <div className="modal-avatar-ph">👤</div>}
              <div>
                <h2 className="modal-name">{selected.fullName || "—"}</h2>
                <p className="modal-sub">{selected.age} yrs · {selected.gender} · {selected.city}</p>
                <div className="modal-status-row">
                  {["approved", "rejected", "pending"].map((s) => {
                    const sc = STATUS_COLORS[s];
                    return (
                      <button key={s} disabled={updating || selected.status === s}
                        onClick={() => updateStatus(selected._id, s)}
                        className="modal-status-btn"
                        style={{
                          border: `1px solid ${sc.border}`,
                          background: selected.status === s ? sc.bg : "transparent",
                          color: selected.status === s ? sc.text : "#a09088",
                          opacity: selected.status === s ? 1 : 0.7,
                        }}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Fields grid */}
            <div className="modal-fields">
              {Object.entries(FIELD_LABELS).map(([key, label]) => {
                const val = selected[key];
                if (val === undefined || val === null || val === "") return null;
                const display = Array.isArray(val) ? val.join(", ") : String(val);
                return (
                  <div key={key} className={WIDE_FIELDS.has(key) ? "modal-field-wide" : ""}>
                    <p className="field-label-sm">{label}</p>
                    <p className="field-value">{display}</p>
                  </div>
                );
              })}
            </div>

            <p className="modal-footer">
              Submitted {new Date(selected.createdAt).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
