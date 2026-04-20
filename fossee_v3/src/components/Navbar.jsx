import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Navbar component: Handles top navigation bar, routing links,
// user authentication display, and responsive mobile menu
export default function Navbar() {
  const { user, logout } = useAuth();   // Get current user and logout function
  const location = useLocation();       // Get current route path
  const navigate = useNavigate();       // For programmatic navigation
  const [menuOpen, setMenuOpen] = useState(false);   // Controls mobile menu state
  
  // Check if a link is currently active
  const isActive = (path) => location.pathname === path;
  
  // Handle user logout and redirect to homepage
  function handleLogout() {
    logout();
    navigate("/");
    setMenuOpen(false);
  }
  
  // Navigation links (Dashboard shown only if user is logged in)
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
          
          {/* Logo / Brand section */}
          <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
            <div className="logo-mark">F</div>
            FOSSEE <span>Portal</span>
          </Link>
          
          {/* Desktop navigation links */}
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
          
          {/* User actions (login/logout) */}
          <div className="nav-actions">
            {user ? (
              <>
                {/* Display logged-in user's name */}
                <span style={{ fontSize: ".85rem", color: "var(--text2)" }}>
                  Hi, {user.name.split(" ")[0]}
                </span>

                {/* Logout button */}
                <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                  Sign Out
                </button>
              </>
            ) : (
              <>

                {/* Login / Register buttons */}
                <Link to="/login" className="btn btn-ghost btn-sm">Sign In</Link>
                <Link to="/signup" className="btn btn-primary btn-sm">Register</Link>
              </>
            )}
          </div>
          
          {/* Hamburger menu button for mobile view */}
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
        
        {/* Navigation links for mobile */}
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

        {/* Mobile user actions */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: ".75rem", marginTop: ".25rem" }}>
          {user ? (

            // Logout button for mobile
            <button className="btn btn-outline btn-sm" onClick={handleLogout} style={{ width: "100%" }}>
              Sign Out ({user.name.split(" ")[0]})
            </button>
          ) : (

            // Login / Register buttons for mobile
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
