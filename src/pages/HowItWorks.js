// src/components/HowItWorks.js
import React, { useEffect, useRef, useState } from 'react';
import './HowItWorks.css';
import { HandlePageClick } from '../App';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import person_light from "./assets/person_single_icon.png";
import person_dark from "./assets/person_single_icon_dark.png";

import dollarcoin_light from "./assets/dollarblack.png";
import dollarcoin_dark from "./assets/dollarblack_dark.png";

import rewardhand_light from "./assets/rewardhand.png";
import rewardhand_dark from "./assets/rewardhand_dark.png";

import 'bootstrap/dist/css/bootstrap.min.css';


const HowItWorks = () => {
  const howItWorksRef = useRef(null);
  const x = useRef(null);
  const navigate =  useNavigate();
  const { t } = useTranslation();

  const Cuangreen = (text) => {
    // Split the text by "$CUAN" and return JSX with styles applied
    const parts = text.split("$CUAN");
    return (
      <>
        {parts[0]}
        <strong style={{ color: "#28a745" }}>$CUAN</strong>
        {parts[1]}
      </>
    );
  };

const [isDarkMode, setIsDarkMode] = useState(false);

useEffect(() => {
  const checkDarkMode = () => {
    setIsDarkMode(document.body.classList.contains('dark-mode'));
  };

  checkDarkMode(); // initial check
  const observer = new MutationObserver(checkDarkMode);
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

  return () => observer.disconnect();
}, []);



  useEffect(() => {
    const handleScroll = () => {
      const element = howItWorksRef.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
          element.classList.add('visible');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={howItWorksRef} className="how-it-works my-5">
      <div className="container-how">
        <h2 className="mb-4 text-center"><strong>{t('howItWorksTitle')}</strong></h2>
        <div className="row align-items-center">
          <div className="col-md-4 mb-3 position-relative">
            <div className="card-2 h-100">
              <img src={isDarkMode ? person_dark : person_light} className="card2-img-top" alt="Community" />
              <div className="card-body">
                <h5 className="card-title"><strong>{t('signUpTitle')}</strong></h5>
                <p className="card2-text">{t('signUpText')}</p>
              </div>
            </div>
            <div className="arrow-right"></div>
          </div>
          <div className="col-md-4 mb-3 position-relative">
            <div className="card-2 h-100">
              <img src={isDarkMode ? dollarcoin_dark : dollarcoin_light} className="card2-img-top" alt="Complete Tasks" />
              <div className="card-body">
                <h5 className="card-title"><strong>{Cuangreen(t("earnCuanTitle"))}</strong></h5>
                <p className="card2-text">{Cuangreen(t('earnCuanText'))}</p>
              </div>
            </div>
            <div className="arrow-right"></div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card-2 h-100">
              <img src={isDarkMode ? rewardhand_dark : rewardhand_light} className="card2-img-top" alt="Earn Rewards" />
              <div className="card-body">
                <h5 className="card-title"><strong>{t('cashOutTitle')}</strong></h5>
                <p className="card2-text">{Cuangreen(t('cashOutText'))}</p>
              </div>
            </div>
          </div>
        </div>
        <a className="btn btn-primary btn-lg" href="#/signup" role="button" onClick={(e) => HandlePageClick(e, '/signup', x, navigate)}>{t('letsTry')}</a>
      </div>
    </section>
  );
};

export default HowItWorks;