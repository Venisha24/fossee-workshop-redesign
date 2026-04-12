import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  function handleLogout() {
    logout();
    navigate("/");
    setMenuOpen(false);
  }

  const links = [
    { to: "/", label: "Home" },
    { to: "/workshops", label: "Workshops" },
    { to: "/statistics", label: "Statistics" },
    ...(user ? [{ to: "/dashboard", label: "Dashboard" }] : []),
  ];

  return (
    <>
      <nav className="navbar">
        <div className="page-wrap">
          <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
            <div className="logo-mark">F</div>
            FOSSEE <span>Portal</span>
          </Link>

          <div className="nav-links">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`nav-link ${isActive(l.to) ? "active" : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="nav-actions">
            {user ? (
              <>
                <span style={{ fontSize: ".85rem", color: "var(--text2)" }}>
                  Hi, {user.name.split(" ")[0]}
                </span>
                <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn-sm">Sign In</Link>
                <Link to="/signup" className="btn btn-primary btn-sm">Register</Link>
              </>
            )}
          </div>

          <button
            className="hamburger"
            onClick={() => setMenuOpen(p => !p)}
            aria-label="Toggle navigation"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {links.map(l => (
          <Link
            key={l.to}
            to={l.to}
            className={`nav-link ${isActive(l.to) ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </Link>
        ))}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: ".75rem", marginTop: ".25rem" }}>
          {user ? (
            <button className="btn btn-outline btn-sm" onClick={handleLogout} style={{ width: "100%" }}>
              Sign Out ({user.name.split(" ")[0]})
            </button>
          ) : (
            <div style={{ display: "flex", gap: ".5rem" }}>
              <Link to="/login" className="btn btn-outline btn-sm" style={{ flex: 1 }} onClick={() => setMenuOpen(false)}>
                Sign In
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
