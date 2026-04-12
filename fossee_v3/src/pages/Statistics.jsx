// Statistics page
// Original site uses pandas on backend for this data.
// Here we use Chart.js (loaded from CDN) for the pie chart,
// and a pure SVG India map with workshop markers.
// The data shapes match what the Django views would return.

import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { WORKSHOPS, MOCK_USERS } from "../data/mockData";

// --- aggregated stats (what pandas would compute server-side) ---
const WORKSHOP_TYPE_COUNTS = WORKSHOPS.reduce((acc, w) => {
  acc[w.workshop_type] = (acc[w.workshop_type] || 0) + 1;
  return acc;
}, {});

const MONTHLY_COUNTS = [
  { month: "Oct", count: 18 }, { month: "Nov", count: 24 },
  { month: "Dec", count: 14 }, { month: "Jan", count: 31 },
  { month: "Feb", count: 27 }, { month: "Mar", count: 22 },
  { month: "Apr", count: 19 }, { month: "May", count: 8 },
];

// Real lat/lon coordinates — D3 projects these onto the map accurately
const WORKSHOP_LOCATIONS = [
  { city: "Mumbai",      lat: 19.076, lon: 72.877, count: 42, state: "Maharashtra" },
  { city: "Delhi",       lat: 28.704, lon: 77.102, count: 38, state: "Delhi" },
  { city: "Chennai",     lat: 13.083, lon: 80.270, count: 31, state: "Tamil Nadu" },
  { city: "Kolkata",     lat: 22.572, lon: 88.363, count: 26, state: "West Bengal" },
  { city: "Bengaluru",   lat: 12.972, lon: 77.594, count: 24, state: "Karnataka" },
  { city: "Hyderabad",   lat: 17.385, lon: 78.487, count: 21, state: "Telangana" },
  { city: "Pune",        lat: 18.520, lon: 73.856, count: 18, state: "Maharashtra" },
  { city: "Gandhinagar", lat: 23.216, lon: 72.684, count: 15, state: "Gujarat" },
  { city: "Jaipur",      lat: 26.913, lon: 75.787, count: 12, state: "Rajasthan" },
  { city: "Lucknow",     lat: 26.847, lon: 80.947, count: 10, state: "Uttar Pradesh" },
  { city: "Trichy",      lat: 10.790, lon: 78.704, count: 9,  state: "Tamil Nadu" },
  { city: "Bhubaneswar", lat: 20.296, lon: 85.824, count: 7,  state: "Odisha" },
];


const TYPE_COLORS = {
  Python: "#3b82f6", Scilab: "#10b981",
  OpenModelica: "#8b5cf6", DWSIM: "#f59e0b",
  FreeCAD: "#ec4899", Django: "#14b8a6",
};

// ── Pie chart using Chart.js from CDN ────────────────────────────────────────
function PieChart() {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    // Chart.js is loaded via script tag in index.html or we load it dynamically
    const load = () => {
      if (!window.Chart) return;
      if (chartRef.current) chartRef.current.destroy();
      const labels = Object.keys(WORKSHOP_TYPE_COUNTS);
      const data   = labels.map(l => WORKSHOP_TYPE_COUNTS[l]);
      const colors = labels.map(l => TYPE_COLORS[l] || "#94a3b8");

      chartRef.current = new window.Chart(canvasRef.current, {
        type: "doughnut",
        data: {
          labels,
          datasets: [{ data, backgroundColor: colors, borderWidth: 2, borderColor: "#fff" }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: { padding: 16, font: { size: 13, family: "'Plus Jakarta Sans', sans-serif" }, usePointStyle: true },
            },
            tooltip: {
              callbacks: {
                label: ctx => ` ${ctx.label}: ${ctx.parsed} workshops (${Math.round(ctx.parsed / WORKSHOPS.length * 100)}%)`,
              },
            },
          },
          cutout: "58%",
        },
      });
    };

    if (window.Chart) {
      load();
    } else {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js";
      script.onload = load;
      document.head.appendChild(script);
    }
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, []);

  return (
    <div style={{ position: "relative", height: 280 }}>
      <canvas ref={canvasRef} />
    </div>
  );
}

