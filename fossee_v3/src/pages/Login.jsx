import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {

  // Access login function from AuthContext
  const { login } = useAuth();

  // Navigation + redirect handling
  const navigate  = useNavigate();
  const location  = useLocation();
  
  // redirect to where they were trying to go, or dashboard
  const from = location.state?.from || "/dashboard";
  
  // Form state (email + password)
  const [form,   setForm]   = useState({ email: "", password: "" });

  // Validation errors
  const [errors, setErrors] = useState({});

  // API error (invalid credentials)
  const [apiErr, setApiErr] = useState("");

  // Loading state (for button)
  const [loading,setLoading]= useState(false);
  
  // Validate form inputs
  function validate() {
    const e = {};
    if (!form.email.trim())    e.email    = "Email is required";
    if (!form.password.trim()) e.password = "Password is required";
    return e;
  }
  
  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();

    // Stop submission if validation fails
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true); setApiErr("");
    // simulate slight network delay
    setTimeout(() => {
      const result = login(form.email, form.password);
      setLoading(false);
      if (result.ok) {
        // Redirect after successful login
        navigate(from, { replace: true });
      } else {
        // Show error if login fails
        setApiErr(result.error);
      }
    }, 600);
  }
  
  // Helper function to update form fields
  function set(field) {
    return e => {
      setForm(p => ({...p, [field]: e.target.value}));

      // Clear field-specific errors on typing
      setErrors(p => ({...p, [field]: ""}));
      setApiErr("");
    };
  }

  return (
    <div className="auth-layout">

      {/* ── Left Panel (branding + features) ───────────────────────── */}
      {/* left panel — only visible on desktop */}
      <div className="auth-left">
        <div className="auth-left-bg" />
        <div className="auth-left-content">

          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", gap:".65rem", marginBottom:"2rem" }}>
            <div className="logo-mark" style={{ width:36, height:36, borderRadius:8, background:"var(--accent)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:"1rem" }}>F</div>
            <span style={{ color:"#fff", fontWeight:700 }}>FOSSEE Portal</span>
          </div>
          <h2>Welcome back</h2>
          <p>Sign in to manage your workshop bookings and proposals.</p>

          {/* Feature highlights */}
          <div className="auth-left-feature">
            {[
              ["📅", "Track your upcoming workshops"],
              ["📋", "Propose new workshop dates"],
              ["✅", "View instructor approvals"],
              ["🎓", "Download certificates"],
            ].map(([icon, text]) => (
              <div className="auth-feat-item" key={text}>
                <div className="auth-feat-icon">{icon}</div>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel (login form) ───────────────────────── */}
      <div className="auth-right">
        <div className="auth-box">
          {/* mobile logo */}

          {/* Mobile logo (visible on small screens) */}
          <div style={{ display:"none" }} className="mobile-logo">
            <Link to="/" style={{ display:"flex", alignItems:"center", gap:".5rem", marginBottom:"2rem", color:"var(--text)", fontWeight:700 }}>
              <div className="logo-mark" style={{ width:30, height:30, borderRadius:7, background:"var(--accent)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:".85rem" }}>F</div>
              FOSSEE Portal
            </Link>
          </div>

          <h1>Sign in</h1>

          {/* Redirect to signup */}
          <p className="auth-sub">
            Don't have an account? <Link to="/signup">Register here</Link>
          </p>
          
          {/* API error message */}
          {apiErr && (
            <div style={{ background:"#fef2f2", border:"1px solid #fecaca", borderRadius:"var(--radius)", padding:".75rem 1rem", fontSize:".87rem", color:"var(--danger)", marginBottom:"1rem" }}>
              {apiErr}
            </div>
          )}

          {/* Demo credentials (for testing/evaluation) */}
          <div style={{ background:"#fffbeb", border:"1px solid #fde68a", borderRadius:"var(--radius)", padding:".65rem 1rem", fontSize:".8rem", color:"#92400e", marginBottom:"1.25rem" }}>
            💡 Demo: <strong>riya@example.com</strong> / <strong>123456</strong>
          </div>
          
          {/* Login form */}
          <form className="auth-form" onSubmit={handleSubmit} noValidate>

            {/* Email field */}
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                className={`input ${errors.email ? "error" : ""}`}
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={set("email")}
                autoComplete="email"
              />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>
            
            {/* Password field */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                className={`input ${errors.password ? "error" : ""}`}
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={set("password")}
                autoComplete="current-password"
              />
              {errors.password && <span className="error-msg">{errors.password}</span>}
            </div>
            
            {/* Submit button */}
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
          
          {/* Bottom link */}
          <div className="auth-switch">
            New coordinator? <Link to="/signup">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
