import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
import './signup.css';
import GoogleAuthComponent from './Signup-google';

const SignUp = ({ handleSignUp }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!regex.test(password)) {
      setPasswordError(
        t('signup_page.setPasswordError')
      );
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordError) {
      setError(t('signup_page.setError1'));
      return;
    }
    const result = await handleSignUp(formData);
    if (result === 'exists') {
      navigate('/login');
    } else if (result === true) {
      navigate('/verify-email');
    } else {
      setError(t('signup_page.setError2'));
    }
  };

  return (
    <div className="container sign-up d-flex align-items-center justify-content-center min-vh-100">
      <div className="col-md-6">
        <h1 className="mb-4 text-center">{t('signup_page.title')}</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">{t('signup_page.name_label')}</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">{t('signup_page.email_label')}</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label">{t('signup_page.password_label')}</label>
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
              className="password-toggle3"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          <button type="submit" className="btn btn-primary w-100">{t('signup_page.signup_button')}</button>
        </form>
        {passwordError && (
              <small className="text-danger">{passwordError}</small>
            )}
        <div className="mt-4 text-center">
          <p className="text-muted mt-3">{t('signup_page.already_have_account')} <Link to="/login">{t('signup_page.login_link')}</Link></p>
          <p className="text-muted mt-3">{t('signup_page.or_text')}</p>
          <GoogleAuthComponent />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
