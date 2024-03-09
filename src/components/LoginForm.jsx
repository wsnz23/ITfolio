import React from 'react';
import './LoginForm.css';
import '../routes/SignUp.js';
 // eslint-disable-next-line
import {FaUser,FaLock} from "react-icons/fa";
import { Link } from 'react-router-dom';
import Dashboard from '../scenes/dashbord/index.jsx';

const LoginForm = () => {
  return (
    <div className="body">
        
        <div className="wrapper">
    <form action="">
      <h1>Login</h1>
      <div className="input-box">
        <input type="text" placeholder="Username" required/>
        <i className='bx bxs-user'></i>
      </div>
      <div className="input-box">
        <input type="password" placeholder="Password" required />
        <i className='bx bxs-lock-alt' ></i>
      </div>
      <div className="remember-forgot">
        <label><input type="checkbox"/>Remember Me</label>
        <Link href="#">Forgot Password</Link>
      </div>
      <Link to="/Dashboard">
            <button type="submit" className="btn">
              Login
            </button>
          </Link>
      <div className="register-link">
        <p>Don't have an account? <Link to='/SignUp'>Register</Link></p>
      </div>
    </form>
  </div>
  
    </div>
  )
}

export default LoginForm
