// Dashboard component: Main user dashboard that handles navigation between
// overview, bookings, workshop proposals, profile, and instructor review sections.

import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { WORKSHOPS, WORKSHOP_TYPES, STATES } from "../data/mockData";

// icons as inline SVG strings to keep zero dependencies
const icons = {
  home:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
  list:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  plus:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
  user:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  check:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg>,
  calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
};

// Handles dashboard UI, user authentication check, and tab-based navigation
export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [proposeOpen, setProposeOpen] = useState(false);

  // If not logged in, send to login
  if (!user) return <Navigate to="/login" state={{ from: "/dashboard" }} replace />;

  // Filter upcoming workshops for bookings preview
  const myBookings  = WORKSHOPS.filter(w => w.status === "upcoming").slice(0, 2);
  const pendingReview = WORKSHOPS.filter(w => w.status === "upcoming").slice(1, 4);

  // Navigation items based on user role (instructor gets extra tab)
  const navItems = [
    { id: "overview",  label: "Overview",          icon: icons.home },
    { id: "bookings",  label: "My Bookings",        icon: icons.list },
    { id: "propose",   label: "Propose Workshop",   icon: icons.plus },
    { id: "profile",   label: "Profile",            icon: icons.user },
    ...(user.role === "instructor" ? [{ id: "review", label: "Review Requests", icon: icons.check }] : []),
  ];

  return (
    <div className="dashboard-layout">
      {/* ── Sidebar ────────────────────────────────────── */}
      <aside className="dash-sidebar">
        {/* user avatar */}
        <div style={{ display:"flex", alignItems:"center", gap:".75rem", padding:".5rem .75rem 1.25rem", borderBottom:"1px solid var(--border)", marginBottom:"1rem" }}>
          <div style={{ width:40, height:40, borderRadius:"50%", background:"var(--accent)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:".9rem", flexShrink:0 }}>
            {user.name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase()}
          </div>
          <div style={{ overflow:"hidden" }}>
            <div style={{ fontWeight:700, fontSize:".9rem", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{user.name}</div>
            <div style={{ fontSize:".72rem", color:"var(--text2)", textTransform:"capitalize" }}>{user.role}</div>
          </div>
        </div>

        {navItems.map(n => (
          <button
            key={n.id}
            className={`dash-nav-item ${activeTab === n.id ? "active" : ""}`}
            onClick={() => setActiveTab(n.id)}
          >
            {n.icon} {n.label}
          </button>
        ))}
      </aside>

      {/* ── Main content ───────────────────────────────── */}
      <main className="dash-content">
        {/* ── Overview ─────────────────────────── */}
        {activeTab === "overview" && (
          <>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1.5rem", flexWrap:"wrap", gap:"1rem" }}>
              <div>
                <h2 style={{ marginBottom:".2rem" }}>Welcome back, {user.name.split(" ")[0]} 👋</h2>
                <p style={{ margin:0 }}>{user.institute} · {user.role}</p>
              </div>
              <button className="btn btn-primary" onClick={() => setActiveTab("propose")}>
                + Propose Workshop
              </button>
            </div>

            <div className="stat-cards">
              {[
                ["2",   "Workshops Booked",  "var(--accent2)"],
                ["1",   "Pending Approval",  "var(--warning)"],
                ["0",   "Completed",         "var(--success)"],
                ["342+","Total on Platform", "var(--text3)"],
              ].map(([n, l, c]) => (
                <div className="stat-card" key={l}>
                  <div className="stat-card-num" style={{ color: c }}>{n}</div>
                  <div className="stat-card-label">{l}</div>
                </div>
              ))}
            </div>

            <h3 className="dash-section-title">Upcoming Workshops</h3>
            <div style={{ display:"flex", flexDirection:"column", gap:".75rem" }}>
              {myBookings.map(w => (
                <div key={w.id} style={{ background:"var(--bg2)", border:"1px solid var(--border)", borderRadius:"var(--radius)", padding:"1rem 1.25rem", display:"flex", alignItems:"center", gap:"1rem", flexWrap:"wrap" }}>
                  <span className={`badge badge-${w.workshop_type.toLowerCase()}`}>{w.workshop_type}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, fontSize:".95rem" }}>{w.title}</div>
                    <div style={{ fontSize:".8rem", color:"var(--text2)" }}>
                      {new Date(w.date).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})} · {w.location}
                    </div>
                  </div>
                  <span className="badge badge-upcoming">Confirmed</span>
                  <Link to={`/workshops/${w.id}`} className="btn btn-outline btn-sm">View</Link>
                </div>
              ))}
            </div>

            <div style={{ marginTop:"1.75rem" }}>
              <h3 className="dash-section-title">Quick Actions</h3>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(180px,1fr))", gap:"1rem" }}>
                {[
                  { label:"Browse Workshops", icon:"🔍", to:"/workshops" },
                  { label:"Propose a Workshop", icon:"📋", action:() => setActiveTab("propose") },
                  { label:"Edit Profile", icon:"👤", action:() => setActiveTab("profile") },
                ].map(a => (
                  a.to
                    ? <Link key={a.label} to={a.to} className="card" style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:".5rem", padding:"1.25rem", textAlign:"center", color:"var(--text)", textDecoration:"none" }}>
                        <span style={{ fontSize:"1.5rem" }}>{a.icon}</span>
                        <span style={{ fontWeight:600, fontSize:".88rem" }}>{a.label}</span>
                      </Link>
                    : <button key={a.label} className="card" onClick={a.action} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:".5rem", padding:"1.25rem", textAlign:"center", cursor:"pointer" }}>
                        <span style={{ fontSize:"1.5rem" }}>{a.icon}</span>
                        <span style={{ fontWeight:600, fontSize:".88rem" }}>{a.label}</span>
                      </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── My Bookings ──────────────────────── */}
        {activeTab === "bookings" && (
          <>
            <h2 className="dash-section-title">My Bookings</h2>
            {myBookings.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📅</div>
                <h3>No bookings yet</h3>
                <p>Browse workshops and book a seat.</p>
                <Link to="/workshops" className="btn btn-primary">Find Workshops</Link>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
                {myBookings.map(w => (
                  <div key={w.id} className="card" style={{ display:"flex", gap:"1.25rem", alignItems:"flex-start", flexWrap:"wrap" }}>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", gap:".5rem", marginBottom:".5rem", flexWrap:"wrap" }}>
                        <span className={`badge badge-${w.workshop_type.toLowerCase()}`}>{w.workshop_type}</span>
                        <span className="badge badge-upcoming">Confirmed</span>
                      </div>
                      <h3 style={{ fontSize:"1rem", marginBottom:".35rem" }}>{w.title}</h3>
                      <div style={{ fontSize:".83rem", color:"var(--text2)", display:"flex", flexDirection:"column", gap:".2rem" }}>
                        <span>📅 {new Date(w.date).toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</span>
                        <span>📍 {w.location}</span>
                        <span>👨‍🏫 {w.instructor.name}</span>
                      </div>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:".5rem" }}>
                      <Link to={`/workshops/${w.id}`} className="btn btn-outline btn-sm">View Details</Link>
                      <button className="btn btn-ghost btn-sm" style={{ color:"var(--danger)" }}>Cancel</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── Propose Workshop ─────────────────── */}
        {activeTab === "propose" && (
          <>
            <h2 className="dash-section-title">Propose a Workshop</h2>
            <p style={{ marginBottom:"1.5rem" }}>Submit a request to FOSSEE instructors. They'll review your proposal and respond within a few days.</p>
            <ProposeForm user={user} onSuccess={() => setActiveTab("overview")} />
          </>
        )}

        {/* ── Profile ──────────────────────────── */}
        {activeTab === "profile" && <ProfileTab user={user} />}

        {/* ── Instructor: Review requests ──────── */}
        {activeTab === "review" && user.role === "instructor" && (
          <InstructorReviewTab pendingReview={pendingReview} />
        )}
      </main>
    </div>
  );
}

// ── Propose Workshop form ────────────────────────────────────────────────────
function ProposeForm({ user, onSuccess }) {
  const [form, setForm] = useState({
    workshop_type: "", proposed_date: "", location: user?.institute || "",
    state: user?.state || "", expected_participants: "", notes: "",
  });
  const [errors,  setErrors]  = useState({});
  const [done,    setDone]    = useState(false);
  const [loading, setLoading] = useState(false);

  // Validate form inputs before submission
  function validate() {
    const e = {};
    if (!form.workshop_type)         e.workshop_type         = "Select a workshop type";
    if (!form.proposed_date)         e.proposed_date         = "Select a proposed date";
    if (!form.location.trim())       e.location              = "Location is required";
    if (!form.state)                 e.state                 = "Select state";
    if (!form.expected_participants) e.expected_participants = "Estimate the number of participants";
    return e;
  }
  // Handle form submission and simulate API request
  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 800);
  }

  function set(f) { return e => { setForm(p=>({...p,[f]:e.target.value})); setErrors(p=>({...p,[f]:""})); }; }

  if (done) return (
    <div className="card" style={{ textAlign:"center", padding:"2.5rem", display:"flex", flexDirection:"column", alignItems:"center", gap:".85rem", maxWidth:480 }}>
      <div style={{ fontSize:"2.5rem" }}>✅</div>
      <h3>Proposal submitted!</h3>
      <p>A FOSSEE instructor will review your request and respond via email within 3–5 working days.</p>
      <button className="btn btn-primary" onClick={onSuccess}>Back to Dashboard</button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"1rem", maxWidth:580 }} noValidate>
      <div className="form-group">
        <label>Workshop Type *</label>
        <select className={`input filter-select ${errors.workshop_type?"error":""}`} value={form.workshop_type} onChange={set("workshop_type")} style={{ width:"100%" }}>
          <option value="">Select type</option>
          {WORKSHOP_TYPES.map(t=><option key={t.id} value={t.name}>{t.name}</option>)}
        </select>
        {errors.workshop_type && <span className="error-msg">{errors.workshop_type}</span>}
      </div>

      <div className="grid-2">
        <div className="form-group">
          <label>Proposed Date *</label>
          <input className={`input ${errors.proposed_date?"error":""}`} type="date" value={form.proposed_date} onChange={set("proposed_date")} min={new Date().toISOString().split("T")[0]} />
          {errors.proposed_date && <span className="error-msg">{errors.proposed_date}</span>}
        </div>
        <div className="form-group">
          <label>Expected Participants *</label>
          <input className={`input ${errors.expected_participants?"error":""}`} type="number" placeholder="e.g. 40" min="5" max="500" value={form.expected_participants} onChange={set("expected_participants")} />
          {errors.expected_participants && <span className="error-msg">{errors.expected_participants}</span>}
        </div>
      </div>

      <div className="form-group">
        <label>Location / Venue *</label>
        <input className={`input ${errors.location?"error":""}`} type="text" placeholder="College name + city" value={form.location} onChange={set("location")} />
        {errors.location && <span className="error-msg">{errors.location}</span>}
      </div>

      <div className="form-group">
        <label>State *</label>
        <select className={`input filter-select ${errors.state?"error":""}`} value={form.state} onChange={set("state")} style={{ width:"100%" }}>
          <option value="">Select state</option>
          {STATES.map(s=><option key={s} value={s}>{s}</option>)}
        </select>
        {errors.state && <span className="error-msg">{errors.state}</span>}
      </div>

      <div className="form-group">
        <label>Additional Notes</label>
        <textarea className="input" rows={3} placeholder="Any specific requirements, equipment available, preferred timing, etc." value={form.notes} onChange={set("notes")} style={{ resize:"vertical" }} />
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading} style={{ alignSelf:"flex-start" }}>
        {loading ? "Submitting…" : "Submit Proposal"}
      </button>
    </form>
  );
}

