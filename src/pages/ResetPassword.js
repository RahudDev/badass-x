import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 
import './resetpassword.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_URL } from '../App';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isResetSuccessful, setIsResetSuccessful] = useState(false);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);

  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/reset-password`, { params: { token } });
        if (response.data.success) {
          setIsTokenValid(true);
        } else if (response.data.success && response.data.message === 'Password has already been reset. Redirecting to login...') {
          setMessage('Password has already been reset. Redirecting to login page...');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          setIsTokenExpired(true);
          setMessage('The reset token has expired. Please request a new password reset.');
        }
      } catch (error) {
        setIsTokenExpired(true);
        setMessage('Invalid or expired token. Please request a new password reset.');
      }
    };
    
    validateToken();
  }, [token, navigate]);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("Password must be at least 8 characters long.");
    if (!/[A-Z]/.test(password)) errors.push("Password must contain at least one uppercase letter.");
    if (!/[a-z]/.test(password)) errors.push("Password must contain at least one lowercase letter.");
    if (!/[0-9]/.test(password)) errors.push("Password must contain at least one digit.");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push("Password must contain at least one special character.");
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validatePassword(password);
    setPasswordErrors(errors);
    
    if (errors.length > 0) {
      setMessage('Please fix the errors in your password.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/reset-password`, { token, password });
      if (response.data.success) {
        if (response.data.message === 'Password has been reset successfully.') {
          setIsResetSuccessful(true);
          setMessage('Password reset successfully. Redirecting to login...');
          setTimeout(() => {
            navigate('/login'); // Redirect to login page
          }, 3000); // Redirect after 3 seconds
        } else {
          setMessage(response.data.message || 'Password reset successful but no specific message.');
        }
      } else if (response.data.error === 'Token expired') {
        setIsTokenExpired(true);
        setMessage('The reset token has expired. Please request a new password reset.');
      } else {
        setMessage(response.data.message || 'Error resetting password. Please try again.');
      }
    } catch (error) {
      setMessage('Error resetting password. Please try again.');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="col-md-6">
        <h1 className="mb-4">Reset Password</h1>
        {!isResetSuccessful && !isTokenExpired && isTokenValid && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4 position-relative">
              <label htmlFor="password" className="form-label">Set your new Password</label>
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="New password" 
                className="form-control"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            <div className="mb-4">
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Confirm new password" 
                className="form-control"
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary w-100"
              disabled={isResetSuccessful}
            >
              Reset Password
            </button>
          </form>
        )}
        {message && <p>{message}</p>}
        {passwordErrors.length > 0 && (
                <ul className="text-danger">
                  {passwordErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
      </div>
    </div>
  );
};

export default ResetPassword;
