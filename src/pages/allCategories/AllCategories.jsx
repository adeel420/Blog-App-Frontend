import React, { useEffect, useState } from "react";
import "./AllCategories.css";
import { Link } from "react-router-dom";

const AllCategories = () => {
  const [blogs, setBlogs] = useState([]);
  const [posts, setPosts] = useState([]);
  const [like, setLike] = useState({});
  const [input, setInput] = useState("");

  const handleGet = async () => {
    try {
      const response = await fetch(
        "https://blog-app-backend-eosin.vercel.app/blog/"
      );
      const result = await response.json();
      console.log(result);
      setBlogs(result);
    } catch (err) {}
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

  useEffect(() => {
    handleGet();
    handlePosts();
  }, []);

  const filteredBlogs = blogs.filter((item) =>
    item.title.toLowerCase().includes(input.toLowerCase())
  );
  return (
    <div className="blogs-cont">
      <h3 className="title">All Categories</h3>

      <div className="flex-container">
        {/* LEFT: Blog List */}
        <div className="cont">
          {filteredBlogs && filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <Link
                to={`/detail/${blog.title}`}
                key={blog._id}
                className="blog-card"
              >
                <div className="card">
                  <div className="card-image">
                    <img src={blog.image} alt={blog.title} />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {blog.title.length > 60
                        ? `${blog.title.substring(0, 60)}...`
                        : blog.title}
                    </h5>
                    <p className="card-text">
                      {blog.description.length > 200
                        ? `${blog.description.substring(0, 200)}...`
                        : blog.description}
                    </p>
                    <button className="read-more">Read More →</button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <h3 className="none">No Blogs here...</h3>
          )}
        </div>

        {/* RIGHT: Featured Posts */}
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
                  <span>{post.views} views</span>
                  <span>
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCategories;
