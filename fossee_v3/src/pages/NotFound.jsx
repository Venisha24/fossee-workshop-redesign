import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page-wrap page-top" style={{ textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>404</div>
      <h1 style={{ marginBottom: ".75rem" }}>Page not found</h1>
      <p style={{ marginBottom: "2rem" }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div style={{ display: "flex", gap: ".75rem", justifyContent: "center", flexWrap: "wrap" }}>
        <Link to="/" className="btn btn-primary">Go Home</Link>
        <Link to="/workshops" className="btn btn-outline">Browse Workshops</Link>
      </div>
    </div>
  );
}
