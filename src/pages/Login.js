import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 
import GoogleAuthComponent from './Signup-google';
import { useTranslation } from 'react-i18next';
import './login.css';

const Login = ({ handleLogin}) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const [alertMessage, setAlertMessage] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  useEffect(() => {
    // Retrieve the alert message from local storage
    const storedAlertMessage = localStorage.getItem('alertMessage');
    if (storedAlertMessage) {
      setAlertMessage(storedAlertMessage);
      // Clear the alert message from local storage after displaying it
      localStorage.removeItem('alertMessage');
      
      // Set a timer to clear the alert message after 5 seconds
      const timer = setTimeout(() => {
        setAlertMessage('');
      }, 5000);

      // Clean up the timer when the component unmounts
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (error) {
      setError(error); 
      const timer = setTimeout(() => {
        setError('');
      }, 5000);
      return () => clearTimeout(timer);  
    }  

  }, [error]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleLogin(formData);
    if (result === true) {
      const isVerified = localStorage.getItem('isVerified') === 'true';
      if (isVerified) {
        navigate('/dashboard');
      } else {
        navigate('/verify-email');
      }

    } else if (result === 'email-not-match') {
      setError(t('login_page.email_mismatch_error'));
      setTimeout(() => {
        navigate('/signup');
      }, 3000);
    } else if (result === 'wrong-password') {
      setError(t('login_page.wrong_password_error'));
    } else if (result === 'invalid') {
      setError(t('login_page.google_signin_error'));
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center login min-vh-100">
      <div className="col-md-6">
        <h1 className="mb-4 text-center">{t('login_page.title')}</h1>
        {alertMessage && (
        <div className="alert alert-warning" role="alert">
          {alertMessage}
        </div>
      )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">{t('login_page.email_label')}</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 position-relative">
      <label htmlFor="password" className="form-label">{t('login_page.password_label')}</label>
      <input
        type={showPassword ? 'text' : 'password'}
        className="form-control password-input"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="password-toggle2"
      >
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
      </button>
    </div>
          <button type="submit" className="btn btn-primary w-100">{t('login_page.login_button')}</button>
        </form>
        {error && <div className="alert alert-danger mt-4">{error}</div>}
        <div className="mt-4 text-center">
          <p className="text-muted">
            {t('login_page.no_account_text')} <Link to="/signup">{t('login_page.signup_link')}</Link>
          </p>
          <p className="text-muted">
          <Link to="/forget-password">{t('login_page.forgot_password_link')}</Link>
          </p>
          <p className="text-muted mt-3">{t('login_page.or_text')}</p>
          {/* Google Sign-In Button */}
          <GoogleAuthComponent />
        </div>
      </div>
    </div>
  );
};

export default Login;
