import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../components/Utils";
import { Toaster } from "react-hot-toast";
import "./Login.css";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("Both fields are required.");
    }
    try {
      const response = await fetch(
        "https://blog-app-backend-eosin.vercel.app/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginInfo),
        }
      );
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        handleSuccess("Login successfully");
        localStorage.setItem("token", result.token);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-cont">
      <Toaster />
      <div className="container">
        <h3>Login</h3>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            value={loginInfo.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={loginInfo.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <button type="submit">Login</button>
          <span>
            Don’t have an account?{" "}
            <NavLink to="/signup" style={{ color: "#ee6545" }}>
              Signup
            </NavLink>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
