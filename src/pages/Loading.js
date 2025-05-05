import React from 'react';
import './Loading.css'; // Move the CSS styles to a separate file

const LoadingPage = () => {
  return (
    <div className='loading-container-google align-items-center justify-content-center min-vh-100'>
      <div className="spinner-google"></div>
      <div className="loading-text-google">Loading, Cuan waiting...</div>
    </div>
  );
};

export default LoadingPage;
