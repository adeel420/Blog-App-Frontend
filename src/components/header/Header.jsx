import React, { useEffect, useState } from "react";
import "./Header.css";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { handleSuccess } from "../Utils";

const Header = () => {
  const [user, setUser] = useState("");
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    handleSuccess("Logout Successfully");
    setTimeout(() => navigate("/login"), 1000);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch(
          "https://blog-app-backend-eosin.vercel.app/user/name",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const result = await res.json();
        setUser(result);
      } catch {}
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://blog-app-backend-eosin.vercel.app/category/"
        );
        const result = await res.json();
        setCategories(result);
      } catch {}
    };

    fetchUserInfo();
    fetchCategories();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg header-cont">
      <div className="header-inner container-fluid">
        <Link className="navbar-brand logo" to="/">
          <img src="/images/blog.png" alt="logo" />
          WordSmith
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blogs">
                Blogs
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Category
              </a>
              <ul className="dropdown-menu drop">
                <li>
                  <Link className="dropdown-item" to="/all-categories">
                    All Categories
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat._id}>
                    <Link
                      className="dropdown-item"
                      to={`/category/${cat.category}`}
                    >
                      {cat.category}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>

          <div className="account-section">
            {token ? (
              <div className="dropdown">
                <button
                  className="btn account-btn dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  {user?.name}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  {user.role === 1 && (
                    <li>
                      <Link className="dropdown-item" to="/dashboard">
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="dropdown">
                <button
                  className="btn account-btn dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <FaUser /> Create Account
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/signup">
                      Signup
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
