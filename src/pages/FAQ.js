// src/components/FAQ.js
import React, { useState, useEffect, useRef } from 'react';
import './FAQ.css';
import { useTranslation } from 'react-i18next';


const FAQ = () => {
  const faqRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const storeinfo = localStorage.getItem('isVerified');
  const isVerified = storeinfo === 'true';
  const { t } = useTranslation();
  const faq = t('faq_user', { returnObjects: true });

  useEffect(() => {
    const handleScroll = () => {
      const element = faqRef.current;
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

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: faq[0].question,
      answer: faq[0].answer
    },
    {
      question: faq[1].question,
      answer: faq[1].answer
    },
    {
      question: faq[2].question,
      answer: faq[2].answer
    },
    {
      question: faq[3].question,
      answer: faq[3].answer
    },
    {
      question: faq[4].question,
      answer: faq[4].answer
    },
    {
      question: faq[5].question,
      answer: faq[5].answer
    }
  ];

  return (
    <section ref={faqRef} className={`faq-section my-5 ${!isVerified ? 'animate-scroll' : ''}`}>
      <div className="container">
        <h2 className="text-center mb-4">{t('faq_heading')}</h2>
        <div className="accordion" id="faqAccordion">
          {faqData.map((item, index) => (
            <div key={index} className="card">
              <div className="card-header" onClick={() => toggleAnswer(index)}>
                <h5 className="mb-0">
                  {item.question}
                  <span className="faq-icon">{activeIndex === index ? '-' : '+'}</span>
                </h5>
              </div>
              <div className={`collapse ${activeIndex === index ? 'show' : ''}`}>
                <div className="card-body">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
