import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { HandlePageClick } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faListCheck, faCircleInfo, faSignInAlt, faComments, faTachometerAlt, faUser, faClock, faChartLine, faHandshake, faChartBar, faDoorOpen, faCubes, faUsers, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = ({ onLogout, toggleChat, userPoints }) => {
  const navigate = useNavigate();
  const userinfo = localStorage.getItem('isVerified');
  const userName = localStorage.getItem("name");
  const isLoggedIn = userinfo === 'true';
  const { t } = useTranslation();
  const contactSectionRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const firstName = userName ? userName.split(' ')[0] : '';


  const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem('theme') === 'dark';
});

const toggleDarkMode = () => {
  const isDark = !darkMode;
  setDarkMode(isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  document.body.classList.toggle('dark-mode', isDark);
};

useEffect(() => {
  const savedTheme = localStorage.getItem('theme');
  document.body.classList.toggle('dark-mode', savedTheme === 'dark');
}, []);


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div className="container">
          <Link className="navbar-brand" onClick={(e) => HandlePageClick(e, isLoggedIn ? "/dashboard" : "/landingpage",contactSectionRef, navigate)} >
            <strong>OptimistiCash</strong>
          </Link>
          <div className="d-flex align-items-center">
          
          {isLoggedIn && (
            <Link
              className="nav-link text-white d-lg-none"
              to="/redeem"
              style={{ backgroundColor: '#0b65c5', marginRight: '10px', padding : '10px', borderRadius : '10px' }}
            >
              $CUAN: {userPoints.toLocaleString()}
            </Link>
          )}
          <button className="navbar-toggler" type="button" onClick={toggleMenu}>
            <span className="navbar-toggler-icon"></span>
          </button>
         </div>
         
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
            <Link className="nav-link text-white" onClick={(e) => HandlePageClick(e, isLoggedIn ? "/dashboard" : "/home", contactSectionRef, navigate)}><FontAwesomeIcon icon={isLoggedIn ? faTachometerAlt : faHome} className="me-2" />{isLoggedIn ? "Dashboard" : t('home')}</Link>
              </li> &nbsp;&nbsp;
              <li className="nav-item">
                <Link className="nav-link text-white" onClick={(e) => HandlePageClick(e, '/tasks',contactSectionRef, navigate)}> <FontAwesomeIcon icon={faListCheck} /> {t('tasks')}</Link>
              </li> &nbsp;&nbsp;
              {isLoggedIn ? (
              <li className="nav-item dropdown">
                <Dropdown>
                <Dropdown.Toggle className="nav-link text-white" id="dropdown-basic">
                <FontAwesomeIcon icon={faUsers} className="me-2" />Affiliates
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item className="dropdown-item" onClick={(e) => HandlePageClick(e, '/referral-link', contactSectionRef, navigate)}><strong><FontAwesomeIcon icon={faHandshake}/> Affiliates Program</strong></Dropdown.Item>
                    <Dropdown.Item className="dropdown-item" onClick={(e) => HandlePageClick(e, '/referral-stats', contactSectionRef, navigate)}><strong>  <FontAwesomeIcon icon={faChartBar} /> Your Affiliate Stats</strong></Dropdown.Item>
                    {/* Add more dropdown items as needed */}
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link text-white" onClick={(e) => HandlePageClick(e, '/about', contactSectionRef, navigate)}>
                <FontAwesomeIcon icon={faCircleInfo} /> {t('about_us')}
                </Link>
              </li>
            )}&nbsp;&nbsp;
              {isLoggedIn && (
                <>
                  <li className='nav-item'>
                    <Link className="nav-link text-white"  onClick={(e) => HandlePageClick(e, '/leaderboard', contactSectionRef, navigate)}>  <FontAwesomeIcon icon={faCubes} /> Leaderboard</Link>
                  </li> &nbsp;&nbsp;
                  <li className="nav-item">
                    <Link className="nav-link d-none d-lg-block text-white" onClick={(e) => HandlePageClick(e, '/redeem', contactSectionRef, navigate)} style={{ backgroundColor: '#0b65c5', borderRadius : '10px' }}> $CUAN : {userPoints}</Link>
                  </li> &nbsp;&nbsp;
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle text-white" href="#/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <FontAwesomeIcon icon={faUserCircle} className="me-2" />Welcome, {firstName}!
                    </a>
                    <div className="dropdown-menu " aria-labelledby="navbarDropdown">
                      <Link className="dropdown-item" onClick={(e) => HandlePageClick(e, '/profile', contactSectionRef, navigate)}><strong>  <FontAwesomeIcon icon={faUser} /> Info</strong></Link>
                      <Link className="dropdown-item" onClick={(e) => HandlePageClick(e, '/line-chart', contactSectionRef, navigate)}><strong>  <FontAwesomeIcon icon={faChartLine} /> Insight</strong></Link>
                      <Link className="dropdown-item" onClick={(e) => HandlePageClick(e, '/history', contactSectionRef, navigate)}><strong>  <FontAwesomeIcon icon={faClock} /> Your History</strong></Link>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item" onClick={handleLogout}><strong>  <FontAwesomeIcon icon={faDoorOpen} /> Logout</strong></button>
                    </div>
                  </li> &nbsp;&nbsp;
                  <li className="nav-item">
                    <Link className="nav-link text-white" onClick={toggleChat}> <FontAwesomeIcon icon={faComments} /> Chat Room</Link>
                  </li>
                </>
              )}
              {!isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link text-white" onClick={(e) => HandlePageClick(e, '/login',contactSectionRef, navigate)}>  <FontAwesomeIcon icon={faSignInAlt} /> {t('login')}</Link>
                </li>
              )}
            </ul>
             <button className="btn btn-outline-light btn-sm me-2" onClick={toggleDarkMode} title="Toggle Theme" > {darkMode ? '🌙' : '☀️'}</button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-In Menu */}
      <div className={`slide-menu  ${isMenuOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={closeMenu}>×</button>
        <ul className="slide-menu-list ">
          <li><Link className="dropdown-item" onClick={(e) => {HandlePageClick(e, isLoggedIn ? '/dashboard' : '/home',contactSectionRef, navigate); closeMenu();}}><strong> <FontAwesomeIcon icon={isLoggedIn ? faTachometerAlt : faHome} className="me-2" /> { isLoggedIn ? 'Dashboard' : t('home')}</strong></Link></li>
          <li><Link className="dropdown-item" onClick={(e) => {HandlePageClick(e, isLoggedIn ? '/profile' : '/tasks',contactSectionRef, navigate); closeMenu();}}><strong> <FontAwesomeIcon icon={isLoggedIn ? faUser : faListCheck} className="me-2" /> { isLoggedIn ? 'Your Profile' : t('tasks')}</strong></Link></li>
          <li><Link className="dropdown-item" onClick={(e) => {HandlePageClick(e,  isLoggedIn ? '/history' : '/about',contactSectionRef, navigate); closeMenu();}}><strong> <FontAwesomeIcon icon={isLoggedIn ? faClock : faCircleInfo} className="me-2" /> { isLoggedIn ? 'Your History' : t('about_us')}</strong></Link></li>
          {isLoggedIn && (
            <>
            <li><Link className="dropdown-item" onClick={(e) => {HandlePageClick(e, '/line-chart',contactSectionRef, navigate); closeMenu();}}><strong><FontAwesomeIcon icon={faChartLine} className="me-2" /> Insight</strong></Link></li>
              <li><Link className="dropdown-item" onClick={(e) => {HandlePageClick(e, '/referral-link',contactSectionRef, navigate); closeMenu();}}><strong><FontAwesomeIcon icon={faHandshake} className="me-2" /> Affiliate Program</strong></Link></li>
              <li><Link className="dropdown-item" onClick={(e) => {HandlePageClick(e, '/referral-stats',contactSectionRef, navigate); closeMenu();}}><strong> <FontAwesomeIcon icon={faChartBar} className="me-2" /> Your Affiliate Stats</strong></Link></li>
              <li> <button className="dropdown-item" onClick={handleLogout}><strong> <FontAwesomeIcon icon={faDoorOpen} className="me-2" /> Logout</strong></button></li>
            </>
          )}
          {!isLoggedIn && (
            <li><Link onClick={(e) => {HandlePageClick(e, '/login',contactSectionRef, navigate); closeMenu();}} ><strong> <FontAwesomeIcon icon={faSignInAlt} className="me-2" /> {t('login')}</strong></Link></li>
          )}
        </ul>
         <button className="btn btn-outline-light btn-sm me-2" onClick={toggleDarkMode} title="Toggle Theme" > {darkMode ? '🌙' : '☀️'} </button>
      </div>

      {/* Blur Background */}
      {isMenuOpen && <div className="blur-background" onClick={closeMenu}></div>}
    </>
  );
};

export default Header;
