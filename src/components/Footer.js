import React, { useState, useRef, useEffect, useMemo } from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import { HandlePageClick } from '../App';


const Footer = () => {
  const contactSectionRef = useRef(null);
  const navigate = useNavigate();

  const { t, i18n } = useTranslation(); // Initialize translation


  const languageOptions = useMemo(() => ({
    en: 'https://od.lk/s/NjFfODU2NzMwMzFf/uk%20flag.jpg',
    es: 'https://od.lk/s/NjFfODU2NzM4MDRf/espanolflag.jpg',
    fr: 'https://od.lk/s/NjFfODU2NzM4OTJf/francisflag.jpg',
    de: 'https://od.lk/s/NjFfODU2NzM4Nzhf/germanflag.jpg',
    zh: 'https://od.lk/s/NjFfODU2NzQwNTVf/chinaflag.jpg',
    ja: 'https://od.lk/s/NjFfODU2NzQwNTdf/japan%20flag.jpg',
    ko: 'https://od.lk/s/NjFfODU2NzQwNTlf/koreanflag.jpg',
    ru: 'https://od.lk/s/NjFfODU2NzQwNjVf/russianflag.jpg',
    pt: 'https://od.lk/s/NjFfODU2NzQwNjdf/portugalflag.jpg',
    it: 'https://od.lk/s/NjFfODU2NzQwNzFf/italianflag.jpg',
    ar: 'https://od.lk/s/NjFfODU2NzQwNzVf/arabicflag.jpg',
    hi: 'https://od.lk/s/NjFfODU2NzQxMDZf/hindiflag.jpg',
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
          <img src="https://od.lk/s/NjFfODYyMjI4NzRf/x%20logo%203.webp" alt="X" />
          <span></span>
          </a>
          </li>
          <li>
          <a href="https://www.facebook.com/freecuansite" className='app-link'>
          <img src="https://od.lk/s/NjFfODYyMjI4NzZf/facebook2.webp" alt="facebook" />
          <span></span>
          </a>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h4><strong>{t('ourApp')}</strong></h4>
        <ul className="app-links">
         <li><a href="link_to_google_play" className="app-link">
         <img src="https://od.lk/s/NjFfODU2NzMxMTJf/google%20play%20logo-Photoroom.png" alt="Google Play" />
        <span></span>
         </a>
         </li>
         
             </ul>
      </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p><a href="#/terms-of-service" onClick={(e) => HandlePageClick(e, '/terms-of-service',contactSectionRef, navigate)}>{t('termsOfService')}</a> | <a href="#/privacy-policy" onClick={(e) => HandlePageClick(e, '/privacy-policy',contactSectionRef, navigate)}>{t('privacyPolicy')}</a></p>
      <p>&copy;{t('copyright')}</p>
    </div>
  </footer>
   )
  };

export default Footer;
