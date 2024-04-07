import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import SendVerificationCode from './SendVerificationCode.jsx'; // Import SendVerificationCode component

const ForgetPass = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter verification code, Step 3: Enter new password

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    // Code to send email with verification code
    setStep(2);
  };

  const handleSubmitVerificationCode = (e) => {
    e.preventDefault();
    // Code to verify the verification code
    setStep(3);
  };

  const handleSubmitNewPassword = (e) => {
    e.preventDefault();
    // Code to update the password
    alert('Password changed successfully!');
  };

  return (
    <Container maxWidth="md">
      <div style={{ marginTop: '50px' ,color:'white'}}>
        <Typography variant="h4" align="center" color="white" gutterBottom >
          ITFolio - Forget Password
        </Typography>
        {step === 1 && (
          <form onSubmit={handleSubmitEmail}>
            <TextField
              type="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Send Verification Code
            </Button>
          </form>
        )}
        {step === 2 && <SendVerificationCode />} {/* Render SendVerificationCode component */}
        {step === 3 && (
          <form onSubmit={handleSubmitNewPassword}>
            <TextField
              type="password"
              label="New Password"
              variant="outlined"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Change Password
            </Button>
          </form>
        )}
      </div>
    </Container>
  );
};

export default ForgetPass;
