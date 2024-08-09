import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Tasks from './pages/Tasks';
import TaskDetail from './pages/TaskDetail';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import SurveyTasks from './pages/SurveyTasks';
import CpxResearch from './pages/CpxResearch';
import Cpalead from './pages/Cpalead';
import Bitlabs from './pages/Bitlabs';
import PollfishSurvey from './pages/PollfishSurvey';
import VerifyEmail from './pages/verify-email';
import MainPage from './pages/MainPage';
import RedeemPage from './pages/RedeemPoints';
import LineChart from './pages/linechart';
import ChatPanel from './chatroom';
import Config from './config';
import UserReviews from './pages/UserReviews';
import EmailVerificationSuccess from './pages/EmailVerificationSuccess';
import ForgotPassword from './pages/Forgotpassword';
import ResetPassword from './pages/ResetPassword';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL_MAIN  } from './config';

export const API_URL = API_URL_MAIN;

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(localStorage.getItem('isVerified') === 'true');
  const [isChatOpen, setChatOpen] = useState(false);


  const toggleChat = () => {
    console.log('Toggle chat function called'); // Debug log
    setChatOpen(!isChatOpen);
  };

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    const uuid = localStorage.getItem('uuid');
    if (token && uuid) {
      try {
        const response = await axios.get(`${API_URL}/api/verify-token`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.valid) {
          setAuthenticated(true);
          setIsVerified(response.data.isVerified);
          localStorage.setItem('isVerified', response.data.isVerified);
        } else {
          setAuthenticated(false);
          setIsVerified(false);
          localStorage.setItem('isVerified', false);
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        setAuthenticated(false);
        setIsVerified(false);
        localStorage.setItem('isVerified', false);
      }
    } else {
      setAuthenticated(false);
      setIsVerified(false);
      localStorage.setItem('isVerified', false);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleSignUp = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/api/signup`, formData);
      if (response.status === 201) {
        const loginResponse = await axios.post(`${API_URL}/api/login`, {
          email: formData.email,
          password: formData.password
        });
        if (loginResponse.data.token) {
          localStorage.setItem('name', loginResponse.data.name);
          localStorage.setItem('token', loginResponse.data.token);
          localStorage.setItem('uuid', loginResponse.data.uuid);
          localStorage.setItem('isVerified', loginResponse.data.isVerified);
          localStorage.setItem('email', loginResponse.data.email);
          localStorage.setItem('points', loginResponse.data.points);
          setAuthenticated(true);
          setIsVerified(loginResponse.data.isVerified);
          return true;
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.error === 'User already exists') {
        return 'exists';
      }
      console.error('Error signing up:', error);
      alert('Error signing up');
      return false;
    }
  };

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/api/login`, formData);
      if (response.data.token) {
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('uuid', response.data.uuid);
        localStorage.setItem('isVerified', response.data.isVerified);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('points', response.data.points);
        setAuthenticated(true);
        setIsVerified(response.data.isVerified);
        return true;
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (error.response.data.error === 'Email not match with your profile') {
          alert('Email not match with your profile');
          return 'email-not-match';
        } else if (error.response.data.error === 'Wrong password') {
          alert('Wrong password');
          return 'wrong-password';
        } else {
          alert('Invalid email and password');
          return 'invalid';
        }
      }
      console.error('Error logging in:', error);
      alert('Error logging in');
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    localStorage.removeItem('uuid');
    localStorage.removeItem('isVerified');
    localStorage.removeItem('hasPlayedGame');
    localStorage.removeItem('email');
    localStorage.removeItem('points');
    setAuthenticated(false);
    setIsVerified(false);
    window.location.href = 'https://rahuddev.github.io/badass-x';
  };

  const nameuser = localStorage.getItem('name');
  const points = parseInt(localStorage.getItem('points')) || 0;

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className={`app-container ${isChatOpen ? 'shrink' : ''}`}>
       <div className="d-flex flex-column min-vh-100">
        <Header userName={nameuser} userPoints={points} onLogout={handleLogout } toggleChat={toggleChat}  />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/landingpage" element={<LandingPage/>}/>
            <Route path="/about" element={<About />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/survey-tasks" element={<SurveyTasks />} />
            <Route path="/cpx-research" element={<CpxResearch />} />
            <Route path="/pollfish" element={<PollfishSurvey />} />
            <Route path="/bitlabs" element={<Bitlabs />} />
            <Route path="/cpalead" element={<Cpalead />} />
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/mainpage" element={<MainPage handleLogout={handleLogout} />} />
            <Route path="/redeem" element={<RedeemPage />} />
            <Route path="/chat-room" element={<ChatPanel />} />
            <Route path="/config" element={<Config />} />
            <Route path="/forget-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/user-reviews" element={<UserReviews />} />
            <Route path="/verify-email-success" element={<EmailVerificationSuccess/>} />
            <Route path="/signup" element={<SignUp handleSignUp={handleSignUp} />} />
            <Route path="/login" element={<Login handleLogin={handleLogin} />} />
            <Route path="/profile" element={<Profile userName={nameuser} />} />
            <Route path="/dashboard" element={authenticated ? <Dashboard points={points} handleLogout={handleLogout} /> : <Navigate to="/login" />} />
            <Route path="/badass-x" element={authenticated ? (isVerified ? <Navigate to="/dashboard" /> : <Navigate to="/login" />) : <LandingPage />} />
            <Route path="/verify-email" element={!isVerified ? <VerifyEmail /> : <Navigate to="/login" />} />
            <Route path="/" element={authenticated ? (isVerified ? <Navigate to="/dashboard" /> : <Navigate to="/login" />) : <LandingPage />} />
          </Routes>
        </main>
        <ChatPanel isOpen={isChatOpen} closeChat={toggleChat} />
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

