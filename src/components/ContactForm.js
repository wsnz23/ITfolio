// ContactForm.js

import React, { useState } from 'react';
import axios from 'axios';
import './ContactForm.css';
import { FaPaperPlane } from 'react-icons/fa';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { name, email, message } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("access_key", "4c23cc50-0e9e-4f01-ae58-7b71f5273b45");
  
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
  
    try {
      await axios.post('http://localhost:3001/api/contact', object);
      alert('Message sent successfully');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message');
    }
  
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
      if (res.ok) {
        const data = await res.json();
        console.log("Success", data);
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="body">
      <div className="wrapper">
        <form onSubmit={onSubmit}>
          <h1>Contact Us</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Enter Your Name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="input-con">
            <textarea
              name="message"
              placeholder="Your Message"
              value={message}
              onChange={onChange}
              required
            />
            <i className="bx bxs-message"></i>
          </div>
          <button type="submit" className="bt">
            <span className="s">SEND </span>
            <FaPaperPlane
              size={15}
              style={{ color: '#000', marginRight: '1rem' }}
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
