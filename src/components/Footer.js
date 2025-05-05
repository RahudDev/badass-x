import React, { useState, useRef, useEffect, useMemo } from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import { HandlePageClick } from '../App';
import CrispWidgetToggle from '../pages/togglelivechat';
import en_flag from './assets/uk_flag.jpg';
import es_flag from './assets/espanol_flag.jpg';
import fr_flag from './assets/francis_flag.jpg';
import de_flag from './assets/german_flag.jpg';
import zh_flag from './assets/china_flag.jpg';
import ja_flag from './assets/japan_flag.jpg';
import ko_flag from './assets/korean_flag.jpg';
import ru_flag from './assets/russian_flag.jpg';
import pt_flag from './assets/portugal_flag.jpg';
import it_flag from './assets/italian_flag.jpg';
import ar_flag from './assets/arabic_flag.jpg';
import hi_flag from './assets/hindi_flag.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter, faGooglePlay  } from '@fortawesome/free-brands-svg-icons';



const Footer = () => {
  const contactSectionRef = useRef(null);
  const navigate = useNavigate();

  const { t, i18n } = useTranslation(); // Initialize translation


  const languageOptions = useMemo(() => ({
    en: en_flag,
    es: es_flag,
    fr: fr_flag,
    de: de_flag,
    zh: zh_flag,
    ja: ja_flag,
    ko: ko_flag,
    ru: ru_flag,
    pt: pt_flag,
    it: it_flag,
    ar: ar_flag,
    hi: hi_flag,
  }), []);


  // State to manage the selected language and image path
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [imageSrc, setImageSrc] = useState(languageOptions.en);

  useEffect(() => {
    // Load the saved language from local storage or default to 'en'
    const savedLanguage = localStorage.getItem('language') || 'en';
    setSelectedLanguage(savedLanguage);
    setImageSrc(languageOptions[savedLanguage]);
    i18n.changeLanguage(savedLanguage);
  }, [i18n, languageOptions]);

  // Handle language change
  const handleLanguageChange = (event) => {
    const language = event.target.value;
    setSelectedLanguage(language);
    setImageSrc(languageOptions[language]);
    i18n.changeLanguage(language);
    localStorage.setItem('language', language); // Save the selected language
  };

   return (
  <footer>
    <div className="footer-container">
    <div className="footer-sections-wrapper">
      <div className="footer-section">
      <h4><strong>{t('language')}</strong></h4>
        <div className="language">
      <img src={imageSrc} alt={selectedLanguage} />
      <select value={selectedLanguage} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
        <option value="zh">中文</option>
        <option value="ja">日本語</option>
        <option value="ko">한국어</option>
        <option value="ru">Русский</option>
        <option value="pt">Português</option>
        <option value="it">Italiano</option>
        <option value="ar">العربية</option>
        <option value="hi">Hindi</option>
      </select>
    </div>
      </div>
      <div className="footer-section">
        <h4><strong>{t('support')}</strong></h4>
        <ul>
        <li><a href="#/about" onClick={(e) => HandlePageClick(e, '/about', contactSectionRef, navigate)}>{t('about_us')}</a></li>
          <li><a href="#/faq" onClick={(e) => HandlePageClick(e, '/faq',contactSectionRef, navigate)}>{t('faq')}</a></li>
          <li><a href="#/contact-us" onClick={(e) => HandlePageClick(e, '/contact-us', contactSectionRef, navigate)}>{t('contactUs')}</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4><strong>{t('followUs')}</strong></h4>
        <ul className="app-links">
          <li>
          <a href="https://x.com/freecuansite" className='app-link'>
          <FontAwesomeIcon icon={faTwitter} className='icon_media' />
          <span></span>
          </a>
          </li>
          <li>
          <a href="https://www.facebook.com/freecuansite" className='app-link'>
          <FontAwesomeIcon icon={faFacebook} className='icon_media'/>
          <span></span>
          </a>
          </li>
          <li>
          <a href="https://www.instagram.com/freecuansite" className='app-link'>
          <FontAwesomeIcon icon={faInstagram} className='icon_media' />
          <span></span>
          </a>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h4><strong>{t('ourApp')}</strong></h4>
        <ul className="app-links">
         <li><a href="https://www.paypal.com/ncp/payment/43QCPXN9PBA42" className="app-link">
         <FontAwesomeIcon icon={faGooglePlay} className='icon_media_app' />
        <span></span>
         </a>
         </li>
         
             </ul>
      </div>
      </div>
    </div>
  
  <div className='chat-live-crisp' style={{ position: 'relative', width: '100%', padding: '20px 0' }}>
  <h3><strong>Help Chat</strong></h3>
  <CrispWidgetToggle />
   </div>


    <div className="footer-bottom">
      <p><a href="#/terms-of-service" onClick={(e) => HandlePageClick(e, '/terms-of-service',contactSectionRef, navigate)}>{t('termsOfService')}</a> | <a href="#/privacy-policy" onClick={(e) => HandlePageClick(e, '/privacy-policy',contactSectionRef, navigate)}>{t('privacyPolicy')}</a></p>
      <p>&copy;{t('copyright')}</p>
    </div>
  </footer>
   )
  };

export default Footer;
