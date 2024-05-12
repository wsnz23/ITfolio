import React ,{useState,useEffect} from 'react';
import './SignUpForm.css';
import Login from './LoginForm';
import '../routes/SignUp.js';
// import {FaUser,FaLock} from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Axios from "axios";

const LoginForm = () => {
        const [selectedValue, setSelectedValue] = useState('');
        const[users,setUsers]=useState([]);

        const[email,setEmail]=useState("");
        const[pass,setPass]=useState("");
        const[username,setUsername]=useState("");
        const[major,setMajor]=useState("");
        const[fn,setFn]=useState("");

        const navigate=useNavigate();

        const handleDropdownChange = (event) => {
          setMajor(event.target.value);
        };

        const createUser = (e) => {
          e.preventDefault()
          Axios.post("http://localhost:3001/createusers", {
                FullName: fn,
                Email:email,
            Username: username,
            Password: pass,
            Major: major, 
          })
          .then(res => {
              console.log(res.data);
              navigate('/Login'); 
          })
          .catch(error => {
              console.error("Error creating user:", error);
          });
      }
      
      useEffect(() => {
        Axios.get("http://localhost:3001/users")
        .then(res => {
            setUsers(res.data);
        })
        .catch(error => {
            console.error("Error fetching users:", error);
        });
    }, [users]);
    


  return (
    <div className="body">
        
        <div className="wrapper">
    <form action="">
      <h1>SignUp</h1>  
      <div className="input-box">
        <input type="text" placeholder="Full Name" onChange={e=>setFn(e.target.value)} required />
        <i className='bx bxs-alt' ></i>
      </div>

      <div className="input-box">
        <input type="email" placeholder="Email" onChange={e=>setEmail(e.target.value)} required />
        <i className='bx bxs-alt-email' ></i>
      </div>

      <div className="input-box">
        <input type="text" placeholder="Username" onChange={e=>setUsername(e.target.value)} required />
        <i className='bx bxs-alt' ></i>
      </div>
    
      <div className="input-box">
        <input type="password" placeholder="Password" onChange={e=>setPass(e.target.value)} required />
        <i className='bx bxs-lock-alt' ></i>
      </div>

      <div className="dropdown">
      <label htmlFor="myDropdown" className='label-signup'>Select your Major:</label>
      <select id="myDropdown"  onChange={handleDropdownChange}>
  <option value="">Choose an option</option>
  <option value="CS">CS</option>
  <option value="CIS">CIS</option>
  <option value="BIT">BIT</option>
</select>

       <i className='bx bxs-lock-alt' ></i>
      </div>

      <button type="submit" className="btn" onClick={createUser}>SignUp</button>
      <div className="register-link">
        <p>Already have an account? <Link to='/Login'>Login</Link></p>
      </div>
    </form>
  </div>
  
    </div>
  )
}

export default LoginForm
