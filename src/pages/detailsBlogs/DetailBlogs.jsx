import React, { useEffect, useState } from "react";
import "./DetailsBlogs.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { handleError } from "./../../components/Utils";

const DetailBlogs = () => {
  const [blogs, setBlogs] = useState("");
  const [comment, setComment] = useState("");
  const [getComment, setGetComment] = useState([]);
  const [user, setUser] = useState(null);
  const { title } = useParams();

  const handleSingle = async () => {
    try {
      const response = await fetch(
        `https://blog-app-backend-eosin.vercel.app/blog/single/${title}`
      );
      const result = await response.json();
      setBlogs(result);
    } catch (err) {}
  };

  const token = localStorage.getItem("token");

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment) {
      return handleError("You cannot write a blank comment");
    }
    try {
      const response = await axios.post(
        "https://blog-app-backend-eosin.vercel.app/comment/create",
        { comment, blog: blogs._id, user: user },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComment("");
      handleGet();
      console.log(response);
    } catch (err) {
      console.error(err);
    }
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
      setUser(result.id);
    } catch (err) {}
  };

  const handleGet = async () => {
    if (!blogs._id) return;
    try {
      const response = await axios.get(
        `https://blog-app-backend-eosin.vercel.app/comment/blog-comment/${blogs._id}`
      );
      setGetComment(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleSingle();
    fetchUserInfo();
  }, []);

  useEffect(() => {
    handleGet();
  }, [blogs._id]);

  return (
    <div className="detailBlogs">
      <div className="blog-hero">
        <img src={blogs.image} alt="Blog Visual" className="hero-image" />
        <div className="hero-content">
          <h1 className="blog-title">{blogs.title}</h1>
          <p className="blog-description">{blogs.description}</p>
        </div>
      </div>

      <div className="comments-section">
        <h3 className="section-heading">💬 Comments</h3>

        <div className="comments-container">
          {getComment && getComment.length > 0 ? (
            getComment.map((com) => (
              <div className="comment-item" key={com._id}>
                <div className="avatar">
                  {com.user?.name ? com.user.name[0] : "G"}
                </div>
                <div className="comment-content">
                  <div className="comment-header">
                    <h4 className="username">{com.user?.name || "Guest"}</h4>
                    <span className="comment-date">
                      {moment(com.createdAt).fromNow()}
                    </span>
                  </div>
                  <p className="comment-text">{com.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-comments">
              <i>No comments yet — be the first!</i>
            </p>
          )}
        </div>

        <form className="comment-form">
          <input
            type="text"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit" onClick={handleComment}>
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default DetailBlogs;
