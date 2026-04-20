import { createContext, useContext, useState } from "react";
import { MOCK_USERS } from "../data/mockData";

// Create authentication context to share user data across the app
const AuthCtx = createContext(null);

// AuthProvider: Wraps the app and provides authentication state and functions
export function AuthProvider({ children }) {

  // Stores the currently logged-in user (null = not logged in)
  const [user, setUser] = useState(null); // null = logged out

  // In the real app this POSTs to /api/login/ and stores the session cookie.
  // Here we just check the mock list so navigation/guards actually work.
  function login(email, password) {
    const found = MOCK_USERS.find(u => u.email === email);

    // Simple validation: user exists and password length check
    if (found && password.length >= 6) {
      setUser(found);
      return { ok: true };
    }

    // Return error if login fails
    return { ok: false, error: "Invalid credentials. Try riya@example.com / 123456" };
  }

  // Signup function: creates a new user account (mock)
  function signup(data) {
    // Creates a new coordinator account
    const newUser = {
      id: Date.now(),
      username: data.email.split("@")[0],
      email: data.email,
      role: "coordinator",
      name: data.name,
      institute: data.institute,
      state: data.state,
      phone: data.phone,
    };
    setUser(newUser);   // Automatically log in the new user
    return { ok: true };
  }
  
  // Logout function: clears user session
  function logout() {
    setUser(null);
  }

  return (

    // Provide auth data and functions to all child components
    <AuthCtx.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

// Custom hook to easily access authentication context
export function useAuth() {
  return useContext(AuthCtx);
}
