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
    <div className="allCategories">
      <h3 className="title">All Categories</h3>
      <div className="flex-container">
        <div className="cont">
          {filteredBlogs && filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <Link
                to={`/detail/${blog.title}`}
                style={{ textDecoration: "wavy" }}
              >
                <div className="card" style={{ width: "38rem" }} key={blog._id}>
                  <img src={blog.image} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">
                      {blog.title.length > 40
                        ? `${blog.title.substring(0, 40)}...`
                        : blog.title}
                    </h5>
                    <p className="card-text">
                      {blog.description.length > 300
                        ? `${blog.description.substring(0, 300)}...`
                        : blog.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <h3 className="none">No Blogs here...</h3>
          )}
        </div>
        <div className="featured">
          <form>
            <input
              type="text"
              placeholder="Search blogs here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
          <div className="div">
            <h3>Featured Posts</h3>
            {posts.map((post, index) => (
              <div className="post-cont" key={index}>
                <p>{post.title}</p>
                <div className="flex">
                  <p>{post.views} views</p>
                  <p>
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
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

export default AllCategories;
