import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);

  async function checkAuth() {
    try {
      const res = await fetch("/api/test", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setAuth(true);
      }
    } catch {
      setAuth(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
  );
};
