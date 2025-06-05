import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register";
  }, []);

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    };

    try {
      let res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let responseData = await res.json();

      if (!res.ok) {
        console.error(`Registration failed: ${responseData}`);
      }

      if (!responseData.errors || responseData.errors.length == 0) {
        navigate("/login");
      } else {
        console.log(responseData.errors);

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
    <div className="bg-sky-50 h-dvh flex justify-center pt-10">
      <div className="w-[1000px] h-[500px] mx-auto">
        <form
          onSubmit={handleRegister}
          className="bg-white rounded shadow p-5 w-[450px] mx-auto"
        >
          <h1 className="my-2 text-center font-bold text-2xl">Register</h1>

          <div className="flex gap-5">
            <div className="flex flex-col mb-5">
              <label htmlFor="first-name" className="font-sans">
                First Name
              </label>
              <input
                className="border rounded border-gray-300 w-full p-2"
                type="text"
                id="first-name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setErrors((prev) => ({ ...prev, firstName: null }));
                }}
                required
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div className="flex flex-col mb-5">
              <label htmlFor="last-name" className="font-sans">
                Last Name
              </label>
              <input
                className="border rounded border-gray-300 w-full p-2"
                type="text"
                id="last-name"
                onChange={(e) => {
                  setLastName(e.target.value);
                  setErrors((prev) => ({ ...prev, lastName: null }));
                }}
                required
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

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

          <div className="flex flex-col mt-5">
            <label htmlFor="confirm-password" className="font-sans">
              Confirm Password
            </label>
            <input
              className="border rounded border-gray-300 w-full p-2"
              type="password"
              id="confirm-password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors((prev) => ({ ...prev, confirmPassword: null }));
              }}
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="my-4">
            <button
              type="submit"
              className="w-full hover:bg-blue-300 duration-300 bg-blue-700 p-2 text-white font-sans rounded"
            >
              Register
            </button>
          </div>
          <Link
            to={"/login"}
            className="text-[12px] block text-center text-blue-600 hover:underline"
          >
            Already had an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
