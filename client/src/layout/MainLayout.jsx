import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const MainLayout = () => {
  // const [auth, setAuth] = useState(false);

  // async function checkAuth() {
  //   try {
  //     const res = await fetch("/api/test", {
  //       method: "GET",
  //       credentials: "include",
  //     });
  //     const data = await res.json();
  //     console.log(data.user);
  //     setAuth(true);
  //   } catch {
  //     setAuth(false);
  //   }
  // }

  // useEffect(() => {
  //   checkAuth();
  // }, [auth]);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
