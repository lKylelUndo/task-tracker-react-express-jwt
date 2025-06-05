import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const MainLayout = () => {
  const { auth, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Navbar auth={auth} />
      <Outlet />
    </>
  );
};

export default MainLayout;
