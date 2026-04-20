import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar   from "./components/Navbar";
import Footer   from "./components/Footer";
import Home           from "./pages/Home";
import WorkshopList   from "./pages/WorkshopList";
import WorkshopDetail from "./pages/WorkshopDetail";
import Login          from "./pages/Login";
import Signup         from "./pages/Signup";
import Dashboard      from "./pages/Dashboard";
import Statistics     from "./pages/Statistics";
import NotFound       from "./pages/NotFound";

// Auth and Dashboard pages use a full-screen layout without the shared footer
const FULL_SCREEN_ROUTES = ["/login", "/signup", "/dashboard"];

// Layout component handles common structure (Navbar, Routes, Footer)
function Layout() {

  // Get current route path to control layout dynamically
  const { pathname } = useLocation();

  // Check if current route is a full-screen page
  const isFullScreen = FULL_SCREEN_ROUTES.some(r => pathname.startsWith(r));

  return (
    <>
      {/* Navbar always visible — handles its own mobile menu */}
      {!isFullScreen && <Navbar />}
      {isFullScreen  && <Navbar />}
      
      {/* Define all application routes */}
      <Routes>

        {/* Home page route */}
        <Route path="/"              element={<Home />} />

        {/* Workshop listing page */}
        <Route path="/workshops"     element={<WorkshopList />} />

        {/* Workshop detail page (dynamic route using ID) */}
        <Route path="/workshops/:id" element={<WorkshopDetail />} />

        {/* Authentication routes */}
        <Route path="/login"         element={<Login />} />
        <Route path="/signup"        element={<Signup />} />

        {/* User dashboard */}
        <Route path="/dashboard"     element={<Dashboard />} />

        {/* Statistics/analytics page */}
        <Route path="/statistics"    element={<Statistics />} />

        {/* Fallback route for unknown paths */}
        <Route path="*"              element={<NotFound />} />
      </Routes>

      {/* Footer only on public pages (hide on login, signup, dashboard) */}
      {!pathname.startsWith("/login") &&
       !pathname.startsWith("/signup") &&
       !pathname.startsWith("/dashboard") && (
        <Footer />
      )}
    </>
  );
}

// Root component that wraps the app with routing and authentication context
export default function App() {
  return (

    // Enables client-side routing
    <BrowserRouter>

      // Provides authentication state and functions to the entire app
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  );
}
