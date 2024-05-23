import "./FooterStyles.css"

import React from 'react'
import { FaPhone, FaMailBulk, FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="left">
          <div className="email">
            <h4><FaMailBulk size={20} style={{ color: "#000", marginRight: "2rem" }} /> itfolio.ask@gmail.com </h4>
          </div>
        </div>
        <div className="right">
          <h4>About the web Application</h4>
          <p className="footerp">Thanks for visiting! This web application was created by Wasan Subaihi, Lara Al-Qaisi, Shadan Ekedat, and Hamza Al-Manaseer. We're always open to hear your ideas , recommendations ,  thoughts or suggestions with us for making it even better.</p>
          <div className="social">
            <FaFacebook size={30} style={{ color: "#000", marginRight: "1rem" }} />
            <FaTwitter size={30} style={{ color: "#000", marginRight: "1rem" }} />
            <FaLinkedin size={30} style={{ color: "#000", marginRight: "1rem" }} />
          </div>
        </div>
      </div>

      {/* Copyright text */}
      <div className="copyright">
        <p>All rights reserved © 2024</p>
      </div>
    </div>
  )
}

export default Footer
