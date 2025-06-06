import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const handleGetCategory = async () => {
    try {
      const response = await fetch(
        "https://blog-app-backend-eosin.vercel.app/category/limit"
      );
      const result = await response.json();
      setCategories(result);
    } catch (err) {}
  };

  const handleGet = async () => {
    try {
      const response = await fetch(
        "https://blog-app-backend-eosin.vercel.app/blog/limit"
      );
      const result = await response.json();
      console.log(result);
      setBlogs(result);
    } catch (err) {}
  };

  useEffect(() => {
    handleGetCategory();
    handleGet();
  }, []);
  return (
    <div className="home-cont">
      <div className="hero-section">
        <h2>Welcome to WordSmith – Your Daily Dose of Inspiration</h2>
        <p>
          Explore articles, tips, and stories that spark creativity, empower
          growth, and enrich lives.
        </p>
        <Link to="/blogs" style={{ textDecoration: "none" }}>
          <button>Explore Blogs</button>
        </Link>
      </div>
      <div className="featured-category">
        <h3 className="title">Featured Category</h3>
        <div className="cont">
          {categories.map((category) => (
            <Link
              to={`/category/${category.category}`}
              style={{ textDecoration: "wavy" }}
            >
              <div
                className="card"
                style={{ width: "18rem" }}
                key={category._id}
              >
                <img
                  src="./images/back-png.png"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{category.category}</h5>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="featured-blogs">
        <h3 className="title">Featured Blogs</h3>
        <div className="cont">
          {blogs.map((blog) => (
            <Link
              to={`/detail/${blog.title}`}
              style={{ textDecoration: "wavy" }}
            >
              <div className="card" style={{ width: "18rem" }} key={blog._id}>
                <img src={blog.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">
                    {blog.title.length > 40
                      ? `${blog.title.substring(0, 40)}...`
                      : blog.title}
                  </h5>
                  <p className="card-text">
                    {blog.description.length > 100
                      ? `${blog.description.substring(0, 100)}...`
                      : blog.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
