import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../App';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/forgot-password`, { email });
      
      if (response.data.message === 'Reset link sent to your email.') {
        setMessage('Reset Link Successfully sent. Please check your email.');
      } else if (response.data.message === 'User with this email does not exist.') {
        setMessage('Email not found in our records. Please try signing up.');
        setTimeout(() => {
          navigate('/signup'); // Redirect to signup page
        }, 3000); 
      }
  
    } catch (error) {
      setMessage('Error processing request. Please try again.');
    }
  };
  

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
     <div className="col-md-6">
      <h2 className="mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
      <label htmlFor="email" className="form-label">Email address</label>
        <input 
          type="email" 
          className="form-control"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
     </div>
        <button type="submit" className="btn btn-primary w-100">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
