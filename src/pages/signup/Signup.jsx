import React, { useEffect, useState } from "react";
import "./Signup.css";
import { NavLink, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../components/Utils";
import { Toaster } from "react-hot-toast";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("All fields are required");
    }
    try {
      const response = await fetch(
        "https://blog-app-backend-eosin.vercel.app/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupInfo),
        }
      );
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        handleSuccess("Signup successfully");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        handleError("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signup-cont">
      <div className="signup-card">
        <h3>Create Account ✨</h3>
        <p className="subtitle">
          Join WordSmith and start sharing your stories
        </p>
        <form onSubmit={handleSignup}>
          <div className="input-box">
            <FaUser className="icon" />
            <input
              type="text"
              name="name"
              value={signupInfo.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </div>

          <div className="input-box">
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              value={signupInfo.email}
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
              value={signupInfo.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>

          <span className="login-text">
            Already have an account?{" "}
            <NavLink
              to="/login"
              style={{ color: "#ee6545", fontWeight: "600" }}
            >
              Log In
            </NavLink>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
