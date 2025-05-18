import React, { useState, useEffect, useCallback } from 'react';
import {  BrowserRouter as Router, Route, Routes, Navigate,  BrowserRouter} from 'react-router-dom';
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
import ReferralLink from './pages/referrallink';
import ContactForm from './pages/ContactForm';
import Config from './config';
import UserReviews from './pages/UserReviews';
import FAQ from './pages/FAQ';
import LoadingPage from './pages/Loading';
import HandlePageClick from './handleclick';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import PointsTracker from './pages/testtrackerpoints';
import Leaderboard from './pages/leaderboard';
import EmailVerificationSuccess from './pages/EmailVerificationSuccess';
import ForgotPassword from './pages/Forgotpassword';
import ResetPassword from './pages/ResetPassword';
import GoogleAuthComponent from './pages/Signup-google';
import MobileNavBar from './pages/AppNav';
import ReferralStats from './pages/referralstats';
import SurveyDashboard from './pages/surveycpx';
import OffersPagebitlabs from './pages/bitlabsoffer';
import BitlabsSurveyslist from './pages/surveys-bitlabs';
import Notikoffer from './pages/Notikoffer';
import NotikIframe from './pages/Notik';
import HistoryPage from './pages/History';
import LiveUpdates from './components/LiveUpdates';
import DeleteAccount from './pages/Deleteaccount';
import ThreePage from './pages/ThreePage';
import AiTextGenerator from './pages/AI-generator';
import PaypalTest from './pages/PaypalTest';
import PaypalSuccess from './pages/PaypalSuccess';
import './App.css';
import './pages/ToggleButton.css'; 
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL_MAIN, web_client, bajuhitam, DOMAIN } from './config';
import GameSpinner from './pages/GameSpinner';
import DeviceInfo from './pages/capacitorcheck';


const API = API_URL_MAIN.split(',');
const domain = DOMAIN.split(',');
const main = domain[0];
export const API_URL = API[2];
export { HandlePageClick };
export const key = bajuhitam;
export const decryptData = (encryptedData, key) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};
export const encryptData = (data, key) => {
  return CryptoJS.AES.encrypt(data, key).toString();
};