// ── Profile tab ──────────────────────────────────────────────────────────────
function ProfileTab({ user }) {
  const [form, setForm] = useState({
    name: user.name || "", email: user.email || "",
    phone: user.phone || "", institute: user.institute || "", state: user.state || "",
  });
  const [saved, setSaved] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <>
      <h2 className="dash-section-title">Profile</h2>
      <div style={{ maxWidth: 520 }}>
        {saved && (
          <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:"var(--radius)", padding:".75rem 1rem", marginBottom:"1rem", color:"var(--success)", fontSize:".88rem" }}>
            ✓ Profile updated successfully
          </div>
        )}
        <form onSubmit={handleSave} style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:".5rem" }}>
            <div style={{ width:56, height:56, borderRadius:"50%", background:"var(--accent)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:"1.1rem" }}>
              {user.name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight:700 }}>{user.name}</div>
              <div style={{ fontSize:".8rem", color:"var(--text2)", textTransform:"capitalize" }}>{user.role} · {user.institute}</div>
            </div>
          </div>

          {[
            { name:"name",      label:"Full Name",   type:"text"  },
            { name:"email",     label:"Email",       type:"email" },
            { name:"phone",     label:"Phone",       type:"tel"   },
            { name:"institute", label:"Institute",   type:"text"  },
          ].map(f => (
            <div className="form-group" key={f.name}>
              <label htmlFor={`profile-${f.name}`}>{f.label}</label>
              <input id={`profile-${f.name}`} className="input" type={f.type} value={form[f.name]} onChange={e => setForm(p=>({...p,[f.name]:e.target.value}))} />
            </div>
          ))}

          <div className="form-group">
            <label>State</label>
            <select className="input filter-select" value={form.state} onChange={e=>setForm(p=>({...p,state:e.target.value}))} style={{ width:"100%" }}>
              <option value="">Select state</option>
              {STATES.map(s=><option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ alignSelf:"flex-start" }}>Save Changes</button>
        </form>
      </div>
    </>
  );
}

