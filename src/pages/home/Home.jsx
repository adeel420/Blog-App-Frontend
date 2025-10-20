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
      {/* ---------- Hero Section ---------- */}
      <section className="hero-section">
        <h1>
          Welcome to <span>WordSmith</span> – Your Daily Dose of Inspiration
        </h1>
        <p>
          Discover insights, ideas, and stories that ignite creativity, nurture
          growth, and celebrate the power of words.
        </p>
        <Link to="/blogs" className="hero-btn">
          Explore Blogs
        </Link>
      </section>

      {/* ---------- Featured Categories ---------- */}
      <section className="featured-category">
        <h3 className="title">Explore by Category</h3>
        <div className="cont">
          {categories.map((category) => (
            <Link
              to={`/category/${category.category}`}
              key={category._id}
              className="card category-card"
            >
              <div className="img-overlay">
                <img src="./images/back-png.png" alt={category.category} />
                <div className="overlay"></div>
                <h5>{category.category}</h5>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- Featured Blogs ---------- */}
      <section className="featured-blogs">
        <h3 className="title">Featured Blogs</h3>
        <div className="cont">
          {blogs.map((blog) => (
            <Link
              to={`/detail/${blog.title}`}
              key={blog._id}
              className="card blog-card"
            >
              <img src={blog.image} alt={blog.title} />
              <div className="card-body">
                <h5>
                  {blog.title.length > 40
                    ? `${blog.title.substring(0, 40)}...`
                    : blog.title}
                </h5>
                <p>
                  {blog.description.length > 100
                    ? `${blog.description.substring(0, 100)}...`
                    : blog.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- CTA Section ---------- */}
      <section className="cta-section">
        <h3>Join the WordSmith Community</h3>
        <p>
          Stay inspired, share your thoughts, and never miss an update. Sign up
          and become part of our growing creative circle.
        </p>
        <Link to="/signup">
          <button>Get Started</button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
