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
  const [statusMessage, setStatusMessage] = useState("");

  const navigate=useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
        username,
        pass,
    })
    .then(async (result) => { // Add async here
        console.log(result);
        if (result.data.status === "ok") {
            localStorage.setItem('token', result.data.data);
        }
        try {
          const token = localStorage.getItem('token');
          const response = await Axios.post("http://localhost:3001/userdata", { token });
          const usercase = response.data.data.case;
          const userstatus = response.data.data.status; // Add this line to get user status
         
          if (userstatus === "inactive") { // Check if user status is inactive
            setStatusMessage("Your account is deactivated. Please contact support for assistance.");
          } else if (usercase === "student") {
            navigate('/Dashboard');
          } else {
            navigate('/Admin');
          }

        } catch (error) {
          console.error("Error fetching user data:", error);
        }
        
    })
    .catch(error => {
        console.error("Error logging in:", error);
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

           <br></br>
           <br></br>
            {statusMessage && <p>{statusMessage}</p>}
      <div className="register-link">
        <p>Don't have an account? <Link to='/SignUp'>Register</Link></p>
      </div>
    </form>
  </div>
  
    </div>
  )
}

export default LoginForm