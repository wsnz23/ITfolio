import React from 'react'
import './ContactForm.css';

import {FaPaperPlane} from "react-icons/fa";
const ContactForm = () => {
  return (
<div className="body">
        
        <div className="wrapper">
    <form action="">
      <h1>Contact Us</h1>
      <div className="input-box">
        <input type="text" placeholder="Enter Your Name" required/>
        <i className='bx bxs-user'></i>
      </div>
      <div className="input-box">
        <input type="email" placeholder="Enter Your Email" required />
        <i className='bx bxs-lock-alt' ></i>
      </div>
      < div className="input-con">
      <textarea name="message" placeholder="Your Message" required />
      <i className='bx bxs-message' ></i>
      </div>
      <button type="submit" class="bt"><span className='s'>SEND </span><FaPaperPlane size={15} style={{color:"#000",marginRight:"1rem"}}/></button>
      
    </form>
  </div>
  
    </div>
  )
}

export default ContactForm
