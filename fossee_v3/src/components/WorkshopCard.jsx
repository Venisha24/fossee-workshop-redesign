import { Link } from "react-router-dom";

// Mapping workshop types to badge styles for UI display
const TYPE_BADGE = {
  Python: "badge-python", Scilab: "badge-scilab",
  OpenModelica: "badge-openmodelica", DWSIM: "badge-dwsim",
  FreeCAD: "badge-freecad", Django: "badge-django",
};

// Mapping difficulty levels to badge styles
const LEVEL_BADGE = {
  Beginner: "badge-beginner", Intermediate: "badge-intermediate", Advanced: "badge-advanced",
};

// WorkshopCard component: Displays a single workshop with details,
// instructor info, availability, and booking action
export default function WorkshopCard({ w }) {

  // Calculate seats left and booking percentage
  const left = w.seats - w.booked;
  const pct  = Math.round((w.booked / w.seats) * 100);

  // Check if workshop is fully booked
  const full  = left <= 0;

  return (
    <article className="workshop-card">

      {/* Top section: badges and title */}
      <div className="workshop-card-top">
        <div className="workshop-card-top-row">

          {/* Workshop type badge */}
          <span className={`badge ${TYPE_BADGE[w.workshop_type] || "badge-python"}`}>
            {w.workshop_type}
          </span>

          {/* Difficulty level badge */}
          <span className={`badge ${LEVEL_BADGE[w.level] || "badge-beginner"}`}>
            {w.level}
          </span>

          {/* Status badges */}
          {w.status === "completed" && <span className="badge badge-completed">Completed</span>}
          {w.status === "cancelled" && <span className="badge badge-cancelled">Cancelled</span>}
        </div>

        {/* Workshop title */}  
        <h3 className="workshop-card-title">{w.title}</h3>
      </div>
      
      {/* Body section: instructor, date, location, description */}
      <div className="workshop-card-body">
        <div className="workshop-card-meta">

          {/* Instructor info */}
          <div className="meta-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            {w.instructor.name}
          </div>

          {/* Date and duration */}
          <div className="meta-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            {new Date(w.date).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}
            &nbsp;·&nbsp; {w.duration} day{w.duration > 1 ? "s" : ""}
          </div>

          {/* Location info */}
          <div className="meta-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {w.location}
          </div>
        </div>
        
        {/* Short description (truncated if too long) */}
        <p style={{ fontSize: ".83rem", color: "var(--text2)", lineHeight: 1.55, marginTop: "auto" }}>
          {w.description.length > 110 ? w.description.slice(0, 108) + "…" : w.description}
        </p>
      </div>
      
      {/* Footer section: seat availability and action button */}
      <div className="workshop-card-footer">
        <div className="seats-wrap">

          {/* Seats info */}
          <div className="seats-label">
            <span>{full ? "Fully booked" : `${left} seat${left !== 1 ? "s" : ""} left`}</span>
            <span>{w.booked}/{w.seats}</span>
          </div>

          {/* Progress bar showing booking percentage */}
          <div className="seats-bar">
            <div
              className={`seats-fill ${full ? "full" : pct >= 75 ? "warn" : ""}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Action button: Book or View */}
        <Link
          to={`/workshops/${w.id}`}
          className="btn btn-primary btn-sm"
          style={{ flexShrink: 0 }}
        >
          {full ? "View Details" : "Book Now"}
        </Link>
      </div>
    </article>
  );
}
