import React, { useState } from 'react';
import './FAQ.css';

const faqs = [
  {
    q: "How do I join the Optimisticash affiliate program?",
    a: "It's easy! Just sign up on our affiliate page and get instant access to your unique referral link.",
  },
  {
    q: "How and when do I get paid?",
    a: "We send out payments every week via PayPal, Bitcoin, or other crypto wallets of your choice.",
  },
  {
    q: "Is there a minimum payout threshold?",
    a: "Yes, once you reach just $1 in earnings, you can request a payout anytime.",
  },
  {
    q: "How can I track my referrals and earnings?",
    a: "You’ll get a personalized affiliate dashboard with real-time tracking, clicks, sign-ups, and commission updates.",
  },
  {
    q: "What types of users convert best?",
    a: "Users interested in earning from surveys, playing games, and watching videos are our top converters. Focus on online hustle communities!",
  },
];


const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-5 ">
      <div className="container ">
        <h2 className="fw-bold section-aff-h2 text-center mb-4">Frequently Asked Questions</h2>
        <div className="accordion" id="faqAccordion">
          {faqs.map((faq, index) => (
            <div key={index} className="accordion-item  mb-2 rounded">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button bg-secondary text-white ${openIndex === index ? '' : 'collapsed'}`}
                  type="button"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  {faq.q}
                </button>
              </h2>
              <div className={`accordion-collapse collapse bg-secondary text-white ${openIndex === index ? 'show' : ''}`}>
                <div className="accordion-body  ">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
