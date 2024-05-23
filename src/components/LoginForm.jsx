import React, { useState } from 'react';
import './LoginForm.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

const LoginForm = () => {
  const [pass, setPass] = useState("");
  const [username, setUsername] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const userResponse = await Axios.get("http://localhost:3001/getuser");
      const users = userResponse.data; // Access the data property of the response
      const usernames = users.map(user => user.Username); // Extract usernames

      // Check if the username exists in the list
      if (!usernames.includes(username)) {
        setStatusMessage("Incorrect username or password. Try again.");
        return;
      }

      const result = await Axios.post("http://localhost:3001/login", {
        username,
        pass,
      });

      console.log(result);

      if (result.data.status === "ok") {
        localStorage.setItem('token', result.data.data);

        const token = localStorage.getItem('token');
        const response = await Axios.post("http://localhost:3001/userdata", { token });
        const usercase = response.data.data.case;
        const userstatus = response.data.data.status;

        if (userstatus === "inactive") {
          setStatusMessage("Your account is deactivated. Please contact support for assistance.");
        } else if (usercase === "student") {
          navigate('/Dashboard');
        } else {
          navigate('/Admin');
        }
      } else {
        setStatusMessage("Incorrect username or password. Try again.");
      }

    } catch (error) {
      console.error("Error logging in:", error);
      setStatusMessage("Username invalid.");
    }
  }

  return (
    <div className="body">
      <div className="wrapper">
        <form action="">
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} required />
            <i className='bx bxs-user'></i>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" onChange={e => setPass(e.target.value)} required />
            <i className='bx bxs-lock-alt' ></i>
          </div>
          <div className="remember-forgot">
            <Link to='/forgetpass'>Forget Password?</Link>
          </div>

          <button type="submit" className="btn" onClick={loginUser}>
            Login
          </button>

          <br />
          <br />
          {statusMessage && <p>{statusMessage}</p>}
          <div className="register-link">
            <p>Don't have an account? <Link to='/SignUp'>Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
