import "./FooterStyles.css";

import React from 'react';
import { FaMailBulk, FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="left">
          <div className="email">
            <h4>
            <a href="mailto:itfolio.ask@gmail.com" className="email-link">
  <FaMailBulk size={20} style={{ color: "#000", marginRight: "10px" }} /> itfolio.ask@gmail.com
</a>
            </h4>
          </div>
        </div>
        <div className="right">
          <h4>About the web Application</h4>
          <p className="footerp">Thanks for visiting! This web application was created by Wasan Subaihi, Lara Al-Qaisi, Shadan Ekedat, and Hamza Al-Manaseer. We're always open to hear your ideas, recommendations, thoughts, or suggestions with us for making it even better.</p>
          <div className="social">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaFacebook size={30} style={{ color: "#000", marginRight: "1rem" }} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaTwitter size={30} style={{ color: "#000", marginRight: "1rem" }} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaLinkedin size={30} style={{ color: "#000", marginRight: "1rem" }} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright text */}
      <div className="copyright">
        <p>All rights reserved © 2024</p>
      </div>
    </div>
  );
};

export default Footer;
