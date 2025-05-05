import React, { useEffect, useState } from 'react';
import { APIKEY_NOTIK, PUBID_NOTIK, APPID_NOTIK } from '../config';

function NotikIframe() {
  const [iframeURL, setIframeURL] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user_id = localStorage.getItem('uuid');
    const apiKey = APIKEY_NOTIK; // Replace with your actual API key
    const pubId = PUBID_NOTIK; // Replace with your actual Publisher ID
    const appId = APPID_NOTIK; // Replace with your actual App ID

    if (user_id) {
      const url = `https://notik.me/coins?api_key=${apiKey}&pub_id=${pubId}&app_id=${appId}&user_id=${user_id}`;
      setIframeURL(url);
    } else {
      console.error('User ID is missing. Unable to load Notik iframe.');
    }
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && (
        <div className="loading-container-google align-items-center justify-content-center min-vh-100">
          <div className="spinner-google"></div>
          <div className="loading-text">Fetching Notik...</div>
        </div>
      )}
      {iframeURL && (
        <iframe
          width="100%"
          height="1000px"
          src={iframeURL}
          title="Notik Offers"
           className= "cpx-research-frame"
          onLoad={handleIframeLoad}
          style={{
            display: isLoading ? 'none' : 'block',
            border: 'none',
          }}
        ></iframe>
      )}
    </div>
  );
}

export default NotikIframe;
