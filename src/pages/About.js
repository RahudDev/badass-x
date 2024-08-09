import React from 'react';
import './about.css';


const About = () => {
  const storeinfo = localStorage.getItem('isVerified');
  const isVerified = storeinfo === 'true';

  return (
    <div className={`container mt-5 shadow-sm about-us ${!isVerified ? 'animate-slide' : ''}`}>
      <h1>About Us</h1>
      <p>FreeCuan is a platform where you can earn rewards by completing tasks such as surveys, watching videos, and more.</p>
    </div>
  );
};

export default About;
