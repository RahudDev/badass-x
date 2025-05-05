
import React, {useRef} from 'react';
import './TermsOfService.css'; 
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HandlePageClick } from '../App';

const TermsOfService = () => {
  const storeinfo = localStorage.getItem('isVerified');
  const isVerified = storeinfo === 'true';
  const contactSectionRef = useRef(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="container-terms mt-5">
      <div className={`container mt-5 terms ${!isVerified ? 'animate-center-out' : ''}`}>
      <h1 className="terms-us-title"><strong>{t('terms.terms_of_service_title')}</strong></h1>
      <p className="terms-us-text">
      {t('terms.terms_of_service_intro')}
      </p>

      <h2 className="terms-us-subtitle">{t('terms.acceptance_of_terms_title')}</h2>
      <p className="terms-us-text">
      {t('terms.acceptance_of_terms_text')}
      </p>

      <h2 className="terms-us-subtitle">{t('terms.service_description_title')}</h2>
      <p className="terms-us-text">
      {t('terms.service_description_text')}
      </p>

      <h2 className="terms-us-subtitle">{t('terms.account_registration_title')}</h2>
      <p className="terms-us-text">
      {t('terms.account_registration_text')}
      </p>

      <h2 className="terms-us-subtitle">{t('terms.user_obligations_title')}</h2>
      <p className="terms-us-text">
      {t('terms.user_obligations_text')}
      </p>

      <h2 className="terms-us-subtitle">{t('terms.rewards_and_redemption_title')}</h2>
      <p className="terms-us-text">
      {t('terms.rewards_and_redemption_text')}
      </p>

      <h2 className="terms-us-subtitle">{t('terms.content_and_intellectual_property_title')}</h2>
      <p className="terms-us-text">
      {t('terms.content_and_intellectual_property_text')}
      </p>

      <h2 className="terms-us-subtitle">{t('terms.termination_title')}</h2>
      <p className="terms-us-text">
      {t('terms.termination_text')}
      </p>

      <h2 className="terms-us-subtitle">{t('terms.disclaimers_and_limitation_of_liability_title')}</h2>
      <p className="terms-us-text">
      {t('terms.disclaimers_and_limitation_of_liability_text')}
      </p>

      <h2 className="terms-us-subtitle">{t('terms.changes_to_terms_title')}</h2>
      <p className="terms-us-text">
      {t('terms.changes_to_terms_text')}
      </p>

      <h2 className="terms-us-subtitle">{t('terms.contact_information_title')}</h2>
      <p className="terms-us-text">
        {t('terms.contact_information_text')} <a href="#/contact-us" onClick={(e) => HandlePageClick(e, '/contact-us', contactSectionRef, navigate)}>{t('terms.contact')}</a>.
      </p>

      <p className="terms-us-text">
        {t('terms.thank_you_text')}
      </p>
    </div>
    </div>
  );
};

export default TermsOfService;
