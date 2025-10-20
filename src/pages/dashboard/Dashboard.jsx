import React, { useState } from "react";
import "./Dashboard.css";
import CreateCategory from "./../../components/createCategory/CreateCategory";
import CreateBlogs from "./../../components/createBlogs/CreateBlogs";
import AllBlogs from "../../components/allBlogs/AllBlogs";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../../components/Utils";
import { Toaster } from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const navigate = useNavigate();

  const tabClick = (tabName) => {
    setActiveTab(tabName);

    const tabs = document.getElementsByClassName("tab");
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].style.display = "none";
    }
    const tab = document.getElementById(tabName);
    if (tab) {
      tab.style.display = "block";
    }
  };

  const handleLogout = () => {
    handleSuccess("Logout Successfully");
    navigate("/");
  };
  return (
    <div className="dashboard-cont">
      {/* ---- Top Bar ---- */}
      <div className="dashboard-header">
        <h2 className="dashboard-title">Admin Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      {/* ---- Tabs ---- */}
      <div className="btn-container">
        <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === "tab1" ? "active" : ""}`}
            onClick={() => tabClick("tab1")}
          >
            Create Category
          </button>
          <button
            className={`tab-btn ${activeTab === "tab2" ? "active" : ""}`}
            onClick={() => tabClick("tab2")}
          >
            Create Blogs
          </button>
          <button
            className={`tab-btn ${activeTab === "tab3" ? "active" : ""}`}
            onClick={() => tabClick("tab3")}
          >
            All Blogs
          </button>
        </div>
      </div>

      {/* ---- Tab Content ---- */}
      <div className="content-container">
        <div className={`tab-content ${activeTab === "tab1" ? "show" : ""}`}>
          <CreateCategory />
        </div>
        <div className={`tab-content ${activeTab === "tab2" ? "show" : ""}`}>
          <CreateBlogs />
        </div>
        <div className={`tab-content ${activeTab === "tab3" ? "show" : ""}`}>
          <AllBlogs />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Dashboard;
