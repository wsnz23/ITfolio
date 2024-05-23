import React, { useState, useEffect } from 'react';
import './SignUpForm.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

const SignUpForm = () => {
  const [users, setUsers] = useState([]);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [username, setUsername] = useState("");
  const [major, setMajor] = useState("");
  const [fn, setFn] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const navigate = useNavigate();

  const handleDropdownChange = (event) => {
    setMajor(event.target.value);
  };

  const createUser = (e) => {
    e.preventDefault();

    const isUsernameUsed = users.some(user => user.Username === username);
    const isEmailUsed = users.some(user => user.Email === email);

    if (isUsernameUsed && isEmailUsed) {
      setStatusMessage("Both username and email are already used. Please use different ones.");
      return;
    } else if (isUsernameUsed) {
      setStatusMessage("Username is already used. Please use a different username.");
      return;
    } else if (isEmailUsed) {
      setStatusMessage("Email is already used. Please use a different email.");
      return;
    }

    Axios.post("http://localhost:3001/createusers", {
      FullName: fn,
      Email: email,
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
    Axios.get("http://localhost:3001/getuser")
      .then(res => {
        setUsers(res.data);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div className="body">
      <div className="wrapper">
        <form action="">
          <h1>SignUp</h1>
          <div className="input-box">
            <input type="text" placeholder="Full Name" onChange={e => setFn(e.target.value)} required />
            <i className='bx bxs-alt'></i>
          </div>

          <div className="input-box">
            <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
            <i className='bx bxs-alt-email'></i>
          </div>

          <div className="input-box">
            <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} required />
            <i className='bx bxs-alt'></i>
          </div>

          <div className="input-box">
            <input type="password" placeholder="Password" onChange={e => setPass(e.target.value)} required />
            <i className='bx bxs-lock-alt'></i>
          </div>

          <div className="dropdown">
            <label htmlFor="myDropdown" className='label-signup'>Select your Major:</label>
            <select id="myDropdown" onChange={handleDropdownChange}>
              <option value="">Choose an option</option>
              <option value="CS">CS</option>
              <option value="CIS">CIS</option>
              <option value="BIT">BIT</option>
            </select>
            <i className='bx bxs-lock-alt'></i>
          </div>

          <button type="submit" className="btn" onClick={createUser}>SignUp</button>
          <div className="register-link">
            <p>Already have an account? <Link to='/Login'>Login</Link></p>
          </div>
          {statusMessage && <p>{statusMessage}</p>}
        </form>
      </div>
    </div>
  )
}

export default SignUpForm;
