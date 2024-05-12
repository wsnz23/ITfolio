import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios'; // Import Axios
import { styled } from '@mui/material/styles';
const CustomButton = styled(Button)({
  borderRadius: 20,
  width: '20%',
  marginTop: 10,
  marginLeft: 200,
  backgroundColor: '#1f2a40',
  color: 'white',
  '&:hover': {
    backgroundColor: '#1b6698',
    color: 'black',
  },
});

const ForgetPass = () => {
  const [email, setEmail] = useState('');

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    console.log(email);
    
    // Use Axios to make the POST request
    axios.post("http://localhost:3001/forget-password", { email })
      .then((response) => {
        console.log(response.data, "userRegister");
        alert(response.data.status);
       
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to send password reset email');
      }); setEmail('');
  };

  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
    style={{ backgroundImage: "url('background.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#141b2d', color: 'white' }}
  >
    <Container maxWidth="sm">
      <Box
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          padding: 20,
          borderRadius: 10,
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
        
        }}
      >
        <Typography variant="h3" align="center" style={{ color: '#ffffff' }} marginLeft='10px' gutterBottom>
          ITFolio - Forget Password
        </Typography>
  <br></br>
        <form onSubmit={handleSubmitEmail}>
        <input
  type="email"
  placeholder="Enter your gmail"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  style={{
    color: 'black',
    borderRadius: 30,
    background: 'white',
    height: 37,
    width: '70%',
    padding: '10px',
    border: '1px solid gray',
    marginLeft:'80px'
  }}
/>


  
  <CustomButton type="submit" variant="contained" color="primary">
  Send
</CustomButton>
        </form>
      </Box>
    </Container>
  </Box>
  
  );
};

export default ForgetPass;
