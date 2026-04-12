import { createContext, useContext, useState } from "react";
import { MOCK_USERS } from "../data/mockData";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = logged out

  // In the real app this POSTs to /api/login/ and stores the session cookie.
  // Here we just check the mock list so navigation/guards actually work.
  function login(email, password) {
    const found = MOCK_USERS.find(u => u.email === email);
    if (found && password.length >= 6) {
      setUser(found);
      return { ok: true };
    }
    return { ok: false, error: "Invalid credentials. Try riya@example.com / 123456" };
  }

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
    setUser(newUser);
    return { ok: true };
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthCtx.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  return useContext(AuthCtx);
}
