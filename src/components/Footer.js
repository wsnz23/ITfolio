import "./FooterStyles.css"

import React from 'react'
import {FaPhone,FaMailBulk, FaLinkedin ,FaFacebook,FaTwitter} from "react-icons/fa";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
<div className="left">
    <div className="phone">
      <h4>  <FaPhone size={20} style={{color:"#000",marginRight:"2rem"}}/>
      +962 --- --- --- </h4> 
      </div>

      <div className="email">
      <h4>  <FaMailBulk size={20} style={{color:"#000",marginRight:"2rem"}}/>
      info@ju.edu.jo </h4> 
      </div>
      
</div>






<div className="right">
<h4>About the website</h4>
<p>This is Wasan Subaihi , Lara Al-Qaisi , Shadan Ekedat
    and Hamza Al-Manaseer the developers of this website let us know if you have any recommendations.
</p>

<div className="social">
       <FaFacebook size={30} style={{color:"#000",marginRight:"1rem"}}/>
     

     
      <FaTwitter size={30} style={{color:"#000",marginRight:"1rem"}}/>
    

      
       <FaLinkedin size={30} style={{color:"#000",marginRight:"1rem"}}/>
     
   
 </div>
</div>

      </div>

    </div>
  )
}

export default Footer
