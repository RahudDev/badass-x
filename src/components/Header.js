import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { HandlePageClick } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faComments } from '@fortawesome/free-solid-svg-icons';
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

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div className="container">
          <Link className="navbar-brand" onClick={(e) => HandlePageClick(e, isLoggedIn ? "/dashboard" : "/landingpage",contactSectionRef, navigate)} >
            <strong>Free Cuan</strong>
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
                <Link className="nav-link text-white" onClick={(e) => HandlePageClick(e, isLoggedIn ? "/dashboard" : "/home",contactSectionRef, navigate)} >{isLoggedIn ? "Dashboard" : t('home')}</Link>
              </li> &nbsp;&nbsp;
              <li className="nav-item">
                <Link className="nav-link text-white" onClick={(e) => HandlePageClick(e, '/tasks',contactSectionRef, navigate)}>{t('tasks')}</Link>
              </li> &nbsp;&nbsp;
              {isLoggedIn ? (
              <li className="nav-item dropdown">
                <Dropdown>
                <Dropdown.Toggle className="nav-link text-white" id="dropdown-basic">
                Affiliates
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={(e) => HandlePageClick(e, '/referral-link', contactSectionRef, navigate)}>Affiliates Program</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => HandlePageClick(e, '/referral-stats', contactSectionRef, navigate)}>Your Affiliate Stats</Dropdown.Item>
                    {/* Add more dropdown items as needed */}
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link text-white" onClick={(e) => HandlePageClick(e, '/about', contactSectionRef, navigate)}>
                  {t('about_us')}
                </Link>
              </li>
            )}&nbsp;&nbsp;
              {isLoggedIn && (
                <>
                  <li className='nav-item'>
                    <Link className="nav-link text-white"  onClick={(e) => HandlePageClick(e, '/leaderboard', contactSectionRef, navigate)}>Leaderboard</Link>
                  </li> &nbsp;&nbsp;
                  <li className="nav-item">
                    <Link className="nav-link d-none d-lg-block text-white" onClick={(e) => HandlePageClick(e, '/redeem', contactSectionRef, navigate)} style={{ backgroundColor: '#0b65c5', borderRadius : '10px' }}> $CUAN : {userPoints}</Link>
                  </li> &nbsp;&nbsp;
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle text-white" href="#/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Welcome, {firstName}!
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link className="dropdown-item" onClick={(e) => HandlePageClick(e, '/profile', contactSectionRef, navigate)}>Info</Link>
                      <Link className="dropdown-item" onClick={(e) => HandlePageClick(e, '/line-chart', contactSectionRef, navigate)}>Insight</Link>
                      <Link className="dropdown-item" onClick={(e) => HandlePageClick(e, '/history', contactSectionRef, navigate)}>Your History</Link>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                    </div>
                  </li> &nbsp;&nbsp;
                  <li className="nav-item">
                    <Link className="nav-link text-white" onClick={toggleChat}>Chat Room <FontAwesomeIcon icon={faComments} /></Link>
                  </li>
                </>
              )}
              {!isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link text-white" onClick={(e) => HandlePageClick(e, '/login',contactSectionRef, navigate)}>{t('login')}</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-In Menu */}
      <div className={`slide-menu ${isMenuOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={closeMenu}>×</button>
        <ul className="slide-menu-list">
          <li><Link onClick={(e) => {HandlePageClick(e, isLoggedIn ? '/dashboard' : '/home',contactSectionRef, navigate); closeMenu();}}>{ isLoggedIn ? 'Dashboard' : t('home')}</Link></li>
          <li><Link onClick={(e) => {HandlePageClick(e, isLoggedIn ? '/profile' : '/tasks',contactSectionRef, navigate); closeMenu();}}>{ isLoggedIn ? 'Your profile' : t('tasks')}</Link></li>
          <li><Link onClick={(e) => {HandlePageClick(e,  isLoggedIn ? '/history' : '/about',contactSectionRef, navigate); closeMenu();}}>{ isLoggedIn ? 'Your History' : t('about_us')}</Link></li>
          {isLoggedIn && (
            <>
            <li><Link onClick={(e) => {HandlePageClick(e, '/line-chart',contactSectionRef, navigate); closeMenu();}}>Insight</Link></li>
              <li><Link onClick={(e) => {HandlePageClick(e, '/referral-link',contactSectionRef, navigate); closeMenu();}}>Affiliate Program</Link></li>
              <li><Link onClick={(e) => {HandlePageClick(e, '/referral-stats',contactSectionRef, navigate); closeMenu();}}>Your Affiliate Stats</Link></li>
              <li> <button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
            </>
          )}
          {!isLoggedIn && (
            <li><Link onClick={(e) => {HandlePageClick(e, '/login',contactSectionRef, navigate); closeMenu();}} >{t('login')}</Link></li>
          )}
        </ul>
      </div>

      {/* Blur Background */}
      {isMenuOpen && <div className="blur-background" onClick={closeMenu}></div>}
    </>
  );
};

export default Header;
