import { Link } from "react-router-dom";
// Footer component: Displays bottom section of the website with
// navigation links, resources, and organization information
export default function Footer() {
  return (
    <footer className="footer">
      <div className="page-wrap">
        <div className="footer-grid">

          {/* Branding and description section */}
          <div>
            <div className="footer-brand">FOSSEE Portal</div>
            <p style={{ color: "rgba(255,255,255,.5)", fontSize: ".87rem", lineHeight: 1.7, maxWidth: "26ch" }}>
              Free/Libre and Open Source Software for Education — IIT Bombay.
              Helping students and educators access open-source tools.
            </p>
          </div>
          
          {/* Workshops navigation links */}
          <div>
            <h4>Workshops</h4>
            <ul>
              <li><Link to="/workshops" className="footer-link" style={{color:"rgba(255,255,255,.55)"}}>Browse All</Link></li>
              <li><Link to="/workshops?type=Python" style={{color:"rgba(255,255,255,.55)"}}>Python</Link></li>
              <li><Link to="/workshops?type=Scilab" style={{color:"rgba(255,255,255,.55)"}}>Scilab</Link></li>
              <li><Link to="/workshops?type=FreeCAD" style={{color:"rgba(255,255,255,.55)"}}>FreeCAD</Link></li>
            </ul>
          </div>
          
          {/* User account related links */}
          <div>
            <h4>Account</h4>
            <ul>
              <li><Link to="/login" style={{color:"rgba(255,255,255,.55)"}}>Sign In</Link></li>
              <li><Link to="/signup" style={{color:"rgba(255,255,255,.55)"}}>Register</Link></li>
              <li><Link to="/dashboard" style={{color:"rgba(255,255,255,.55)"}}>Dashboard</Link></li>
            </ul>
          </div>

          {/* External resource links */}
          <div>
            <h4>Resources</h4>
            <ul>
              <li><a href="https://fossee.in" style={{color:"rgba(255,255,255,.55)"}} target="_blank" rel="noreferrer">FOSSEE.in</a></li>
              <li><a href="https://spoken-tutorial.org" style={{color:"rgba(255,255,255,.55)"}} target="_blank" rel="noreferrer">Spoken Tutorials</a></li>
              <li><a href="https://www.iitb.ac.in" style={{color:"rgba(255,255,255,.55)"}} target="_blank" rel="noreferrer">IIT Bombay</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom section with copyright and contact */}
        <div className="footer-bottom">
          <span>© 2025 FOSSEE, IIT Bombay · GPL-3.0</span>
          <span>pythonsupport@fossee.in</span>
        </div>
      </div>
    </footer>
  );
}
