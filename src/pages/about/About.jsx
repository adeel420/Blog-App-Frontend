import React from "react";
import "./About.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-cont">
      <div className="hero-section">
        <h3 className="title">About-us</h3>
        <p>
          Welcome to WordSmith! We're glad you're here. At WordSmith, we believe
          in the power of words to inspire, inform, and transform. Our blog is a
          space where ideas come to life, stories are shared, and knowledge is
          expanded.
        </p>
      </div>
      <div className="container">
        <div className="cont">
          <h3>About the Author</h3>
          <p>
            Hi, I'm Author, the creator behind WordSmith. As a passionate
            blogger and web developer, I started this platform to share my
            thoughts and connect with like-minded individuals. Alongside me, a
            talented team of writers and collaborators contributes to bringing
            our vision to life.
          </p>
        </div>
        <div className="cont">
          <h3>Our Mission</h3>
          <p>
            Our mission is to create a platform that educates, entertains, and
            empowers our readers through high-quality, engaging, and insightful
            content. Whether you're here for inspiration, news, or a fresh
            perspective, you'll find something to love.
          </p>
        </div>
        <div className="cont">
          <h3>Why We Started</h3>
          <p>
            WordSmith was born out of a desire to create a space for authentic
            storytelling and valuable insights. In a world full of noise, we
            strive to bring clarity, curiosity, and creativity to the forefront.
          </p>
        </div>
      </div>
      <div className="getTouch-cont">
        <h3>Get in Touch:</h3>
        <p>
          If you'd like to connect with us, collaborate, or just say hello,
          visit our{" "}
          <Link
            to={"/contact"}
            style={{ color: "#ee6545", fontWeight: "bold" }}
          >
            Contact Page
          </Link>{" "}
          or email us at{" "}
          <Link
            to={"https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"}
            style={{ color: "#ee6545", fontWeight: "bold" }}
          >
            wordsmith@gmail.com
          </Link>
          . We look forward to hearing from you!
        </p>
      </div>
    </div>
  );
};

export default About;
