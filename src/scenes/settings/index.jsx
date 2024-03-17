import React, { useState } from "react";

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
    <div>
      <h2>Settings</h2>
      <div>
        <label htmlFor="current-password">Current Password:</label>
        <input
          type="password"
          id="current-password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="new-password">New Password:</label>
        <input
          type="password"
          id="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="confirm-new-password">Confirm New Password:</label>
        <input
          type="password"
          id="confirm-new-password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </div>
      <button onClick={handlePasswordReset}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Settings;
