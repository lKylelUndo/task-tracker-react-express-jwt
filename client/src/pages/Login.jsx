import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // <-- add this import

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
  }, []);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      let res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      let responseData = await res.json();
      console.log(responseData);

      if (res.ok) {
        navigate("/homepage");
      } else {
        const errorsObj = {};
        responseData.errors.forEach((error) => {
          errorsObj[error.path] = error.msg;
        });
        console.log(errorsObj);
        setErrors(errorsObj);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-sky-50 h-dvh flex items-center justify-center">
      <div className="w-[1000px] h-[500px] mx-auto">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded shadow p-5 w-[450px] mx-auto mt-[50px]"
        >
          <h1 className="my-2 text-center font-bold text-2xl">Login</h1>

          <div className="flex flex-col mb-5">
            <label htmlFor="email" className="font-sans">
              Email
            </label>
            <input
              className="border rounded border-gray-300 w-full p-2"
              type="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: null }));
              }}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col mt-5">
            <label htmlFor="password" className="font-sans">
              Password
            </label>
            <input
              className="border rounded border-gray-300 w-full p-2"
              type="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: null }));
              }}
              required
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="my-4">
            <button
              type="submit"
              className="w-full hover:bg-blue-300 duration-300 bg-blue-700 p-2 text-white font-medium rounded"
            >
              Login
            </button>
          </div>

          <Link
            to={"/register"}
            className="text-[12px] block text-center text-blue-600 hover:underline"
          >
            Dont have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
