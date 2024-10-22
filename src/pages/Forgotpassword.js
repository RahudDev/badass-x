import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../App';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [countdown, setCountdown] = useState(15);
  const [canResend, setCanResend] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();

  const sendResetEmail = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/forgot-password`, { email });
      setAlertType('');
  
      if (response.data.message === 'Reset link sent to your email.') {
        setAlertMessage(t('forget_page.alert_check_email'));
        setAlertType('success');
        setShowForm(false); // Hide the form
        setCountdown(15); // Start the countdown
        setCanResend(false); // Initially don't show the resend link
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message;
        setMessage(errorMessage);
  
        if (errorMessage === 'User exists but signed up with Google.') {
          setAlertMessage(t('forget_page.alert_google_account'));
          setAlertType('warning');
          setTimeout(() => {
            navigate('/login'); // Redirect to Google login page
          }, 3000);
        } else if (errorMessage === 'User with this email does not exist.') {
          setAlertMessage(t('forget_page.alert_email_not_found'));
          setAlertType('danger');
          setTimeout(() => {
            navigate('/signup'); // Redirect to signup page
          }, 3000);
        }
      } else {
        setAlertMessage(t('forget_page.alert_error_processing'));
      }
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendResetEmail();
  };

  useEffect(() => {
    let timer;
    if (!showForm && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }

    return () => clearTimeout(timer);
  }, [countdown, showForm]);

  const handleResendLink = async (e) => {
    e.preventDefault();
    setMessage('');
    await sendResetEmail();
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="col-md-6">
        <h1 className="mb-4 text-center">
          {showForm ? t('forget_page.forgot_password') : t('forget_page.email_sent_message')}
        </h1>
        {!showForm && (
          <div className="text-start mb-3">
            <button 
              className="btn btn-link p-0 text-decoration-none" 
              onClick={() => navigate('/login')}
              style={{ color: 'black', opacity: 0.5 }}
            >
              <FaArrowLeft /> Back to Login
            </button>
          </div>
        )}
        {showForm ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="form-label">{t('forget_page.email_label')}</label>
              <input 
                type="email" 
                placeholder={t('forget_page.email_placeholder')} 
                className="form-control"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">{t('forget_page.send_reset_link_button')}</button>
            {alertMessage && (
        <Alert color={alertType} className="mt-3">
          {alertMessage}
        </Alert>
      )}
          </form>
          
          
        ) : (
          <p className='p-1 text-center'>{message} {countdown > 0 ? `You can resend the link in ${countdown} seconds.` : (
            <span>Haven't received the reset link yet? <a href="#/" onClick={handleResendLink}>Please send it again.</a></span>
          )}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
