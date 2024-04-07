import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ResetPassword.jsx';

const SendVerificationCode = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the verification code to the user's email or phone number
    // You can implement this using your backend logic or an external service
    // If successful, navigate the user to the next step (e.g., VerifyCodePage)
    // Otherwise, display an error message
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center" style={ {padding: '8px',marginLeft:'25px',color:'white'}}>Verification Code</h2>
              <br/>
              <form onSubmit={handleSubmit}>
                <div className="text-center mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter Verification Code" 
                    value={verificationCode} 
                    onChange={(e) => setVerificationCode(e.target.value)} 
                    required 
                  />
                </div>
                <br/>
                <div className="text-center">
                <Link to='/ResetPassword'><button type="submit" className="btn btn-primary" style={{ fontSize: '14px', padding: '6px 12px' ,marginLeft:'75px',color:'white' }}>Submit</button>
                </Link>  </div>
              </form>
              {error && <p className="text-danger mt-3">{error}</p>}
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

export default SendVerificationCode;
