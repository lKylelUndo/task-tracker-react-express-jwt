import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(true);

  async function getTasksPerUser() {
    try {
      const res = await fetch("/api/get-tasks", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        console.log(res.statusText);
      }

      const data = await res.json();
      setTasks(data.tasks || []);
    } catch (error) {
      console.log(error);
    } finally {
      setTasksLoading(false);
    }
  }

  async function checkAuth() {
    try {
      const res = await fetch("/api/test", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setAuth(res.ok);
      setUser(data.user);
    } catch {
      setAuth(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (auth) {
      getTasksPerUser();
    }
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        user,
        checkAuth,
        tasks,
        tasksLoading,
        getTasksPerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
