import React, { useState } from "react";
import "./Dashboard.css";
import CreateCategory from "./../../components/createCategory/CreateCategory";
import CreateBlogs from "./../../components/createBlogs/CreateBlogs";
import AllBlogs from "../../components/allBlogs/AllBlogs";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("tab1");

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
  return (
    <div className="dashboard-cont">
      <div className="btn-container">
        <div className="button">
          <button
            className={activeTab === "tab1" ? "active-tab" : ""}
            style={{
              backgroundColor: activeTab === "tab1" ? "#212529" : "#ee6545",
            }}
            onClick={() => tabClick("tab1")}
          >
            Create Category
          </button>
          <button
            style={{
              backgroundColor: activeTab === "tab2" ? "#212529" : "#ee6545",
            }}
            className={activeTab === "tab2" ? "active-tab" : ""}
            onClick={() => tabClick("tab2")}
          >
            Create Blogs
          </button>
          <button
            style={{
              backgroundColor: activeTab === "tab3" ? "#212529" : "#ee6545",
            }}
            className={activeTab === "tab3" ? "active-tab" : ""}
            onClick={() => tabClick("tab3")}
          >
            All Blogs
          </button>
        </div>
      </div>
      <div className="content-container">
        <div
          className="tab"
          id="tab1"
          style={{ display: activeTab === "tab1" ? "block" : "none" }}
        >
          <CreateCategory />
        </div>
        <div
          className="tab"
          id="tab2"
          style={{ display: activeTab === "tab2" ? "block" : "none" }}
        >
          <CreateBlogs />
        </div>
        <div
          className="tab"
          id="tab3"
          style={{ display: activeTab === "tab3" ? "block" : "none" }}
        >
          <AllBlogs />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
