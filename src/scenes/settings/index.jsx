import React, { useState, useEffect } from "react";
import "./settings.css";
import Sidebar from '../global/Sidebar.jsx';
import Topbar from '../global/Topbar.jsx';
import axios from 'axios';

const Settings = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState(""); // State to store the username

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      console.log(token); // Log the token to check if it's correct
  
      try {
        // Fetch user data using the token
        const response = await axios.post("http://localhost:3001/userdata", { token });
        const userName = response.data.data.Username;
        if (token) {
          setUsername(userName);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchData(); // Call the fetchData function immediately
  
  }, []);

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long.";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!hasNumbers) {
      return "Password must contain at least one number.";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character.";
    }

    return "";
  };

  const handlePasswordReset = async () => {
    const token = localStorage.getItem('token');
  
    if (newPassword === "" || confirmNewPassword === "") {
      setMessage("Please fill in all fields.");
    } else if (newPassword !== confirmNewPassword) {
      setMessage("New password and confirm password do not match.");
    } else {
      const passwordValidationMessage = validatePassword(newPassword);
      if (passwordValidationMessage) {
        setMessage(passwordValidationMessage);
        return;
      }

      try {
        // Make a PUT request to update the user's password
        const response = await axios.put(`http://localhost:3001/updateusers/${username}`, {
          Password: newPassword // Send new password in the request body
        }, {
          headers: {
            Authorization: `Bearer ${token}`, // Assuming you need to send the token in the headers
          }
        });
        setMessage(response.data.status); // Display success message
        setNewPassword("");
        setConfirmNewPassword("");
      } catch (error) {
        setMessage("An error occurred. Please try again."); // Display error message
        console.error("Error:", error);
      }
    }
  };

  return ( 
    <div className="view" display="flex">
      <Sidebar />
      <Topbar />
      <div className="settings-container">
        <h2 className="settings-title">Change Password</h2>
      
        <div className="form-group">
          <label htmlFor="new-password" className="label-black">New Password:</label>
          <input
            type="password"
            className="form-control"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-new-password" className="label-black">Confirm New Password:</label>
          <input
            type="password"
            className="form-control"
            id="confirm-new-password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
        <button onClick={handlePasswordReset} className="btn-reset">Change Password</button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Settings;
