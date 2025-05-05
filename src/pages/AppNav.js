import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { HandlePageClick } from '../App';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faCubes, faGift, faComments } from '@fortawesome/free-solid-svg-icons';
import './AppNav.css';

const MobileNavBar = ({ toggleChat, isChatOpen, closeChat }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const contactSectionRef = useRef();
  const navigate = useNavigate();

  // Handler for navigation clicks
  const handleNavigationClick = (e, path) => {
    if (isChatOpen) {
      closeChat(); // Close the chat if it's open
    }
    HandlePageClick(e, path, contactSectionRef, navigate);
  };

  return (
    <div className="mobile-nav-bar">
      <Link
        onClick={(e) => handleNavigationClick(e, '/tasks')}
        className={`nav-item ${location.pathname === '/tasks' ? 'active' : ''}`}
      >
        <i className="fas fa-tasks"></i>
        <FontAwesomeIcon icon={faCoins} />
        <span>{t('tasks')}</span>
      </Link>
      <Link
        onClick={(e) => handleNavigationClick(e, '/leaderboard')}
        className={`nav-item ${location.pathname === '/leaderboard' ? 'active' : ''}`}
      >
        <i className="fas fa-trophy"></i>
        <FontAwesomeIcon icon={faCubes} />
        <span>Leaderboard</span>
      </Link>
      <Link
        onClick={(e) => handleNavigationClick(e, '/redeem')}
        className={`nav-item ${location.pathname === '/redeem' ? 'active' : ''}`}
      >
        <i className="fas fa-gift"></i>
        <FontAwesomeIcon icon={faGift} />
        <span>Rewards</span>
      </Link>
      <Link onClick={toggleChat} className={`nav-item ${isChatOpen ? 'active' : ''}`}>
        <i className="fas fa-comments"></i>
        <FontAwesomeIcon icon={faComments} />
        <span>Chat Room</span>
      </Link>
    </div>
  );
};

export default MobileNavBar;
