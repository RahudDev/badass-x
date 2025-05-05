// src/components/LandingPage.js
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import WordSwitcher from './wordswitcher';
import HowItWorks from './HowItWorks';
import UserReviews from './UserReviews';
import FAQ from './FAQ';
import { useNavigate } from 'react-router-dom';
import { HandlePageClick } from '../App'; 
import { useTranslation } from 'react-i18next';
import device_mockup from './assets/device_offers.png';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { t } = useTranslation();

  return (
    // Apply gradient background animation only to this div
    <div className="landing-page min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x">
      {/* Centered container */}
      <div className="landing-page-welcome d-flex align-items-center justify-content-between min-vh-100">
  {/* Left Section - Text Content */}
  <div className="text-content-mockup">
    <h className="display-3 fw-bold drop-in delay-1">{t('header')}</h>
    <p className="lead drop-in delay-1">
    {t('subheader')} <br className="word-break-line" /><WordSwitcher />
    </p>
    <Link
      to="#/home"
      className="btn btn-primary btn-lg drop-in delay-1"
      onClick={(e) => HandlePageClick(e, '/home', ref, navigate)}
    >
      {t('getStarted')}
    </Link>
  </div>

  {/* Right Section - Image */}
  <div className="image-content-mockup drop-in delay-5">
    <div className="image-gradient-bg">
      <img
        src={device_mockup}
        alt="App Preview"
        className="img-fluid"
      />
    </div>
  </div>
 </div>




      {/* Other Sections, all text centered */}
      <div className="section-container2 text-center">       
      <HowItWorks />
      </div>
      <div className="section-container2 text-center">
        <UserReviews />
      </div>
      <div className="section-container2 text-center">
        <FAQ />
      </div>
    </div>
  );
};

export default LandingPage;
