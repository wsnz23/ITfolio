import React ,{useState} from 'react';
import './LoginForm.css';
import '../routes/SignUp.js';
import './forgetpass.jsx';
 // eslint-disable-next-line
import {FaUser,FaLock} from "react-icons/fa";
import { Link , useNavigate} from 'react-router-dom';
import Dashboard from '../scenes/dashbord/index.jsx';
import Axios from "axios";

const LoginForm = () => {
 
  const[pass,setPass]=useState("");
  const[username,setUsername]=useState("");
  

  const navigate=useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
        username,
        pass,
    })
    .then(result => {
        console.log(result);
        if (result.data.status === "ok") {
            localStorage.setItem('token', result.data.data);
            navigate('/Dashboard');
        }
    })
    .catch(error => {
        console.error("Error creating user:", error);
    });
}

  return (
    <div className="body">
        
        <div className="wrapper">
    <form action="">
      <h1>Login</h1>
      <div className="input-box">
        <input type="text" placeholder="Username"  onChange={e=>setUsername(e.target.value)} required/>
        <i className='bx bxs-user'></i>
      </div>
      <div className="input-box">
        <input type="password" placeholder="Password" onChange={e=>setPass(e.target.value)} required />
        <i className='bx bxs-lock-alt' ></i>
      </div>
      <div className="remember-forgot">
        <Link to='/forgetpass'>Forget Password?</Link>
      </div>
      
            <button type="submit" className="btn" onClick={loginUser}> 
              Login
            </button>
          
      <div className="register-link">
        <p>Don't have an account? <Link to='/SignUp'>Register</Link></p>
      </div>
    </form>
  </div>
  
    </div>
  )
}

export default LoginForm