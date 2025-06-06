import React from "react";
import "./Contact.css";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="contact-cont">
      <div className="hero-section">
        <h3 className="title">Contact Us</h3>
        <p>
          We’d love to hear from you! Whether you have questions, feedback, or
          simply want to say hello, feel free to reach out. Your thoughts and
          suggestions help us grow and improve.
        </p>
      </div>
      <div className="flex-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.7223890291702!2d74.27821557422818!3d31.449308750651962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391901fda59059cd%3A0xb7feb9bb31898d37!2sKeepCoders!5e0!3m2!1sen!2s!4v1736088804223!5m2!1sen!2s"
          width="500"
          height="350"
          style={{ border: "0" }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="text">
          <h3>Contact Information</h3>
          <div className="cont">
            <label htmlFor="">Email Us:</label>
            <p>wordsmith@gmail.com</p>
            <label htmlFor="">Call Us:</label>
            <p>0300-1234567</p>
            <label htmlFor="">Follow Us:</label>
            <p>
              <span>
                <FaFacebook />
              </span>
              <span>
                <FaYoutube />
              </span>
              <span>
                <FaTwitter />
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
