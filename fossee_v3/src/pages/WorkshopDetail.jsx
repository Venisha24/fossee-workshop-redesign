import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { WORKSHOPS } from "../data/mockData";
import { useAuth } from "../context/AuthContext";

const TYPE_BADGE = {
  Python:"badge-python", Scilab:"badge-scilab", OpenModelica:"badge-openmodelica",
  DWSIM:"badge-dwsim", FreeCAD:"badge-freecad", Django:"badge-django",
};

export default function WorkshopDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const w = WORKSHOPS.find(x => x.id === Number(id));

  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "", institute: user?.institute || "", message: "" });
  const [errors, setErrors] = useState({});

  if (!w) return (
    <div className="page-wrap page-top">
      <div className="empty-state">
        <div className="empty-icon">😕</div>
        <h3>Workshop not found</h3>
        <Link to="/workshops" className="btn btn-primary">Back to workshops</Link>
      </div>
    </div>
  );

  const left  = w.seats - w.booked;
  const pct   = Math.round((w.booked / w.seats) * 100);
  const full  = left <= 0;
  const dateStr = new Date(w.date).toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long", year:"numeric" });

  function validate() {
    const e = {};
    if (!form.name.trim())  e.name  = "Name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!/^\d{10}$/.test(form.phone))     e.phone = "Enter a 10-digit phone number";
    if (!form.institute.trim()) e.institute = "Institute name is required";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    // simulate API call
    setTimeout(() => { setLoading(false); setBooked(true); }, 1200);
  }

  if (booked) return (
    <div className="page-wrap page-top" style={{ maxWidth: 560, margin: "0 auto" }}>
      <div className="card" style={{ textAlign: "center", padding: "3rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <div style={{ fontSize: "3rem" }}>🎉</div>
        <h2>You're registered!</h2>
        <p>A confirmation has been sent to <strong>{form.email}</strong>.</p>
        <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1rem 1.5rem", width: "100%", textAlign: "left" }}>
          <div style={{ fontWeight: 700, marginBottom: ".4rem" }}>{w.title}</div>
          <div style={{ fontSize: ".85rem", color: "var(--text2)" }}>{dateStr}</div>
          <div style={{ fontSize: ".85rem", color: "var(--text2)" }}>{w.location}</div>
        </div>
        <Link to="/workshops" className="btn btn-primary">Browse more workshops</Link>
        <Link to="/dashboard" className="btn btn-outline">Go to dashboard</Link>
      </div>
    </div>
  );

  return (
    <div className="page-wrap page-top">
      {/* breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: ".5rem", fontSize: ".83rem", color: "var(--text2)", marginBottom: "1.5rem" }}>
        <Link to="/workshops" style={{ color: "var(--accent)" }}>Workshops</Link>
        <span>›</span>
        <span>{w.title}</span>
      </div>

      <div className="workshop-detail-grid">
        {/* ── Left: details ──────────────────────────────── */}
        <div>
          <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <span className={`badge ${TYPE_BADGE[w.workshop_type] || "badge-python"}`}>{w.workshop_type}</span>
            <span className={`badge badge-${w.level.toLowerCase()}`}>{w.level}</span>
            <span className={`badge badge-${w.status}`}>{w.status}</span>
          </div>

          <h1 style={{ marginBottom: "1.5rem" }}>{w.title}</h1>

          {/* meta grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem", marginBottom: "2rem" }}>
            {[
              ["📅 Date", dateStr],
              ["⏱ Duration", `${w.duration} day${w.duration > 1 ? "s" : ""}`],
              ["📍 Location", w.location],
              [w.state ? "🗺 State" : "", w.state || ""],
              ["👨‍🏫 Instructor", w.instructor.name],
              ["🎓 Coordinator", w.coordinator.institute],
              ["🪑 Seats", `${w.seats - w.booked} left of ${w.seats}`],
              ["📚 Prerequisites", w.prerequisites],
            ].filter(([k]) => k).map(([k, v]) => (
              <div key={k} style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: ".75rem 1rem" }}>
                <div className="label" style={{ marginBottom: ".2rem" }}>{k}</div>
                <div style={{ fontSize: ".92rem", fontWeight: 600 }}>{v}</div>
              </div>
            ))}
          </div>

          <h3 style={{ marginBottom: ".65rem" }}>About this workshop</h3>
          <p style={{ lineHeight: 1.8, marginBottom: "2rem" }}>{w.description}</p>

          {/* coordinator info */}
          <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1.1rem 1.25rem" }}>
            <div className="label" style={{ marginBottom: ".5rem" }}>Organised by</div>
            <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: ".9rem", flexShrink: 0 }}>
                {w.coordinator.name.split(" ").map(n => n[0]).join("").slice(0,2)}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: ".92rem" }}>{w.coordinator.name}</div>
                <div style={{ fontSize: ".8rem", color: "var(--text2)" }}>{w.coordinator.institute}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: booking sidebar ─────────────────────── */}
        <div className="detail-sidebar">
          <div className="sidebar-top">
            <div style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: ".2rem" }}>Free</div>
            <div style={{ fontSize: ".82rem", color: "var(--text2)" }}>No registration fee</div>
          </div>

          <div className="sidebar-body">
            {/* seats progress */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".82rem", marginBottom: ".35rem" }}>
                <span style={{ color: "var(--text2)" }}>Seats filled</span>
                <span style={{ fontWeight: 600, color: full ? "var(--danger)" : "var(--text)" }}>
                  {full ? "Full" : `${left} left`}
                </span>
              </div>
              <div className="seats-bar" style={{ height: 7 }}>
                <div
                  className={`seats-fill ${full ? "full" : pct >= 75 ? "warn" : ""}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            {/* key info */}
            {[
              ["Date", new Date(w.date).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})],
              ["Duration", `${w.duration} day${w.duration>1?"s":""}`],
              ["Location", w.location],
              ["Level", w.level],
            ].map(([k,v]) => (
              <div className="sidebar-info-row" key={k}>
                <span>{k}</span><span>{v}</span>
              </div>
            ))}

            {/* booking form or login prompt */}
            {w.status !== "upcoming" ? (
              <div style={{ textAlign: "center", padding: "1rem 0", color: "var(--text2)", fontSize: ".88rem" }}>
                This workshop has ended.
              </div>
            ) : full ? (
              <button className="btn btn-outline btn-full" disabled>
                Fully Booked
              </button>
            ) : !user ? (
              <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: ".65rem" }}>
                <p style={{ fontSize: ".84rem", margin: 0 }}>Sign in to book this workshop</p>
                <Link to="/login" className="btn btn-primary btn-full">Sign In</Link>
                <Link to="/signup" className="btn btn-outline btn-full">Create Account</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: ".85rem" }} noValidate>
                <div style={{ fontWeight: 700, fontSize: ".92rem" }}>Your details</div>

                {[
                  { name:"name",      label:"Full Name",   type:"text",  ph:"Your name" },
                  { name:"email",     label:"Email",       type:"email", ph:"you@example.com" },
                  { name:"phone",     label:"Phone",       type:"tel",   ph:"10-digit number" },
                  { name:"institute", label:"Institute",   type:"text",  ph:"College / University" },
                ].map(f => (
                  <div className="form-group" key={f.name}>
                    <label htmlFor={f.name}>{f.label}</label>
                    <input
                      id={f.name}
                      className={`input ${errors[f.name] ? "error" : ""}`}
                      type={f.type}
                      placeholder={f.ph}
                      value={form[f.name]}
                      onChange={e => { setForm(p => ({...p,[f.name]:e.target.value})); setErrors(p => ({...p,[f.name]:""})); }}
                    />
                    {errors[f.name] && <span className="error-msg">{errors[f.name]}</span>}
                  </div>
                ))}

                <div className="form-group">
                  <label htmlFor="message">Message (optional)</label>
                  <textarea
                    id="message"
                    className="input"
                    rows={2}
                    placeholder="Any questions for the instructor?"
                    value={form.message}
                    onChange={e => setForm(p=>({...p,message:e.target.value}))}
                    style={{ resize: "vertical" }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-full"
                  disabled={loading}
                >
                  {loading ? "Booking…" : "Confirm Booking"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
