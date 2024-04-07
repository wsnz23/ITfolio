import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation logic here to ensure newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Here you would send the new password to your backend to complete the password reset process
    // If successful, you can navigate the user to the login page or any other appropriate page
    // Otherwise, display an error message
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <Typography variant="h4" align="center" color="white" gutterBottom>
                ITfolio - Reset Password
              </Typography>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Enter New Password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    required 
                    style={{ marginBottom: '10px' }} // Added margin bottom to create space between input boxes
                  />
                </div>
                <div className="mb-3">
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Confirm New Password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                    style={{ marginBottom: '10px' }} // Added margin bottom to create space between input boxes
                  />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <br></br>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary" style={{ fontSize: '14px', padding: '6px 12px' ,marginLeft:'45px',color:'white' }}>Reset Password</button>
                </div>
              </form>
              <div className="text-center mt-3">
                <p>Remember your password? <Link to='/login'>Login</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
