import "./HeroImgStyles.css";
import React from 'react'
import IntroImg from "../assets/5.png"
import { Link } from "react-router-dom";

const HeroImg = () => {
  return (
    <div className="hero">
      <div className="mask">
<img className="into-img" src={IntroImg} alt="IntroImg"/>
      </div>
      <div className="con">
<h1>Your road to tech excellence</h1>
<p>Welcome to our IT student portfolio! Dive into a world of innovation and expertise
</p>
<Link to="/Login" className="btn">Login</Link>
<Link to="/Contact" className="btn btn-light">Contact</Link>
      </div>
    </div>
  )
}

export default HeroImg
