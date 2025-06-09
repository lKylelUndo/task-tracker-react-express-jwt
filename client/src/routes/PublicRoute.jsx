import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.isAuthenticated) {
      if (auth.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/homepage");
      }
    }
  }, [auth]);

  return children;
};

export default PublicRoute;
