import { Link } from "react-router-dom"
import "./NavbarStyles.css"
import React,{useState} from 'react'

const Navbar = () => {
  const [color,setColor]=useState(false);
  const changeColor=()=>{
    if(window.scrollY>=100)
   {setColor(true);}
  else
  {setColor(false);
  }
  
  };

  window.addEventListener("scroll",changeColor);
  return (
    <div className={ color? "header header-bg": "header"}>
      <Link to={"/"}>
      <h1>ITfolio</h1>
      </Link>
      <ul className="nav-menu">
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/Contact">Contact</Link>
        </li>
        <li>
            <Link to="/Login">Login</Link>
        </li>
        <li>
            <Link to="/About">About Us</Link>
        </li>
      </ul>
      
    </div>
  )
  }
export default Navbar
