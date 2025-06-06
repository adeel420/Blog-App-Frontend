import React, { useEffect, useState } from "react";
import "./CreateBlogs.css";
import { Select } from "antd";
import { handleSuccess } from "./../Utils";

const CreateBlogs = () => {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const handleBreak = (e) => {
    e.preventDefault();
    setDescription((prev) => prev + "\n");
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("title", title);
    formData.append("category", category);
    try {
      const url = "https://blog-app-backend-eosin.vercel.app/blog/create";
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      handleSuccess("Blog uploaded successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleGet = async () => {
    try {
      const response = await fetch(
        "https://blog-app-backend-eosin.vercel.app/category/"
      );
      const result = await response.json();
      setCategories(result);
    } catch (err) {}
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <div className="createBlogs">
      <h3 className="title">Create Blogs</h3>
      <form className="createForm">
        <Select
          className="select"
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
          {file ? file.name : "Upload Image"}
          <input
            type="file"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>
        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt=""
            height={"150px"}
            width={"150px"}
          />
        )}
        <input
          type="text"
          placeholder="Write Title..."
          spellCheck="false"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="textarea">
          <textarea
            name=""
            rows={6}
            placeholder="Write Description..."
            value={description}
            spellCheck="false"
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleBreak}>Next Line</button>
        </div>
        <button className="submit" type="submit" onClick={handlePost}>
          Upload Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlogs;
