import React, { useEffect, useState } from "react";
import "./CreateCategory.css";
import { handleError, handleSuccess } from "./../Utils";
import axios from "axios";

const CreateCategory = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [updated, setUpdated] = useState("");

  const handlePopup = () => {
    setOpenPopup(!openPopup);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!category) {
      return handleError("You cannot create empty");
    }
    try {
      const response = await fetch(
        "https://blog-app-backend-eosin.vercel.app/category/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category }),
        }
      );
      const result = await response.json();
      handleSuccess(`${result.category} created successfully`);
      setCategory("");
      handleGet();
    } catch (err) {}
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://blog-app-backend-eosin.vercel.app/category/update/${selected}`,
        { category: updated }
      );
      setUpdated("");
      handleSuccess(`Category Updated Successfully`);
      handleGet();
      setCategory("");
      setSelected(null);
      setOpenPopup(false);
    } catch (err) {}
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://blog-app-backend-eosin.vercel.app/category/delete/${id}`
      );
      handleSuccess(`category deleted successfully`);
      handleGet();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <div className="createCategory">
      <h3 className="title">Create Category</h3>

      {/* ---- Create Category Form ---- */}
      <form className="createForm" onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Enter new category..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>

      {/* ---- Category Table ---- */}
      <div className="table-cont">
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories && categories.length > 0 ? (
              categories.map((cat) => (
                <tr key={cat._id}>
                  <td>{cat.category}</td>
                  <td>
                    <button
                      className="update-btn"
                      onClick={() => {
                        handlePopup();
                        setSelected(cat._id);
                        setUpdated(cat.category);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(cat._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="no-cat">
                  No Categories Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ---- Update Popup ---- */}
      {openPopup && (
        <div className="popup-container">
          <div className="popup">
            <button className="close-btn" onClick={handlePopup}>
              &times;
            </button>
            <h4>Update Category</h4>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Update category name..."
                value={updated}
                onChange={(e) => setUpdated(e.target.value)}
              />
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCategory;
