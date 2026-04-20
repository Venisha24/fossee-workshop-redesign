import { Link } from "react-router-dom";

// NotFound component: shown when user navigates to an invalid route (404 page)
export default function NotFound() {
  return (

    // Main container (centered layout)
    <div className="page-wrap page-top" style={{ textAlign: "center", maxWidth: 480, margin: "0 auto" }}>

      {/* Error code */}
      <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>404</div>

      {/* Heading */}
      <h1 style={{ marginBottom: ".75rem" }}>Page not found</h1>

      {/* Description */}
      <p style={{ marginBottom: "2rem" }}>
        The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Navigation buttons */}
      <div style={{ display: "flex", gap: ".75rem", justifyContent: "center", flexWrap: "wrap" }}>

        {/* Redirect to homepage */}
        <Link to="/" className="btn btn-primary">Go Home</Link>

        {/* Redirect to workshops page */}
        <Link to="/workshops" className="btn btn-outline">Browse Workshops</Link>
      </div>
    </div>
  );
}
