import React, { useEffect, useState } from "react";
import "./AllBlogs.css";
import { Link } from "react-router-dom";

const AllBlogs = () => {
  const [blog, setBlog] = useState([]);

  const handleGet = async () => {
    try {
      const response = await fetch(
        "https://blog-app-backend-eosin.vercel.app/blog/"
      );
      const result = await response.json();
      setBlog(result);
    } catch (err) {}
  };

  useEffect(() => {
    handleGet();
  }, []);
  return (
    <div className="allBlogs">
      <h3 className="title">All Blogs</h3>
      <div className="card-cont">
        {blog && blog.length > 0 ? (
          blog.map((b) => (
            <Link to={`/update/${b.title}`} style={{ textDecoration: "wavy" }}>
              <div className="card" style={{ width: "30rem" }} key={b._id}>
                <img src={b.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">
                    {b.title.length > 40
                      ? `${b.title.substring(0, 40)}...`
                      : b.title}
                  </h5>
                  <p className="card-text">
                    {b.description.length > 140
                      ? `${b.description.substring(0, 140)}...`
                      : b.description}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
