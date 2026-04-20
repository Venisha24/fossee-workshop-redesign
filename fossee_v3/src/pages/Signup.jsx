import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { STATES } from "../data/mockData";

// Signup component: handles user registration flow
export default function Signup() {
  const { signup } = useAuth();       // Access signup function from AuthContext
  const navigate   = useNavigate();   // Used for redirecting after signup
  
  // Form state (stores user input values)
  const [form, setForm] = useState({
    name: "", email: "", phone: "", institute: "",
    state: "", password: "", confirm: "", role: "coordinator",
  });

  // Stores validation errors for each field
  const [errors,  setErrors]  = useState({});

  // Loading state (used while submitting form)
  const [loading, setLoading] = useState(false);
  
  // Validate form inputs before submission
  function validate() {
    const e = {};
    if (!form.name.trim())          e.name      = "Full name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!/^\d{10}$/.test(form.phone))     e.phone = "Enter a 10-digit number";
    if (!form.institute.trim())     e.institute = "Institute is required";
    if (!form.state)                e.state     = "Select your state";
    if (form.password.length < 6)   e.password  = "Password must be at least 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords don't match";
    return e;
  }
  
  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();

    // If errors exist → stop submission
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);

    // Simulate API delay (mock signup)
    setTimeout(() => {
      signup(form);            // Call signup function
      setLoading(false);
      navigate("/dashboard");  // Redirect after successful signup  
    }, 700);
  }
  
  // Generic input handler (updates form state dynamically)
  function set(field) {
    return e => {
      setForm(p => ({...p, [field]: e.target.value}));

      // Clear error when user starts typing
      setErrors(p => ({...p, [field]: ""}));
    };
  }

  return (
    <div className="auth-layout">

      {/* LEFT SIDE: Branding + Info */}
      <div className="auth-left">
        <div className="auth-left-bg" />
        <div className="auth-left-content">

          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", gap:".65rem", marginBottom:"2rem" }}>
            <div className="logo-mark" style={{ width:36, height:36, borderRadius:8, background:"var(--accent)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:"1rem" }}>F</div>
            <span style={{ color:"#fff", fontWeight:700 }}>FOSSEE Portal</span>
          </div>

          {/* Intro text */}
          <h2>Join FOSSEE</h2>
          <p>Register as a coordinator to propose and host free open-source workshops at your institute.</p>

          {/* Features list */}
          <div className="auth-left-feature">
            {[
              ["🏫", "Represent your college"],
              ["📅", "Propose workshop dates"],
              ["🤝", "Connect with FOSSEE instructors"],
              ["📜", "Get official certificates"],
            ].map(([icon, text]) => (
              <div className="auth-feat-item" key={text}>
                <div className="auth-feat-icon">{icon}</div>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* RIGHT SIDE: Signup Form */}
      <div className="auth-right" style={{ alignItems: "flex-start", paddingTop: "2.5rem", overflowY: "auto" }}>
        <div className="auth-box" style={{ maxWidth: 480 }}>
          <h1>Create account</h1>

          {/* Redirect to login */}
          <p className="auth-sub">Already have one? <Link to="/login">Sign in</Link></p>
          
          {/* Signup Form */}
          <form className="auth-form" onSubmit={handleSubmit} noValidate>

            {/* role selector */}
            <div className="form-group">
              <label>I am registering as</label>
              <div style={{ display: "flex", gap: ".65rem" }}>
                {["coordinator", "instructor"].map(r => (
                  <button
                    key={r}
                    type="button"
                    className={`filter-chip ${form.role === r ? "active" : ""}`}
                    onClick={() => setForm(p => ({...p, role: r}))}
                    style={{ flex: 1, textAlign: "center" }}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>

              {/* Role description */}
              <span className="hint">
                {form.role === "coordinator"
                  ? "Coordinators propose workshop dates at their institute."
                  : "Instructors conduct the workshops — contact FOSSEE directly for this."}
              </span>
            </div>
            
            {/* Name + Phone */}
            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input id="name" className={`input ${errors.name?"error":""}`} type="text" placeholder="Your full name" value={form.name} onChange={set("name")} />
                {errors.name && <span className="error-msg">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input id="phone" className={`input ${errors.phone?"error":""}`} type="tel" placeholder="10-digit number" value={form.phone} onChange={set("phone")} />
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
              </div>
            </div>
            
            {/* Email */}
            <div className="form-group">
              <label htmlFor="signup-email">Email address *</label>
              <input id="signup-email" className={`input ${errors.email?"error":""}`} type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} autoComplete="email" />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>
             
            {/* Institute */}
            <div className="form-group">
              <label htmlFor="institute">Institute / Organisation *</label>
              <input id="institute" className={`input ${errors.institute?"error":""}`} type="text" placeholder="IIT Bombay, VJTI, etc." value={form.institute} onChange={set("institute")} />
              {errors.institute && <span className="error-msg">{errors.institute}</span>}
            </div>
            
            {/* State Dropdown */}
            <div className="form-group">
              <label htmlFor="state">State *</label>
              <select id="state" className={`input filter-select ${errors.state?"error":""}`} value={form.state} onChange={set("state")} style={{ width:"100%" }}>
                <option value="">Select state</option>
                {STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.state && <span className="error-msg">{errors.state}</span>}
            </div>
            
            {/* Passwords */}
            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="signup-password">Password *</label>
                <input id="signup-password" className={`input ${errors.password?"error":""}`} type="password" placeholder="Min 6 characters" value={form.password} onChange={set("password")} autoComplete="new-password" />
                {errors.password && <span className="error-msg">{errors.password}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="confirm">Confirm Password *</label>
                <input id="confirm" className={`input ${errors.confirm?"error":""}`} type="password" placeholder="Re-enter password" value={form.confirm} onChange={set("confirm")} autoComplete="new-password" />
                {errors.confirm && <span className="error-msg">{errors.confirm}</span>}
              </div>
            </div>
            
            {/* Submit button */}
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>
          
          {/* Bottom link */}
          <div className="auth-switch">
            Already registered? <Link to="/login">Sign in here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
