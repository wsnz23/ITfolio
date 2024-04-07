import "./Cards.css";
import Cards from "./Cards";
import WorkCardData from "./WorkCardData";
import React from 'react'

const Work = () => {
  return (
    <div className="worrk-container">
    <h1 className="project-heading">Services</h1>  
    <div className="project-container">
      {WorkCardData.map((val,ind)=>{
        return(
<Cards
key={ind}
imgsrc={val.imgsrc}
title={val.title}
text={val.text}


/>
      );
      })}
    </div>
    </div>
  )
}

export default Work
