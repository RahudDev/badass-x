// src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import WordSwitcher from './wordswitcher';
import HowItWorks from './HowItWorks';
import UserReviews from './UserReviews';
import FAQ from './FAQ';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page text-center">
      <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
        <h1 className="display-4 drop-in">
          Welcome to Free Cuan
        </h1>
        <p className="lead drop-in delay-1">Earn rewards by completing simple <WordSwitcher /></p>
        <Link to="/home" className="btn btn-primary btn-lg drop-in delay-2">Get Started</Link>
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
