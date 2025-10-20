import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../components/Utils";
import { Toaster } from "react-hot-toast";
import { FaLock, FaEnvelope } from "react-icons/fa";
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
      <div className="login-card">
        <h3>Welcome Back 👋</h3>
        <p className="subtitle">Log in to continue your WordSmith journey</p>
        <form onSubmit={handleLogin}>
          <div className="input-box">
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              value={loginInfo.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />
          </div>

          <div className="input-box">
            <FaLock className="icon" />
            <input
              type="password"
              name="password"
              value={loginInfo.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Log In
          </button>

          <span className="signup-text">
            Don’t have an account?{" "}
            <NavLink
              to="/signup"
              style={{ color: "#ee6545", fontWeight: "600" }}
            >
              Sign Up
            </NavLink>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
