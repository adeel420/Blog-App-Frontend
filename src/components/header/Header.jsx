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
    setTimeout(() => {
      navigate("login");
    }, 1000);
    localStorage.removeItem("token");
  };

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(
        "https://blog-app-backend-eosin.vercel.app/user/name",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setUser(result);
    } catch (err) {}
  };

  const handleGet = async () => {
    try {
      const response = await fetch(
        "https://blog-app-backend-eosin.vercel.app/category/"
      );
      const result = await response.json();
      setCategories(result);
    } catch (err) {}
  };

  useEffect(() => {
    fetchUserInfo();
    handleGet();
  }, []);

  return (
    <div className="header-cont">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand logo" href="/">
            <img src="/images/blog.png" alt="" />
            WordSmith
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse all"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/blogs">
                  Blogs
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </a>
                <ul className="dropdown-menu drop">
                  <li>
                    <a className="dropdown-item" href="/all-categories">
                      All Categories
                    </a>
                  </li>
                  {categories.map((category) => (
                    <li key={category._id}>
                      <a
                        className="dropdown-item"
                        href={`/category/${category.category}`}
                      >
                        {category.category}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/about"
                >
                  About
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/contact"
                >
                  Contact
                </a>
              </li>
            </ul>

            {token ? (
              <li className="nav-item dropdown last">
                <a
                  className="nav-link -toggle btn "
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user?.name}
                </a>
                <ul className="dropdown-menu">
                  <li>
                    {user.role === 1 ? (
                      <a className="dropdown-item" href="/dashboard">
                        Dashboard
                      </a>
                    ) : (
                      <></>
                    )}
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item dropdown last">
                <a
                  className="nav-link -toggle btn"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaUser /> Create Account
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/login">
                      Login
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/signup">
                      Signup
                    </a>
                  </li>
                </ul>
              </li>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
