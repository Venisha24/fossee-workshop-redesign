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

function Layout() {
  const { pathname } = useLocation();
  const isFullScreen = FULL_SCREEN_ROUTES.some(r => pathname.startsWith(r));

  return (
    <>
      {/* Navbar always visible — handles its own mobile menu */}
      {!isFullScreen && <Navbar />}
      {isFullScreen  && <Navbar />}

      <Routes>
        <Route path="/"              element={<Home />} />
        <Route path="/workshops"     element={<WorkshopList />} />
        <Route path="/workshops/:id" element={<WorkshopDetail />} />
        <Route path="/login"         element={<Login />} />
        <Route path="/signup"        element={<Signup />} />
        <Route path="/dashboard"     element={<Dashboard />} />
        <Route path="/statistics"    element={<Statistics />} />
        <Route path="*"              element={<NotFound />} />
      </Routes>

      {/* Footer only on public pages */}
      {!pathname.startsWith("/login") &&
       !pathname.startsWith("/signup") &&
       !pathname.startsWith("/dashboard") && (
        <Footer />
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  );
}
