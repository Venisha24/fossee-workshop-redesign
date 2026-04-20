import { Link } from "react-router-dom";
import { WORKSHOPS, STATS, WORKSHOP_TYPES } from "../data/mockData";
import WorkshopCard from "../components/WorkshopCard";

// just show 3 upcoming ones on the homepage
const featured = WORKSHOPS.filter(w => w.status === "upcoming").slice(0, 3);

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="hero">
        <div className="page-wrap">
          <div className="hero-inner">

            {/* Left side: title, description, CTA buttons */}
            <div className="hero-left">
              <div className="hero-eyebrow">
                🎓 IIT Bombay · FOSSEE Initiative
              </div>

              {/* Main heading */}
              <h1>
                Book open-source<br />
                <span>science workshops</span><br />
                across India
              </h1>

              {/* Short description */}
              <p>
                Coordinators propose workshops. Instructors accept them.
                Students learn Python, Scilab, FreeCAD and more — free of cost.
              </p>

              {/* Call-to-action buttons */}
              <div className="hero-btns">
                <Link to="/workshops" className="btn btn-primary btn-lg">
                  Browse Workshops
                </Link>
                <Link to="/signup" className="btn btn-outline btn-lg">
                  Register as Coordinator
                </Link>
              </div>

              {/* Platform statistics (dynamic from mock data) */}
              <div className="hero-stats">
                {[
                  [STATS.total_workshops + "+", "Workshops Conducted"],
                  [STATS.total_coordinators + "+", "Coordinators"],
                  [STATS.states_covered, "States Covered"],
                  [STATS.tools_covered, "Open-Source Tools"],
                ].map(([n, l]) => (
                  <div className="hero-stat" key={l}>
                    <strong>{n}</strong>
                    <small>{l}</small>
                  </div>
                ))}
              </div>
            </div>

            {/* mini preview card — gives visitor a sense of what's inside */}
            <div className="hero-card">
              <div className="hero-card-title">Live workshops this month</div>

              {/* Show 4 upcoming workshops as preview */}
              {WORKSHOPS.filter(w => w.status === "upcoming").slice(0, 4).map(w => (
                <div className="hero-card-line" key={w.id}>
                  <span className="dot" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: ".84rem", color: "var(--text)" }}>
                      {w.title}
                    </div>

                    {/* Format date for display */}
                    <div style={{ fontSize: ".75rem" }}>
                      {new Date(w.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      &nbsp;·&nbsp; {w.location}
                    </div>
                  </div>

                  {/* Workshop type badge */}
                  <span className={`badge badge-${w.workshop_type.toLowerCase()}`} style={{ fontSize: ".65rem" }}>
                    {w.workshop_type}
                  </span>
                </div>
              ))}
              <Link to="/workshops" className="btn btn-outline btn-sm" style={{ marginTop: ".25rem" }}>
                See all workshops →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Workshop types strip ─────────────────────────── */}
      <section style={{ background: "var(--bg2)", borderBottom: "1px solid var(--border)", padding: "1.5rem 0" }}>
        <div className="page-wrap">
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>

            {/* Label */}
            <span className="label" style={{ marginRight: ".25rem" }}>Topics:</span>

            {/* Filter links for each workshop type */}
            {WORKSHOP_TYPES.map(t => (
              <Link
                key={t.id}
                to={`/workshops?type=${t.name}`}
                className={`filter-chip badge-${t.name.toLowerCase()}`}
                style={{ textDecoration: "none" }}
              >
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="page-wrap" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>

        {/* ── Featured workshops ──────────────────────────── */}
        <section>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <h2>Upcoming Workshops</h2>
            <Link to="/workshops" className="btn btn-ghost btn-sm">View all →</Link>
          </div>

          {/* Display selected featured workshops */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {featured.map(w => <WorkshopCard key={w.id} w={w} />)}
          </div>
        </section>

        {/* ── How it works ────────────────────────────────── */}
        <section className="section-gap">
          <h2 style={{ marginBottom: "1.75rem" }}>How it works</h2>

          {/* Step-by-step workflow */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.25rem" }}>
            {[
              { step: "01", title: "Coordinator registers", desc: "A coordinator from any college or institute creates an account and proposes a workshop date and location." },
              { step: "02", title: "Instructor reviews", desc: "A FOSSEE instructor sees the proposal and either accepts, rejects, or suggests a new date." },
              { step: "03", title: "Workshop is confirmed", desc: "Once accepted, the workshop appears in the public list and students can register for it." },
              { step: "04", title: "Attend and learn", desc: "Students attend the free workshop, get hands-on training, and receive certificates." },
            ].map(s => (
              <div className="card" key={s.step} style={{ display: "flex", flexDirection: "column", gap: ".65rem" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: "1.6rem", fontWeight: 700, color: "var(--accent)", opacity: .35, lineHeight: 1 }}>
                  {s.step}
                </div>
                <h3 style={{ fontSize: "1rem" }}>{s.title}</h3>
                <p style={{ fontSize: ".85rem" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA banner ──────────────────────────────────── */}
        <section
          className="section-gap"
          style={{
            background: "var(--text)", borderRadius: "var(--radius-lg)",
            padding: "2.5rem 2rem", display: "flex",
            alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "1.5rem",
          }}
        >
          <div>
            <h2 style={{ color: "#fff", marginBottom: ".4rem" }}>Want to host a workshop?</h2>
            <p style={{ color: "rgba(255,255,255,.55)", margin: 0 }}>
              Register as a coordinator and propose a free FOSSEE workshop at your institute.
            </p>
          </div>

          {/* CTA button */}
          <Link to="/signup" className="btn btn-primary btn-lg">
            Get Started →
          </Link>
        </section>
      </div>
    </>
  );
}
