import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Signup from "./pages/signup/Signup";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Blogs from "./pages/blogs/Blogs";
import UpdateBlogs from "./components/updateBlogs/UpdateBlogs";
import { useEffect, useState } from "react";
import DetailBlogs from "./pages/detailsBlogs/DetailBlogs";
import CategoryWise from "./pages/categoryWise/CategoryWise";
import AllCategories from "./pages/allCategories/AllCategories";
import Footer from "./components/footer/Footer";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/update/:title" element={<UpdateBlogs />} />
        <Route path="/detail/:title" element={<DetailBlogs />} />
        <Route path="/all-categories" element={<AllCategories />} />
        <Route path="/category/:category" element={<CategoryWise />} />
      </Routes>
      <Toaster />
      {/* <Footer /> */}
    </>
  );
}

export default App;
