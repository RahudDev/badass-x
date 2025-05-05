import React from 'react';
import { useTranslation } from 'react-i18next';
import './about.css';


const About = () => {
  const storeinfo = localStorage.getItem('isVerified');
  const isVerified = storeinfo === 'true';
  const { t } = useTranslation();

  return (
    <div className="about-us-container">
    <div className={`container mt-5 about-us ${!isVerified ? 'animate-center-out' : ''}`}>
     <h1 className="about-us-title"><strong>{t('aboutpage.about_us_title')}</strong></h1>
        <p className="about-us-text">
        {t('aboutpage.about_us_text_1')}
        </p>
        <h2 className="about-us-subtitle">{t('aboutpage.how_it_works_title')}</h2>
        <p className="about-us-text">
        {t('aboutpage.about_us_text_2')}
        </p>
        <ul className="about-us-list">
          <li><strong>{t('aboutpage.sign_up')}</strong>{t('aboutpage.sign_up_description')}</li>
          <li><strong>{t('aboutpage.participate_in_tasks')}</strong>{t('aboutpage.participate_in_tasks_description')}</li>
          <li><strong>{t('aboutpage.earn_cuan')}</strong>{t('aboutpage.earn_cuan_description')}</li>
          <li><strong>{t('aboutpage.redeem_rewards')}</strong> {t('aboutpage.redeem_rewards_description')}</li>
        </ul>
        <h2 className="about-us-subtitle">{t('aboutpage.why_choose_freecuan_title')}</h2>
        <p className="about-us-text">
          <strong>{t('aboutpage.flexibility')}</strong> {t('aboutpage.flexibility_description')}
        </p>
        <p className="about-us-text">
          <strong>{t('aboutpage.diverse_opportunities')}</strong> {t('aboutpage.diverse_opportunities_description')}
        </p>
        <p className="about-us-text">
          <strong>{t('aboutpage.transparency_and_fairness')}</strong> {t('aboutpage.transparency_and_fairness_description')}
        </p>
        <p className="about-us-text">
          <strong>{t('aboutpage.community_and_support')}</strong> {t('aboutpage.community_and_support_description')}
        </p>
        <h2 className="about-us-subtitle">{t('aboutpage.get_started_today_title')}</h2>
        <p className="about-us-text">
        {t('aboutpage.get_started_today_description')}
        </p>
    </div>
    </div>
  );
};

export default About;