const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userPoints, setUserPoints] = useState(0);
  const [userName, setUserName] = useState('');
  const [isVerified, setIsVerified] = useState(localStorage.getItem('isVerified') === 'true');
  const [isChatOpen, setChatOpen] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);
  const [liveUpdatesActive, setLiveUpdatesActive] = useState(true);
  const [updates, setUpdates] = useState([]); // State to hold live updates
  const [error, setError] = useState('');
  const web = web_client.split(',');
  const { t } = useTranslation();
  const g_redirect = web[1];

  
  useEffect(() => {
    const name = localStorage.getItem('name');
    const storedPoints = parseInt(localStorage.getItem('points')) || 0;
    setUserName(name);
    setUserPoints(storedPoints);
  
    const fetchPoints = async () => {
      const token = localStorage.getItem('token');
      const uuid = localStorage.getItem('uuid');
      if (!isVerified) return; // Prevent fetching if not logged in
      
      try {
        const response = await axios.get(`${API_URL}/api/get-points/${uuid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const points = response.data.points;
        const referrer = response.data.referrer;
        
        // Calculate the difference between new and stored points
        const amountEarned = points - storedPoints;
  
        // Update points in state and localStorage
        setUserPoints(points);
        localStorage.setItem('points', points);
       
  
        // If user has a referrer and earned points, trigger commission logic
        if (referrer && amountEarned > 0) {
          await axios.post(`${API_URL}/api/commission`, {
            userId: uuid,
            amountEarned: amountEarned,
          });
        }
      } catch (error) {
        console.error('Error fetching points:', error);
      }
    };
  
    fetchPoints();
  }, [isVerified]); 



  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const uuid = localStorage.getItem('uuid');
    if (!isVerified || !token || !uuid) return;
    let previousPoints = parseInt(localStorage.getItem('points')) || 0;
    const eventSource = new EventSource(`${API_URL}/api/stream-points/${uuid}?token=${encodeURIComponent(token)}`);
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received SSE data:", data); 
      if (data.points !== undefined) {
        const updatedPoints = data.points;
        setUserPoints(updatedPoints);
        localStorage.setItem('points', updatedPoints);
        if (updatedPoints > previousPoints) {
          const audio = new Audio('https://od.lk/s/NjFfODYyNTcxMDJf/cash-register-kaching-sound-effect-125042.mp3');
          audio.play().catch(error => console.warn('Audio playback failed:', error));
        }
        previousPoints = updatedPoints;
      }
    };
    eventSource.onerror = (error) => {
      console.error('Error with SSE connection:', error);
      eventSource.close();
    };
    return () => {
      eventSource.close();
    };
  }, [isVerified]);
  
  
  const toggleChat = () => {
    console.log('Toggle chat function called'); // Debug log
    setChatOpen(!isChatOpen);
  };


  useEffect(() => {
    const islogin = localStorage.getItem('isVerified');
    const params = new URLSearchParams(window.location.search);
    const referralCode = params.get('ref');

    // Track referral code only if isVerified is false
    if (islogin === 'false' && referralCode) {
      localStorage.setItem('referralCode', referralCode);
    }  else if (islogin === 'true' && referralCode) {
      // Remove referral code from URL
      const url = new URL(window.location.href);
      url.searchParams.delete('ref');
      window.history.replaceState({}, document.title, url.toString()); 
    }
  }, []);

  useEffect(() => {
    // Replace '#access_token' with '#?access_token' in the URL
    let modifiedUrl = window.location.href;
    
    if (window.location.hash.includes('#access_token')) {
      modifiedUrl = modifiedUrl.replace('#access_token', '#?access_token');
    }
    
    if (window.location.hash.includes('#state')) {
      modifiedUrl = modifiedUrl.replace('#state', '#?state');
    }
    
    if (modifiedUrl !== window.location.href) {
      window.history.replaceState(null, null, modifiedUrl);
    }

    // Extract URL parameters after '#?'
    const urlParams = new URLSearchParams(window.location.hash.substring(2));
    const token = urlParams.get('access_token');
    const Code = urlParams.get('state');
    
    // Set the access token to state
    if (token) {
      setAccessToken(token);
    }
    if (Code) {
      localStorage.setItem('referralCode', Code);
    }
  }, []);

  useEffect(() => {
    // Check if accessToken is available and handle sign-in
    if (accessToken) {
      handleGoogleSignIn(accessToken);
    }
  }, [accessToken]);

  
  const fetchIp = async () => {
    try {
      const ipResponse = await axios.get(`${API_URL}/api/getUserIP`);
      const userIp = ipResponse.data.ip;
  
      console.log(`✅ Successfully fetched user IP: ${userIp}`);
      return userIp;
    } catch (err) {
      console.error('❌ Error fetching user IP:', err);
      return '';
    }
  };
  

  useEffect(() => {
    let eventSource;
    const receivedIds = new Set(); // Use Set to track unique _id's
  
    if (liveUpdatesActive) {
      // Open an EventSource connection to the backend
      eventSource = new EventSource(`${API_URL}/api/live-updates`);
  
      // Handle incoming messages from the SSE connection
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
  
        // Check if the data has a unique _id and avoid duplicates
        if (data._id && !receivedIds.has(data._id)) {
          // If unique, add the ID to the Set and update the state
          receivedIds.add(data._id);
          setUpdates((prevUpdates) => [data, ...prevUpdates].slice(0, 10)); // Limit to 10 updates
        } else {
          console.warn('Duplicate update received:', data);
        }
      };
  
      // Handle any errors in the SSE connection
      eventSource.onerror = (error) => {
        console.error('Error with SSE connection:', error);
        eventSource.close();
      };
  
      // Clean up on component unmount or when liveUpdatesActive changes
      return () => {
        if (eventSource) {
          eventSource.close();
        }
      };
    }
  }, [liveUpdatesActive]); 
  


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


  const useRedirect = (redirectPath) => {
    useEffect(() => {
      const redirect = () => {
    window.location.assign(redirectPath);
    };

        window.addEventListener('redirectEvent', redirect);

             return () => {
             window.removeEventListener('redirectEvent', redirect);
             };
       }, [redirectPath]);
         };

    useRedirect(redirectPath);


  const handleGoogleSignIn = useCallback(async (accessToken) => {
    setIsLoading(true);
  
    try {
      const clientIp = await fetchIp();
      const encryptedIp = encryptData(clientIp, key); 
      console.log('Sending accessToken to server...');
  
      // Send access token to the server
      const response = await axios.post(`${API_URL}/api/google-auth`, { accessToken });
  
      const { status, data } = response;
  
      if (status === 201) {
        console.log('New user created, needs to verify email');
  
        if (data.uuid) {
          console.log('User UUID:', data.uuid);
          localStorage.setItem('token', data.token);
          
          // Track referral code if available
          const referral = localStorage.getItem('referralCode')
          if (referral) {
            try {
              console.log('Tracking referral code:', referral);
              await axios.post(`${API_URL}/api/track-referral`, {
                referralCode: referral,
                userId: data.uuid,
              });
              console.log('Referral code tracked successfully');
            } catch (trackingError) {
              console.error('Error tracking referral code:', trackingError);
            }
          }
  
          // Redirect to email verification page
          window.location.href = `${g_redirect}/verify-email`;
          localStorage.removeItem('referralCode');
    
        } else {
          console.error('UUID missing in response for new user');
          setError('Unexpected error: Missing user data.');
        }
      } else if (response.data.token) {
        const { token, name, uuid, isVerified, email, points } = data;
  
  
        localStorage.setItem('name', name);
        const encodetoken = encryptData(token, key)
        localStorage.setItem('token', encodetoken);
        localStorage.setItem('uuid', uuid);
        localStorage.setItem('isVerified', isVerified);
        localStorage.setItem('email', email);
        localStorage.setItem('points', points);
        Cookies.set('userip', encryptedIp, { expires: 1 }); // Expires in 1 day
        const encryptedhub = encryptData(uuid, key); 
        Cookies.set('uuid', encryptedhub, { expires: 7, sameSite: 'None', secure: true, domain: `${main}` });
  
        setAuthenticated(true);
        setIsVerified(true);
  
        // Handle referral code cleanup
        localStorage.removeItem('referralCode');
  
        // Redirect based on verification status
        if (isVerified) {
          window.location.href = `${g_redirect}/dashboard`;
        } else {
          window.location.href = `${g_redirect}/verify-email`;
        }
      } else {
        console.error('Unexpected response status:', status);
        setError('Unexpected error occurred');
      }
    } catch (error) {
      console.error('Error during Google sign-in:', error);
  
      if (error.response?.status === 400) {
        const errorMessage = error.response.data.message;
        console.log('Specific error response from server:', errorMessage);
  
        if (errorMessage === 'User exists but signed up with a different method. Please use the correct sign-in method.') {
          localStorage.setItem('alertMessage', t('login_page.email_registered_error'));
          window.location.href = `${g_redirect}/login`;
        }
      } else {
        setError('Error during Google sign-in');
      }
    } finally {
      setIsLoading(false);
    }
  }, [g_redirect, t,]);
  

  

  useEffect(() => {
    if (accessToken) {
      console.log('Starting authentication process...');
      handleGoogleSignIn(accessToken);
    } else {
      console.error('Access token not found');
      setError('Access token not found');
      setIsLoading(false);
      setRedirectPath('/login');
    }
  }, [accessToken, handleGoogleSignIn]);
  

  const handleSignUp = async (formData) => {
    try {
      const clientIp = await fetchIp();
      const encryptedIp = encryptData(clientIp, key); // Encrypt the IP
      const response = await axios.post(`${API_URL}/api/signup`, formData);
      if (response.status === 201) {
        const loginResponse = await axios.post(`${API_URL}/api/login`, {
          email: formData.email,
          password: formData.password
        });
        if (loginResponse.data.token) {
          localStorage.setItem('name', loginResponse.data.name);
          const encodetoken = encryptData(loginResponse.data.token, key)
          localStorage.setItem('token', encodetoken);
          localStorage.setItem('uuid', loginResponse.data.uuid);
          localStorage.setItem('isVerified', loginResponse.data.isVerified);
          localStorage.setItem('email', loginResponse.data.email);
          localStorage.setItem('points', loginResponse.data.points);
          Cookies.set('userip', encryptedIp, { expires: 1 }); // Expires in 1 day
          const encryptedhub = encryptData(loginResponse.data.uuid, key); 
          Cookies.set('uuid', encryptedhub, { expires: 7, sameSite: 'None', secure: true, domain: `${main}` });
          setAuthenticated(true);
          setIsVerified(loginResponse.data.isVerified);

        const referralCode = localStorage.getItem('referralCode');
        if (referralCode) {
          await axios.post(`${API_URL}/api/track-referral`, {
            referralCode,
            userId: loginResponse.data.uuid
          });
          localStorage.removeItem('referralCode'); // Remove referral code from localStorage
        }

        // Remove referral code from URL
        const url = new URL(window.location.href);
        url.searchParams.delete('ref');
        window.history.replaceState({}, document.title, url.toString());
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
      const clientIp = await fetchIp();
      const encryptedIp = encryptData(clientIp, key); // Encrypt the IP
      const response = await axios.post(`${API_URL}/api/login`, formData);
      if (response.data.token) {
        localStorage.setItem('name', response.data.name);
        const encodetoken = encryptData(response.data.token, key)
        localStorage.setItem('token', encodetoken);
        localStorage.setItem('uuid', response.data.uuid);
        localStorage.setItem('isVerified', response.data.isVerified);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('points', response.data.points);
        Cookies.set('userip', encryptedIp, { expires: 1 }); // Expires in 1 day
        const encryptedhub = encryptData(response.data.uuid, key); 
        Cookies.set('uuid', encryptedhub, { expires: 7, sameSite: 'None', secure: true, domain: `${main}`});
        setAuthenticated(true);
        setIsVerified(response.data.isVerified);

        const url = new URL(window.location.href);
        url.searchParams.delete('ref');
        window.history.replaceState({}, document.title, url.toString());
        localStorage.removeItem('referralCode');
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
          alert('This account is associated with Google sign-in. Please use Google to log in.');
          return 'invalid';
        }
      }
      console.error('Error logging in:', error);
      alert('Error logging in');
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove('userip');
    Cookies.remove('uuid');
    setAuthenticated(false);
    setIsVerified(false);
    window.location.reload();
  };

 
  
  const handleToggle = () => {
    setLiveUpdatesActive((prev) => {
      const newState = !prev;
      // Save the new state in localStorage
      localStorage.setItem('liveUpdatesActive', JSON.stringify(newState));
      return newState;
    });
  };

  const handleSpinComplete = (prize) => {
    console.log("User won:", prize);
    // You can handle any actions based on the prize the user won here
    // For example, displaying the prize or awarding it to the user
  };


  const ToggleButton = ({ isActive, toggle }) => {
    return (
      <label className="toggle-button">
        <input type="checkbox" checked={isActive} onChange={toggle} />
        <span className="slider" />
        <span className="label">{isActive ? 'Live Updates On' : 'Live Updates Off'}</span>
      </label>
    );
  };

  useEffect(() => {
    const savedState = localStorage.getItem('liveUpdatesActive');
    if (savedState !== null) {
      setLiveUpdatesActive(JSON.parse(savedState));
    }
  }, []);


  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-google" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const searchParams = new URLSearchParams(window.location.search);
  const isLoadingPage = searchParams.has('loading');

  return  isLoadingPage ? (
    <BrowserRouter>
      <Routes>
      <Route path="/*" element={<LoadingPage/>} />
      </Routes>
    </BrowserRouter>
  ) : (
    <Router>
      <div className={`app-container ${isChatOpen ? 'shrink' : ''}`}>
       <div className="d-flex flex-column min-vh-100">
        <Header userName={userName} userPoints={userPoints} onLogout={handleLogout } toggleChat={toggleChat}  />
        {liveUpdatesActive && <LiveUpdates updates={updates} loading={loading} />}
        <main className="flex-grow-1">
          <Routes>
            <Route path="/home" element={!isVerified ? <Home /> : <Navigate to="/dashboard"/>} />
            <Route path="/landingpage" element={!isVerified ? <LandingPage/> : <Navigate to="/dashboard"/>}/>
            <Route path="/about" element={<About />} />
            <Route path="/loading" element={<LoadingPage />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/survey-tasks" element={isVerified ? <SurveyTasks /> : <Navigate to="/login" />} />
            <Route path="/cpx-research" element={isVerified ? <CpxResearch /> : <Navigate to="/login" />} />
            <Route path="/pollfish" element={isVerified ? <PollfishSurvey /> : <Navigate to="/login" />} />
            <Route path="/bitlabs" element={isVerified ? <Bitlabs /> : <Navigate to="/login" />} />
            <Route path="/cpalead" element={isVerified ? <Cpalead /> : <Navigate to="/login" />} />
            <Route path="/line-chart" element={isVerified ? <LineChart /> : <Navigate to="/login" />} />
            <Route path="/history" element={isVerified ? <HistoryPage /> : <Navigate to="/login" />} />
            <Route path="/mainpage" element={isVerified ? <MainPage userPoints={userPoints} />: <Navigate to="/login" />} />
            <Route path="/redeem" element={isVerified ? <RedeemPage userPoints={userPoints}/> : <Navigate to="/login" />} />
            <Route path="/chat-room" element={isVerified ? <ChatPanel /> : <Navigate to="/login" />} />
            <Route path="/referral-link" element={isVerified ? <ReferralLink /> : <Navigate to="/login" />} />
            <Route path="/referral-stats" element={isVerified ? <ReferralStats /> : <Navigate to="/login" />} />
            <Route path="/config" element={<Config />} />
            <Route path="/forget-password" element={!isVerified ? <ForgotPassword /> : <Navigate to="/dashboard"/>} />
            <Route path="/reset-password" element={!isVerified ? <ResetPassword /> : <Navigate to="/dashboard"/>} />
            <Route path="/user-reviews" element={<UserReviews />} />
            <Route path="/contact-us" element={<ContactForm />} />
            <Route path="/faq" element={<FAQ/>} />
            <Route path="/point-tracker" element={<PointsTracker/>}/>
            <Route path="/terms-of-service" element={<TermsOfService/>} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/three" element={<ThreePage />} />
            <Route path="/ai-generator" element={<AiTextGenerator />} />
            <Route path="/paypal-test" element={<PaypalTest />} />
            <Route path="/paypal-successpage" element={<PaypalSuccess />} />
            <Route path="/leaderboard" element={isVerified ? <Leaderboard /> : <Navigate to="/login" />} />
            <Route path="/survey-cpx" element={isVerified ? <SurveyDashboard /> : <Navigate to="/login" />} />
            <Route path="/bitlabs-offers" element={isVerified ? <OffersPagebitlabs/> : <Navigate to="/login" />} />
            <Route path="/survey-bitlabs" element={isVerified ? <BitlabsSurveyslist/> : <Navigate to="/login" />} />
            <Route path="/notik-offers" element={isVerified ? <Notikoffer/> : <Navigate to="/login" />} />
            <Route path="/notik-frame" element={isVerified ? <NotikIframe/> : <Navigate to="/login" />} />
            <Route path="/device-info" element={isVerified ? <DeviceInfo/> : <Navigate to="/login" />} />
            <Route path="/spinner-lucky" element={isVerified ? <GameSpinner onSpinComplete={handleSpinComplete} /> : <Navigate to="/login" />} />
            <Route path="/delete-account" element={isVerified ? <DeleteAccount/> : <Navigate to="/login" />} />
            <Route path="/verify-email-success" element={<EmailVerificationSuccess/>} />
            <Route path="/google-sign" element={!isVerified ? <GoogleAuthComponent handleGoogleSignIn={handleGoogleSignIn} accessToken={accessToken} isLoading={isLoading} /> : <Navigate to= "/dashboard"/>} />
            <Route path="/signup" element={!isVerified ? <SignUp handleSignUp={handleSignUp} /> : <Navigate to= "/dashboard"/>} />
            <Route path="/login" element={!isVerified ? <Login handleLogin={handleLogin} /> : <Navigate to="/dashboard"/> } />
            <Route path="/profile" element={isVerified? <Profile userName={userName} ToggleButton={ToggleButton} liveUpdatesActive={liveUpdatesActive} handleToggle={handleToggle} /> : <Navigate to="/login"/>} />
            <Route path="/dashboard" element={authenticated ? <Dashboard userPoints={userPoints} /> : <Navigate to="/login" />} />
            <Route path="/badass-x" element={authenticated ? (isVerified ? <Navigate to="/dashboard" /> : <Navigate to="/login" />) : <LandingPage />} />
            <Route path="/verify-email" element={!isVerified ? <VerifyEmail g_redirect={g_redirect} /> : <Navigate to="/login" />} />
            <Route path="/" element={authenticated ? (isVerified ? <Navigate to="/dashboard" /> : <Navigate to="/login" />) : <LandingPage />} />
          </Routes>
        </main>
        <ChatPanel isOpen={isChatOpen} closeChat={toggleChat} />
        <div>{isVerified ? (<MobileNavBar toggleChat={toggleChat} isChatOpen={isChatOpen} closeChat={toggleChat} />) : (
        <div></div>)}
    </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

