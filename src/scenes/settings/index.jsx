import React, { useState } from "react";
import Header from "../../components/Header";
import "./settings.css";
import Sidebar from '../global/Sidebar.jsx';
import Topbar from '../global/Topbar.jsx';


const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordReset = () => {
    if (currentPassword === "" || newPassword === "" || confirmNewPassword === "") {
      setMessage("Please fill in all fields.");
    } else if (newPassword !== confirmNewPassword) {
      setMessage("New password and confirm password do not match.");
    } else {
      // Here you would implement the logic to reset the password
      setMessage("Password reset successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    }
  };

  return ( 
    <div className="view"  display="flex" >
  <Sidebar />
    <Topbar />
    <div className="settings-container">
    <h2 className="settings-title">password</h2>
      <div className="form-group">
        <label htmlFor="current-password" className="label-black">Current Password:</label>
        <input
          type="password"
          className="form-control"
          id="current-password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
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
      <button onClick={handlePasswordReset} className="btn-reset">Reset Password</button>
      {message && <p className="message">{message}</p>}
    </div>
    </div>
    
  );
};

export default Settings;