// ── Bar chart for monthly count ──────────────────────────────────────────────
function MonthlyBarChart() {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    const load = () => {
      if (!window.Chart) return;
      if (chartRef.current) chartRef.current.destroy();
      chartRef.current = new window.Chart(canvasRef.current, {
        type: "bar",
        data: {
          labels: MONTHLY_COUNTS.map(m => m.month),
          datasets: [{
            label: "Workshops conducted",
            data: MONTHLY_COUNTS.map(m => m.count),
            backgroundColor: "rgba(212,98,42,0.15)",
            borderColor: "#d4622a",
            borderWidth: 2,
            borderRadius: 6,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: "rgba(0,0,0,0.05)" },
              ticks: { font: { size: 12 } },
            },
            x: {
              grid: { display: false },
              ticks: { font: { size: 12 } },
            },
          },
        },
      });
    };

    if (window.Chart) load();
    else {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js";
      script.onload = load;
      document.head.appendChild(script);
    }
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, []);

  return (
    <div style={{ position: "relative", height: 220 }}>
      <canvas ref={canvasRef} />
    </div>
  );
}

// ── India Map — imports local TopoJSON file, uses D3 for rendering ───────────
// india.topo.json must be placed at src/data/india.topo.json
// Download from: https://raw.githubusercontent.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json
import indiaTopoJson from "../data/india.topo.json";

const STATE_PALETTE = [
  "#d4e8c2","#c8ddb8","#b8d4a8","#cce0b0","#f0d898","#e8c88a",
  "#c8e0a8","#b8d898","#c0dc98","#d8e8b0","#c8dc98","#d0e4a8",
  "#c8d898","#b8e0c8","#a8d8b8","#b0d890","#a8d8a8","#98d098",
  "#d0e8a8","#c8e0a0","#b8d890","#c8e098","#f4c090","#d4eac0",
  "#e0d898","#bcd8a0","#d8e8c0","#c0e0d0",
];

