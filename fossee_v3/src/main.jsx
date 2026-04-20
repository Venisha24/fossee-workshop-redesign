// Import StrictMode to highlight potential issues in development
import { StrictMode } from "react";

// Import createRoot to enable React 18 rendering API
import { createRoot }  from "react-dom/client";

// Import global CSS styles applied across the app
import "./index.css";

// Root App component containing the entire application
import App from "./App.jsx";

// Create a root element and render the React application into the DOM
createRoot(document.getElementById("root")).render(

  // Wrap App in StrictMode for highlighting potential problems (development only)
  <StrictMode>
    <App />
  </StrictMode>
);
