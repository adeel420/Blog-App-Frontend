import React, { useEffect, useState } from "react";
import "./UpdateBlogs.css";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { handleError, handleSuccess } from "../Utils";

const UpdateBlogs = () => {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [title1, setTitle1] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState("");

  const { title } = useParams();

  const handleBreak = (e) => {
    e.preventDefault();
    setDescription((prev) => prev + "\n");
  };

  const handleSingle = async () => {
    try {
      const response = await fetch(
        `https://blog-app-backend-eosin.vercel.app/blog/single/${title}`
      );
      const result = await response.json();
      setId(result._id);
      setTitle1(result.title);
      setDescription(result.description);
      setImage(result.image);
      setCategory(result.category);
      setFile(null);
    } catch (err) {}
  };

  const handleGetCategory = async () => {
    try {
      const response = await fetch(
        "https://blog-app-backend-eosin.vercel.app/category/"
      );
      const result = await response.json();
      setCategories(result);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title1);
    formData.append("description", description);
    formData.append("category", category);

    try {
      const response = await axios.put(
        `https://blog-app-backend-eosin.vercel.app/blog/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handleSuccess("Blog update successfully");
      navigate("/dashboard");
    } catch (err) {
      handleError("Failed to update the blog.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://blog-app-backend-eosin.vercel.app/blog/delete/${id}`
      );
      handleSuccess("blog deleted successfully");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleSingle();
    handleGetCategory();
  }, []);

  const handleShowSetImage = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImage(URL.createObjectURL(selectedFile));
  };

  return (
    <div className="updateBlogs">
      <h3 className="title">Update Blog</h3>
      <form className="createForm" onSubmit={handleUpdate}>
        <Select
          className="select"
          value={category}
          showSearch
          placeholder="Choose Category..."
          onChange={(value) => setCategory(value)}
        >
          {categories.map((cat) => (
            <Select.Option value={cat._id} key={cat._id}>
              {cat.category}
            </Select.Option>
          ))}
        </Select>
        <label>
          Upload Image
          <input type="file" onChange={handleShowSetImage} hidden />
        </label>
        {image && (
          <img src={image} alt="Preview" height="150px" width="150px" />
        )}
        <input
          type="text"
          placeholder="Write Title..."
          spellCheck="false"
          value={title1}
          onChange={(e) => setTitle1(e.target.value)}
        />
        <div className="textarea">
          <textarea
            rows={6}
            placeholder="Write Description..."
            value={description}
            spellCheck="false"
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleBreak}>Next Line</button>
        </div>
        <button className="submit" type="submit">
          Update
        </button>
      </form>
      <button className="btn btn-danger delete" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default UpdateBlogs;