function IndiaMap() {
  const containerRef = useRef(null);
  const builtRef     = useRef(false);
  const [ready,  setReady]  = useState(false);
  const [error,  setError]  = useState(false);

  const maxCount = Math.max(...WORKSHOP_LOCATIONS.map(l => l.count));
  const getR     = (c) => 8 + (c / maxCount) * 13;
  const getColor = (c) => {
    const t = c / maxCount;
    return t > 0.7 ? "#d4622a" : t > 0.4 ? "#c05520" : "#a04510";
  };

  useEffect(() => {
    if (builtRef.current) return;
    const container = containerRef.current;
    if (!container) return;

    // load D3 from CDN — only D3, no external data file needed
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/d3@7.8.5/dist/d3.min.js";
    s.onload = () => buildMap();
    s.onerror = () => setError(true);
    document.head.appendChild(s);

    function buildMap() {
      if (builtRef.current) return;
      builtRef.current = true;
      const d3 = window.d3;
      const container = containerRef.current;
      const oldSvg = container.querySelector("svg");
      if (oldSvg) oldSvg.remove();
      const W  = container.clientWidth || 480;
      const H  = Math.round(W * 1.15);
      

      // topojson conversion done manually — we convert the arcs to GeoJSON features ourselves
      // using the bundled data directly
      const topo    = indiaTopoJson;
      const objKey  = Object.keys(topo.objects)[0];
      const objData = topo.objects[objKey];

      // Use d3's built-in topojson support via feature conversion
      // We need topojson-client too — load it
      const s2 = document.createElement("script");
      s2.src = "https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/dist/topojson-client.min.js";
      s2.onerror = () => setError(true);
      s2.onload  = () => {
        const topojson = window.topojson;
        const states   = topojson.feature(topo, topo.objects[objKey]);

        const projection = d3.geoMercator()
          .center([82.5, 22.5])
          .scale(W * 1.65)
          .translate([W / 2, H / 2]);

        const pathGen = d3.geoPath().projection(projection);

        // tooltip
        const tip = document.createElement("div");
        Object.assign(tip.style, {
          position:"absolute", background:"#1a1916", color:"#fff",
          padding:"6px 12px", borderRadius:"7px", fontSize:"12px",
          pointerEvents:"none", opacity:"0", transition:"opacity .15s",
          whiteSpace:"nowrap", fontFamily:"system-ui,sans-serif",
          lineHeight:"1.5", zIndex:"10",
        });
        container.appendChild(tip);

        const showTip = (evt, html) => {
          const b = container.getBoundingClientRect();
          tip.innerHTML = html;
          tip.style.opacity = "1";
          tip.style.left = (evt.clientX - b.left + 14) + "px";
          tip.style.top  = (evt.clientY - b.top  - 52) + "px";
        };
        const moveTip = (evt) => {
          const b = container.getBoundingClientRect();
          tip.style.left = (evt.clientX - b.left + 14) + "px";
          tip.style.top  = (evt.clientY - b.top  - 52) + "px";
        };
        const hideTip = () => { tip.style.opacity = "0"; };

        const svg = d3.select(container)
          .append("svg")
          .attr("viewBox", `0 0 ${W} ${H}`)
          .style("width","100%")
          .style("display","block")
          .style("border-radius","10px")
          .style("background","#e8f4fb");

        // state fills
        svg.append("g")
          .selectAll("path")
          .data(states.features)
          .join("path")
            .attr("d", pathGen)
            .attr("fill", (_, i) => STATE_PALETTE[i % STATE_PALETTE.length])
            .attr("stroke", "#9ab88a")
            .attr("stroke-width", "0.7")
            .on("mouseover", function(event, d) {
              d3.select(this).attr("fill","#f5e0c0");
              const name = d.properties.NAME_1 || d.properties.st_nm || d.properties.name || d.properties.NAME || "";
              if (name) showTip(event, `<strong>${name}</strong>`);
            })
            .on("mousemove", moveTip)
            .on("mouseout", function(_, i) {
              d3.select(this).attr("fill", STATE_PALETTE[i % STATE_PALETTE.length]);
              hideTip();
            });

        // state borders
        svg.append("path")
          .datum(topojson.mesh(topo, topo.objects[objKey], (a, b) => a !== b))
          .attr("d", pathGen)
          .attr("fill","none")
          .attr("stroke","#7a9870")
          .attr("stroke-width","0.5");

        // workshop bubbles
        WORKSHOP_LOCATIONS.forEach(w => {
          const [px, py] = projection([w.lon, w.lat]);
          const r   = getR(w.count);
          const col = getColor(w.count);
          const g   = svg.append("g").style("cursor","pointer");

          g.append("circle")
            .attr("cx",px).attr("cy",py).attr("r",r+5)
            .attr("fill",col).attr("opacity",0.14);

          g.append("circle")
            .attr("cx",px).attr("cy",py).attr("r",r)
            .attr("fill",col).attr("stroke","white").attr("stroke-width",2)
            .on("mouseover", function(evt) {
              d3.select(this).attr("r",r+2).attr("fill","#d4622a");
              showTip(evt,
                `<strong>${w.city}</strong> &nbsp;·&nbsp; ${w.count} workshops<br>` +
                `<span style="color:rgba(255,255,255,.65);font-size:11px">${w.state}</span>`
              );
            })
            .on("mousemove", moveTip)
            .on("mouseout", function() {
              d3.select(this).attr("r",r).attr("fill",col);
              hideTip();
            });

          g.append("text")
            .attr("x",px).attr("y",py+1)
            .attr("text-anchor","middle").attr("dominant-baseline","middle")
            .attr("fill","white").attr("font-size", r>14?10:8.5).attr("font-weight","700")
            .attr("font-family","system-ui,sans-serif")
            .style("pointer-events","none").text(w.count);

          g.append("text")
            .attr("x",px).attr("y",py+r+10)
            .attr("text-anchor","middle")
            .attr("fill","#2a1808").attr("font-size","8").attr("font-weight","600")
            .attr("font-family","system-ui,sans-serif")
            .style("pointer-events","none").text(w.city);
        });

        // legend
        const legY = H - 58;
        const leg  = svg.append("g").attr("transform", `translate(12,${legY})`);
        leg.append("rect").attr("width",198).attr("height",46).attr("rx",7)
          .attr("fill","white").attr("opacity",0.9).attr("stroke","#ccc").attr("stroke-width",0.5);
        [["#d4622a",6,"More workshops"],["#a04510",4,"Fewer workshops"]].forEach(([c,r,label],i) => {
          leg.append("circle").attr("cx",16).attr("cy",13+i*20).attr("r",r+3)
            .attr("fill",c).attr("stroke","white").attr("stroke-width",1.5);
          leg.append("text").attr("x",30).attr("y",17+i*20)
            .attr("font-size","10.5").attr("fill","#4a4540")
            .attr("font-family","system-ui,sans-serif").text(label);
        });

        setReady(true);
      };
      document.head.appendChild(s2);
    }
  }, []);

  return (
    <div ref={containerRef} style={{ position:"relative", minHeight:320 }}>
      {!ready && !error && (
        <div style={{
          position:"absolute", inset:0, display:"flex",
          alignItems:"center", justifyContent:"center",
          background:"#e8f4fb", borderRadius:10,
          color:"var(--text2)", fontSize:".88rem",
        }}>
          Loading map…
        </div>
      )}
      {error && (
        <div style={{
          padding:"2rem", textAlign:"center", background:"var(--bg)",
          borderRadius:10, color:"var(--text2)", fontSize:".88rem",
          border:"1px solid var(--border)",
        }}>
          Could not load map. Check your internet connection.
        </div>
      )}
    </div>
  );
}


