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
      <div className="detail-cont">
        <img src={blogs.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{blogs.title}</h5>
          <p className="card-text">{blogs.description}</p>
        </div>
      </div>
      <div className="comment-cont">
        <h3>Comments</h3>
        <div className="comment">
          <div className="container">
            {getComment && getComment.length > 0 ? (
              getComment.map((com) => (
                <div className="cont" key={com._id}>
                  <span className="badge">
                    {com.user?.name ? com.user.name[0] : "G"}
                  </span>
                  <div className="info">
                    <div className="flex">
                      <h4>{com.user?.name ? com.user.name : "Guest"}</h4>
                      <p className="date">{moment(com.createdAt).fromNow()}</p>
                    </div>
                    <p className="message">{com.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="none">
                <i>No comments here...</i>
              </p>
            )}
          </div>
          <form>
            <input
              type="text"
              placeholder="Write comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit" onClick={handleComment}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DetailBlogs;
