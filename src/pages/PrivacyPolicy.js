
import React, {useRef} from 'react';
import './PrivacyPolicy.css'; 
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HandlePageClick } from '../App';

const PrivacyPolicy = () => {
  const storeinfo = localStorage.getItem('isVerified');
  const isVerified = storeinfo === 'true';
  const contactSectionRef = useRef(null);
  const { t } = useTranslation();
  const info_collect = t('privacy.information_we_collect_list', { returnObjects: true });
  const weuse_yourinfo = t('privacy.how_we_use_your_information_list', { returnObjects: true });
  const weuse_shareinfo = t('privacy.how_we_share_your_information_list', { returnObjects: true });
  const yourchoice = t('privacy.your_choices_and_rights_list', { returnObjects: true });
  const navigate = useNavigate();

  return (
    <div className="container-privacy">
    <div className={`container mt-5 privacy ${!isVerified ? 'animate-center-out' : ''}`}>
      <h1 className="privacy-us-title"><strong>{t('privacy.privacy_policy_title')}</strong></h1>
      <p className="privacy-us-text">
      {t('privacy.privacy_policy_intro')}
      </p>

      <h2 className="privacy-us-subtitle">{t('privacy.information_we_collect_title')}</h2>
      <p className="privacy-us-text">
       {t('privacy.information_we_collect_text')}
      </p>
      <ul className="privacy-us-list">
        <li><strong>{info_collect[0].title}</strong>{info_collect[0].description}</li>
        <li><strong>{info_collect[1].title}</strong>{info_collect[1].description}</li>
        <li><strong>{info_collect[2].title}</strong> {info_collect[2].description}</li>
        <li><strong>{info_collect[3].title}</strong>{info_collect[3].description}</li>
      </ul>

      <h2 className="privacy-us-subtitle">{t('privacy.how_we_use_your_information_title')}</h2>
      <p className="privacy-us-text">
        {t('privacy.how_we_use_your_information_text')}
      </p>
      <ul className="privacy-us-list">
        <li><strong>{weuse_yourinfo[0].title}</strong> {weuse_yourinfo[0].description}</li>
        <li><strong>{weuse_yourinfo[1].title}</strong> {weuse_yourinfo[1].description}</li>
        <li><strong>{weuse_yourinfo[2].title}</strong> {weuse_yourinfo[2].description}</li>
        <li><strong>{weuse_yourinfo[3].title}</strong> {weuse_yourinfo[3].description}</li>
      </ul>

      <h2 className="privacy-us-subtitle">{t('privacy.how_we_share_your_information_title')}</h2>
      <p className="privacy-us-text">
        {t('privacy.how_we_share_your_information_text')}
      </p>
      <ul className="privacy-us-list">
        <li><strong>{weuse_shareinfo[0].title}</strong> {weuse_shareinfo[0].description}</li>
        <li><strong>{weuse_shareinfo[1].title}</strong> {weuse_shareinfo[1].description}</li>
        <li><strong>{weuse_shareinfo[2].title}</strong> {weuse_shareinfo[2].description}</li>
      </ul>

      <h2 className="privacy-us-subtitle">{t('privacy.your_choices_and_rights_title')}</h2>
      <p className="privacy-us-text">
        {t('privacy.your_choices_and_rights_text')}
      </p>
      <ul className="privacy-us-list">
        <li><strong>{yourchoice[0].title}</strong> {yourchoice[0].description}</li>
        <li><strong>{yourchoice[1].title}</strong> {yourchoice[1].description}</li>
        <li><strong>{yourchoice[2].title}</strong> {yourchoice[2].description}</li>
      </ul>

      <h2 className="privacy-us-subtitle">{t('privacy.data_security_title')}</h2>
      <p className="privacy-us-text">
      {t('privacy.data_security_text')}
      </p>

      <h2 className="privacy-us-subtitle">{t('privacy.childrens_privacy_title')}</h2>
      <p className="privacy-us-text">
      {t('privacy.childrens_privacy_text')}
      </p>

      <h2 className="privacy-us-subtitle">{t('privacy.changes_to_privacy_policy_title')}</h2>
      <p className="privacy-us-text">
      {t('privacy.changes_to_privacy_policy_text')}
      </p>

      <h2 className="privacy-us-subtitle">{t('privacy.contact_us_title')}</h2>
      <p className="privacy-us-text">
        {t('privacy.contact_us_text')} <a href="#/contact-us" onClick={(e) => HandlePageClick(e, '/contact-us', contactSectionRef, navigate)}>{t('privacy.contact')}</a>. {t('privacy.contact_us_text_2')}
      </p>

      <p className="privacy-us-text">
       {t('privacy.thank_you_text')}
      </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
