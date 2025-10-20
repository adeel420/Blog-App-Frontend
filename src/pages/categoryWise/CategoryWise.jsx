import React, { useEffect, useState } from "react";
import "./CategoryWise.css";
import { Link, useParams } from "react-router-dom";

const CategoryWise = () => {
  const [blogs, setBlogs] = useState([]);
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const { category } = useParams();

  const handleCategoryWise = async () => {
    try {
      const response = await fetch(
        `https://blog-app-backend-eosin.vercel.app/blog/category-wise/${category}`
      );
      const result = await response.json();
      console.log(result.news);
      setBlogs(result.news);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePosts = async () => {
    try {
      const response = await fetch(
        "https://dummyjson.com/posts?limit=5&select=title,reactions,views"
      );
      const result = await response.json();
      setPosts(result.posts);
    } catch (err) {}
  };

  const filteredBlogs = blogs.filter((item) =>
    item.title.toLowerCase().includes(input.toLowerCase())
  );

  useEffect(() => {
    handleCategoryWise();
    handlePosts();
  }, []);
  return (
    <div className="categoryWise">
      <h3 className="title">
        Category: <span>{category}</span>
      </h3>

      <div className="flex-container">
        {/* Left: Blogs */}
        <div className="cont">
          {filteredBlogs && filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <Link
                to={`/detail/${blog.title}`}
                key={blog._id}
                className="blog-card"
              >
                <div className="card">
                  <img src={blog.image} className="card-img" alt={blog.title} />
                  <div className="card-body">
                    <h5 className="card-title">
                      {blog.title.length > 40
                        ? `${blog.title.substring(0, 40)}...`
                        : blog.title}
                    </h5>
                    <p className="card-text">
                      {blog.description.length > 150
                        ? `${blog.description.substring(0, 150)}...`
                        : blog.description}
                    </p>
                    <p className="card-category">
                      <span>Category:</span> {category}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <h3 className="none">No Blogs here...</h3>
          )}
        </div>

        {/* Right: Featured */}
        <div className="featured">
          <form>
            <input
              type="text"
              placeholder="Search blogs here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>

          <div className="featured-posts">
            <h3>Featured Posts</h3>
            {posts.map((post, index) => (
              <div className="post-card" key={index}>
                <p className="post-title">{post.title}</p>
                <div className="post-meta">
                  <p>{post.views} views</p>
                  <p>
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryWise;
