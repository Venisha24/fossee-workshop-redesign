import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { WORKSHOPS, WORKSHOP_TYPES, STATES } from "../data/mockData";
import WorkshopCard from "../components/WorkshopCard";

const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const STATUSES = ["upcoming", "completed"];

export default function WorkshopList() {
  const [params, setParams] = useSearchParams();

  // initialise filter state from URL query params so links like
  // /workshops?type=Python work properly (matches original site behaviour)
  const [search, setSearch]   = useState(params.get("search") || "");
  const [type,   setType]     = useState(params.get("type")   || "");
  const [state,  setState]    = useState(params.get("state")  || "");
  const [level,  setLevel]    = useState(params.get("level")  || "");
  const [status, setStatus]   = useState(params.get("status") || "upcoming");

  // keep URL in sync with filters — nice for sharing links
  useEffect(() => {
    const p = {};
    if (search) p.search = search;
    if (type)   p.type   = type;
    if (state)  p.state  = state;
    if (level)  p.level  = level;
    if (status && status !== "upcoming") p.status = status;
    setParams(p, { replace: true });
  }, [search, type, state, level, status]);

  const filtered = useMemo(() => {
    return WORKSHOPS.filter(w => {
      if (status && w.status !== status) return false;
      if (type   && w.workshop_type !== type) return false;
      if (state  && w.state !== state) return false;
      if (level  && w.level !== level) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          w.title.toLowerCase().includes(q) ||
          w.instructor.name.toLowerCase().includes(q) ||
          w.location.toLowerCase().includes(q) ||
          w.workshop_type.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [search, type, state, level, status]);

  function clearFilters() {
    setSearch(""); setType(""); setState(""); setLevel(""); setStatus("upcoming");
  }

  const hasFilters = search || type || state || level;

  return (
    <div className="page-wrap page-top">
      <div style={{ marginBottom: "1.75rem" }}>
        <h1>Workshops</h1>
        <p style={{ marginTop: ".4rem" }}>
          {filtered.length} workshop{filtered.length !== 1 ? "s" : ""} found
          {type ? ` in ${type}` : ""}
          {state ? ` · ${state}` : ""}
        </p>
      </div>

      {/* ── Status tabs ────────────────────────────────── */}
      <div style={{ display: "flex", gap: ".5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        {STATUSES.map(s => (
          <button
            key={s}
            className={`filter-chip ${status === s ? "active" : ""}`}
            onClick={() => setStatus(s)}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* ── Filters bar ────────────────────────────────── */}
      <div className="filters-bar">
        {/* search */}
        <div className="filter-search">
          <span className="search-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>
          <input
            className="input"
            type="text"
            placeholder="Search by title, instructor, location…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: "2.4rem" }}
          />
        </div>

        {/* type filter */}
        <select
          className="filter-select"
          value={type}
          onChange={e => setType(e.target.value)}
        >
          <option value="">All Types</option>
          {WORKSHOP_TYPES.map(t => (
            <option key={t.id} value={t.name}>{t.name}</option>
          ))}
        </select>

        {/* state filter */}
        <select
          className="filter-select"
          value={state}
          onChange={e => setState(e.target.value)}
        >
          <option value="">All States</option>
          <option value={null}>Online</option>
          {STATES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        {/* level filter */}
        <select
          className="filter-select"
          value={level}
          onChange={e => setLevel(e.target.value)}
        >
          <option value="">All Levels</option>
          {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
        </select>

        {hasFilters && (
          <button className="btn btn-ghost btn-sm" onClick={clearFilters}>
            Clear filters
          </button>
        )}
      </div>

      {/* ── Type chips (quick filter) ───────────────────── */}
      <div className="filter-chip-row" style={{ marginBottom: "1.5rem" }}>
        <button
          className={`filter-chip ${!type ? "active" : ""}`}
          onClick={() => setType("")}
        >
          All
        </button>
        {WORKSHOP_TYPES.map(t => (
          <button
            key={t.id}
            className={`filter-chip ${type === t.name ? "active" : ""}`}
            onClick={() => setType(t.name)}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* ── Results grid ───────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No workshops found</h3>
          <p>Try adjusting your filters or search terms.</p>
          <button className="btn btn-outline" onClick={clearFilters}>Clear all filters</button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
          {filtered.map(w => <WorkshopCard key={w.id} w={w} />)}
        </div>
      )}
    </div>
  );
}
