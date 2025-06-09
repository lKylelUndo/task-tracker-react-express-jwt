import React, { useContext } from "react";
import logo from "../assets/task.png";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  async function handleLogout() {
    try {
      let res = await fetch("/api/logout", { method: "POST" });
      if (res.ok) {
        await res.json();
        setAuth(false);
        navigate("/login");
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-blue-500">
      <div className="h-[50px] flex items-center">
        <div className="max-w-[1000px] mx-auto px-4 w-full flex justify-between">
          <img src={logo} alt="Logo" className="h-8" />
          {auth && (
            <button
              onClick={handleLogout}
              className="bg-white text-blue-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
