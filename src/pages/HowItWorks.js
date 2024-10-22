// src/components/HowItWorks.js
import React, { useEffect, useRef } from 'react';
import './HowItWorks.css';
import { HandlePageClick } from '../App';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';

const HowItWorks = () => {
  const howItWorksRef = useRef(null);
  const x = useRef(null);
  const navigate =  useNavigate();
  const { t } = useTranslation();


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
              <img src='https://od.lk/s/NjFfODkyOTI2Nzlf/threepeople-Photoroom.png' className="card2-img-top" alt="Community" />
              <div className="card-body">
                <h5 className="card-title"><strong>{t('signUpTitle')}</strong></h5>
                <p className="card2-text">{t('signUpText')}</p>
              </div>
            </div>
            <div className="arrow-right"></div>
          </div>
          <div className="col-md-4 mb-3 position-relative">
            <div className="card-2 h-100">
              <img src='https://od.lk/s/NjFfODU0OTM1MjJf/dollarblack-Photoroom.png' className="card2-img-top" alt="Complete Tasks" />
              <div className="card-body">
                <h5 className="card-title"><strong>{t('earnCuanTitle')}</strong></h5>
                <p className="card2-text">{t('earnCuanText')}</p>
              </div>
            </div>
            <div className="arrow-right"></div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card-2 h-100">
              <img src='https://od.lk/s/NjFfODU1MzcwNTJf/handgift-Photoroom.png' className="card2-img-top" alt="Earn Rewards" />
              <div className="card-body">
                <h5 className="card-title"><strong>{t('cashOutTitle')}</strong></h5>
                <p className="card2-text">{t('cashOutText')}</p>
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