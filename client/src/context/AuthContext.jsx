import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  async function checkAuth() {
    try {
      const res = await fetch("/api/test", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setAuth({
          isAuthenticated: true,
          role: data.user.isAdmin ? "admin" : "user",
          email: data.user.email,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          id: data.user.id,
        });
      }
    } catch {
      setAuth(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
