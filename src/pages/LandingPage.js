// src/components/LandingPage.js
import React, {useRef} from 'react';
import { Link } from 'react-router-dom';
import WordSwitcher from './wordswitcher';
import HowItWorks from './HowItWorks';
import UserReviews from './UserReviews';
import FAQ from './FAQ';
import { useNavigate } from 'react-router-dom';
import { HandlePageClick } from '../App';
import { useTranslation } from 'react-i18next';
import './LandingPage.css';


const LandingPage = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { t } = useTranslation();



  return (
    <div className="landing-page text-center">
      <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
        <h1 className="display-4 drop-in">
        {t('header')}
        </h1>
        <p className="lead drop-in delay-1">{t('subheader')} <WordSwitcher /></p>
        <Link to="#/home" className="btn btn-primary btn-lg drop-in delay-2" onClick={(e) => HandlePageClick(e, '/home', ref, navigate)}>{t('getStarted')}</Link>
      </div>
      <div className="section-container2">
        <HowItWorks />
      </div>
      <div className="section-container2">
        <UserReviews />
      </div>
      <div className="section-container2">
        <FAQ />
      </div>
    </div>
  );
};

export default LandingPage;