// ── Main Statistics Page ─────────────────────────────────────────────────────
export default function Statistics() {
  const { user } = useAuth();
  const isInstructor = user?.role === "instructor";

  const totalWorkshops  = WORKSHOPS.length;
  const totalCompleted  = WORKSHOPS.filter(w => w.status === "completed").length;
  const totalUpcoming   = WORKSHOPS.filter(w => w.status === "upcoming").length;
  const totalStates     = [...new Set(WORKSHOPS.filter(w => w.state).map(w => w.state))].length;

  return (
    <div className="page-wrap page-top">
      <div style={{ marginBottom: "2rem" }}>
        <div className="label" style={{ marginBottom: ".35rem" }}>FOSSEE · IIT Bombay</div>
        <h1>Statistics</h1>
        <p style={{ marginTop: ".4rem" }}>
          Workshop activity across India.
          {isInstructor && " Instructor-only sections are visible below."}
        </p>
      </div>

      {/* ── Summary cards (open to all) ────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
        {[
          { label: "Total Workshops", value: 342, color: "var(--accent)" },
          { label: "Completed",       value: totalCompleted + 42, color: "var(--success)" },
          { label: "Upcoming",        value: totalUpcoming, color: "var(--accent2)" },
          { label: "States Covered",  value: 28, color: "var(--text)" },
          { label: "Tools",           value: 6,  color: "#8b5cf6" },
          { label: "Coordinators",    value: "1240+", color: "var(--text)" },
        ].map(s => (
          <div key={s.label} style={{
            background: "var(--bg2)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)", padding: "1.1rem 1.25rem",
          }}>
            <div style={{ fontSize: "1.75rem", fontWeight: 700, color: s.color, lineHeight: 1, marginBottom: ".3rem" }}>
              {s.value}
            </div>
            <div style={{ fontSize: ".82rem", color: "var(--text2)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Map + Pie (open to all) ─────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "2rem", alignItems: "start", marginBottom: "2.5rem" }}>
        <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ marginBottom: "1.25rem" }}>Workshops across India</h3>
          <IndiaMap />
        </div>

        <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ marginBottom: "1.25rem" }}>Workshops by Type</h3>
          <PieChart />
          <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: ".45rem" }}>
            {Object.entries(WORKSHOP_TYPE_COUNTS).map(([type, count]) => (
              <div key={type} style={{ display: "flex", alignItems: "center", gap: ".6rem", fontSize: ".85rem" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: TYPE_COLORS[type] || "#94a3b8", flexShrink: 0 }} />
                <span style={{ flex: 1, color: "var(--text)" }}>{type}</span>
                <span style={{ fontWeight: 600 }}>{count}</span>
                <span style={{ color: "var(--text3)", fontSize: ".78rem" }}>
                  ({Math.round(count / totalWorkshops * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Instructor-only section ─────────────────────── */}
      {!isInstructor && (
        <div style={{
          background: "var(--bg2)", border: "1.5px dashed var(--border)",
          borderRadius: "var(--radius-lg)", padding: "2rem", textAlign: "center",
          marginBottom: "2.5rem",
        }}>
          <div style={{ fontSize: "1.75rem", marginBottom: ".5rem" }}>🔒</div>
          <h3 style={{ marginBottom: ".4rem" }}>Instructor-only statistics</h3>
          <p style={{ marginBottom: "1rem" }}>
            Monthly workshop counts, profile stats, and coordinator activity are visible to instructors only.
          </p>
          <a href="/login" className="btn btn-outline btn-sm">Sign in as Instructor</a>
        </div>
      )}

      {isInstructor && (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: "1.5rem" }}>
            <h2>Instructor Dashboard</h2>
            <span className="badge badge-upcoming" style={{ fontSize: ".75rem" }}>Instructor Only</span>
          </div>

          {/* Monthly count bar chart */}
          <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem", marginBottom: "1.5rem" }}>
            <h3 style={{ marginBottom: "1.25rem" }}>Monthly Workshop Count</h3>
            <MonthlyBarChart />
          </div>

          {/* Upcoming workshops for this instructor */}
          <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem", marginBottom: "1.5rem" }}>
            <h3 style={{ marginBottom: "1.25rem" }}>My Upcoming Workshops</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
              {WORKSHOPS.filter(w => w.status === "upcoming" && w.instructor.id === user.id).map(w => (
                <div key={w.id} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: ".9rem 1rem", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius)", flexWrap: "wrap" }}>
                  <span className={`badge badge-${w.workshop_type.toLowerCase()}`}>{w.workshop_type}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: ".95rem" }}>{w.title}</div>
                    <div style={{ fontSize: ".8rem", color: "var(--text2)" }}>
                      {new Date(w.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · {w.location}
                    </div>
                  </div>
                  <div style={{ fontSize: ".83rem", color: "var(--text2)" }}>
                    {w.booked}/{w.seats} registered
                  </div>
                </div>
              ))}
              {WORKSHOPS.filter(w => w.status === "upcoming" && w.instructor.id === user.id).length === 0 && (
                <p style={{ color: "var(--text3)", fontSize: ".88rem" }}>No upcoming workshops assigned to you.</p>
              )}
            </div>
          </div>

          {/* Coordinator profile stats */}
          <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
            <h3 style={{ marginBottom: "1.25rem" }}>Coordinator Activity</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
              {WORKSHOPS.slice(0, 4).map(w => (
                <CoordinatorProfileCard key={w.id} workshop={w} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ── Coordinator profile card with comments ───────────────────────────────────
function CoordinatorProfileCard({ workshop }) {
  const [comments, setComments] = useState([
    { id: 1, author: "Dr. Prabhu", text: "Good follow-up on the event logistics.", time: "2 days ago" },
  ]);
  const [newComment, setNewComment] = useState("");
  const [open, setOpen] = useState(false);

  function addComment() {
    if (!newComment.trim()) return;
    setComments(prev => [...prev, { id: Date.now(), author: "You", text: newComment, time: "Just now" }]);
    setNewComment("");
  }

  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
      <div style={{ padding: ".85rem 1rem", background: "var(--bg)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: ".75rem" }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: ".82rem", flexShrink: 0 }}>
          {workshop.coordinator.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: ".88rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {workshop.coordinator.name}
          </div>
          <div style={{ fontSize: ".75rem", color: "var(--text2)" }}>{workshop.coordinator.institute}</div>
        </div>
        <span className={`badge badge-${workshop.workshop_type.toLowerCase()}`} style={{ fontSize: ".65rem" }}>
          {workshop.workshop_type}
        </span>
      </div>
      <div style={{ padding: ".75rem 1rem" }}>
        <div style={{ fontSize: ".8rem", color: "var(--text2)", marginBottom: ".5rem" }}>
          {workshop.title} · {new Date(workshop.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
        </div>
        <button
          style={{ fontSize: ".78rem", color: "var(--accent2)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          onClick={() => setOpen(p => !p)}
        >
          {open ? "Hide" : "View"} comments ({comments.length})
        </button>
        {open && (
          <div style={{ marginTop: ".65rem" }}>
            {comments.map(c => (
              <div key={c.id} style={{ padding: ".5rem .75rem", background: "var(--bg)", borderRadius: "var(--radius)", marginBottom: ".4rem", fontSize: ".8rem" }}>
                <span style={{ fontWeight: 600 }}>{c.author}</span>
                <span style={{ color: "var(--text3)", marginLeft: ".4rem", fontSize: ".72rem" }}>{c.time}</span>
                <div style={{ color: "var(--text2)", marginTop: ".2rem" }}>{c.text}</div>
              </div>
            ))}
            <div style={{ display: "flex", gap: ".5rem", marginTop: ".5rem" }}>
              <input
                className="input"
                style={{ fontSize: ".82rem", flex: 1, padding: ".4rem .7rem", minHeight: 36 }}
                placeholder="Add a comment…"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addComment()}
              />
              <button className="btn btn-primary btn-sm" onClick={addComment}>Post</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
