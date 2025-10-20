import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-cont">
      <p>© 2025 WordSmith. All rights reserved.</p>
      <div className="socials">
        <span>
          <FaFacebookF />
        </span>
        <span>
          <FaTwitter />
        </span>
        <span>
          <FaInstagram />
        </span>
      </div>
    </div>
  );
};

export default Footer;
