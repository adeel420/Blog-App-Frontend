import React, { useEffect, useState } from "react";
import "./Signup.css";
import { NavLink, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../components/Utils";
import { Toaster } from "react-hot-toast";

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
      <div className="container">
        <h3>Signup</h3>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            value={signupInfo.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={signupInfo.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={signupInfo.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <button type="submit">Signup</button>
          <span>
            Already have an account?{" "}
            <NavLink style={{ color: "#ee6545" }} to={"/login"}>
              Login
            </NavLink>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
