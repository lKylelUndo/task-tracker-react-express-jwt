import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
