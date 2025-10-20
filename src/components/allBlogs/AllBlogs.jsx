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
            <Link to={`/update/${b.title}`} key={b._id} className="card-link">
              <div className="card">
                <div className="card-image">
                  <img src={b.image} alt={b.title} />
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    {b.title.length > 40
                      ? `${b.title.substring(0, 40)}...`
                      : b.title}
                  </h5>
                  <p className="card-text">
                    {b.description.length > 160
                      ? `${b.description.substring(0, 160)}...`
                      : b.description}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <h4 className="no-blogs">No Blogs Found</h4>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