// ── Instructor Review Tab — Accept / Reject / Postpone with real state ────────
function InstructorReviewTab({ pendingReview }) {
  // Track status for each workshop: pending | accepted | rejected | postponed
  const [statuses,     setStatuses]     = useState(() =>
    Object.fromEntries(pendingReview.map(w => [w.id, "pending"]))
  );
  const [postponeDates, setPostponeDates] = useState({});
  const [postponeOpen,  setPostponeOpen]  = useState({});

  function act(id, action) {
    setStatuses(p => ({ ...p, [id]: action }));
    setPostponeOpen(p => ({ ...p, [id]: false }));
  }

  const pending   = pendingReview.filter(w => statuses[w.id] === "pending");
  const actioned  = pendingReview.filter(w => statuses[w.id] !== "pending");

  return (
    <>
      <h2 className="dash-section-title">Workshop Requests</h2>
      <p style={{ marginBottom: "1.5rem" }}>
        Review coordinator proposals. Accept to confirm, suggest a new date to postpone, or reject.
      </p>

      {pending.length === 0 && actioned.length > 0 && (
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "var(--radius)", padding: ".85rem 1.1rem", marginBottom: "1.25rem", fontSize: ".88rem", color: "var(--success)" }}>
          ✓ All requests reviewed for now.
        </div>
      )}

      {/* Pending requests */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
        {pending.map(w => (
          <div key={w.id} className="card">
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: ".5rem", marginBottom: ".5rem", flexWrap: "wrap" }}>
                  <span className={`badge badge-${w.workshop_type.toLowerCase()}`}>{w.workshop_type}</span>
                  <span className="badge" style={{ background: "#fef3c7", color: "#92400e" }}>Pending Review</span>
                </div>
                <h3 style={{ fontSize: "1rem", marginBottom: ".4rem" }}>{w.title}</h3>
                <div style={{ fontSize: ".83rem", color: "var(--text2)", display: "flex", flexDirection: "column", gap: ".25rem" }}>
                  <span>📅 Proposed: {new Date(w.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  <span>📍 {w.location} {w.state ? `· ${w.state}` : ""}</span>
                  <span>👤 {w.coordinator.name} · {w.coordinator.institute}</span>
                  <span>🪑 Expected: {w.seats} participants</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: ".5rem", minWidth: 130 }}>
                <button className="btn btn-primary btn-sm" onClick={() => act(w.id, "accepted")}>
                  ✓ Accept
                </button>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => setPostponeOpen(p => ({ ...p, [w.id]: !p[w.id] }))}
                >
                  📅 Suggest Date
                </button>
                <button
                  className="btn btn-ghost btn-sm"
                  style={{ color: "var(--danger)" }}
                  onClick={() => act(w.id, "rejected")}
                >
                  ✕ Reject
                </button>
              </div>
            </div>

            {/* Postpone date picker */}
            {postponeOpen[w.id] && (
              <div style={{ marginTop: "1rem", padding: "1rem", background: "var(--bg)", borderRadius: "var(--radius)", border: "1px solid var(--border)", display: "flex", gap: ".75rem", flexWrap: "wrap", alignItems: "flex-end" }}>
                <div className="form-group" style={{ flex: 1, minWidth: 200 }}>
                  <label>Suggest a new date for this workshop</label>
                  <input
                    className="input"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={postponeDates[w.id] || ""}
                    onChange={e => setPostponeDates(p => ({ ...p, [w.id]: e.target.value }))}
                  />
                </div>
                <button
                  className="btn btn-primary"
                  disabled={!postponeDates[w.id]}
                  onClick={() => act(w.id, "postponed")}
                >
                  Send to Coordinator
                </button>
                <button className="btn btn-ghost" onClick={() => setPostponeOpen(p => ({ ...p, [w.id]: false }))}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Actioned requests */}
      {actioned.length > 0 && (
        <>
          <h3 style={{ fontSize: ".9rem", color: "var(--text2)", marginBottom: ".75rem", fontWeight: 600 }}>
            Already reviewed
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: ".65rem" }}>
            {actioned.map(w => {
              const status = statuses[w.id];
              const badge = {
                accepted:  { bg: "#d1fae5", color: "#065f46", label: "✓ Accepted" },
                rejected:  { bg: "#fee2e2", color: "#991b1b", label: "✕ Rejected" },
                postponed: { bg: "#dbeafe", color: "#1d4ed8", label: "📅 New date sent" },
              }[status];
              return (
                <div key={w.id} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: ".9rem 1.1rem", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", flexWrap: "wrap", opacity: .75 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: ".92rem" }}>{w.title}</div>
                    <div style={{ fontSize: ".8rem", color: "var(--text2)" }}>
                      {w.coordinator.name} · {new Date(w.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      {status === "postponed" && postponeDates[w.id] && (
                        <span style={{ color: "var(--accent2)" }}> → {new Date(postponeDates[w.id]).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                      )}
                    </div>
                  </div>
                  <span className="badge" style={{ background: badge.bg, color: badge.color }}>{badge.label}</span>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => setStatuses(p => ({ ...p, [w.id]: "pending" }))}
                  >
                    Undo
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
