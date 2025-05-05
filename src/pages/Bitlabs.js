import React, { useEffect, useState } from 'react';
import { TOKENBITLABS } from '../config';

function Bitlabs() {
  const [surveyURL, setSurveyURL] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const uniqueUserID = localStorage.getItem('uuid');
    const Token_API = TOKENBITLABS;
    const surveyURL = `https://web.bitlabs.ai/?uid=${uniqueUserID}&token=${Token_API}`;
    setSurveyURL(surveyURL);
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading &&  <div className='loading-container-google align-items-center justify-content-center min-vh-100'>
      <div className="spinner-google"></div>
      <div className="loading-text-google">Fetching BitLabs...</div>
    </div> }
      {surveyURL && (
        <iframe
          width="100%"
          height="1000px"
          src={surveyURL}
          title="Survey"
          className= "cpx-research-frame"
          onLoad={handleIframeLoad}
          style={{ display: isLoading ? 'none' : 'block', border: 'none' }}
        ></iframe>
      )}
    </div>
  );
}

export default Bitlabs;
