import React ,{useState} from 'react';
import './SignUpForm.css';
import '../routes/SignUp.js';
import {FaUser,FaLock} from "react-icons/fa";
import { Link } from 'react-router-dom';


const LoginForm = () => {
        const [selectedValue, setSelectedValue] = useState('');
      
       
        const handleDropdownChange = (event) => {
          setSelectedValue(event.target.value);
        };
  return (
    <div className="body">
        
        <div className="wrapper">
    <form action="">
      <h1>SignUp</h1>  
      <div className="input-box">
        <input type="email" placeholder="Email" required />
        <i className='bx bxs-alt-email' ></i>
      </div>

      <div className="input-box">
        <input type="text" placeholder="Username" required />
        <i className='bx bxs-alt' ></i>
      </div>
    
      <div className="input-box">
        <input type="password" placeholder="Password" required />
        <i className='bx bxs-lock-alt' ></i>
      </div>

      <div className="dropdown">
      <label htmlFor="myDropdown">Select your Major:</label>
      <select id="myDropdown" value={selectedValue} onChange={handleDropdownChange}>
        <option value="">Choose an option</option>
        <option value="option1">CS</option>
        <option value="option2">CIS</option>
        <option value="option3">BIT</option>
      </select>
       <i className='bx bxs-lock-alt' ></i>
      </div>

      <button type="submit" className="btn">SignUp</button>
      <div className="register-link">
        <p>Already have an account? <Link to='/Login'>Login</Link></p>
      </div>
    </form>
  </div>
  
    </div>
  )
}

export default LoginForm
