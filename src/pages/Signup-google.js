import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { key, decryptData } from '../App';
import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';


import axios from 'axios';
import { API_URL } from '../App';

const GoogleAuthHandler = ({isLoading }) => {
  const [clientId, setClientId] = useState('');
  const [ error,setError] = useState('');
  const { t } = useTranslation();

  // Fetch Google Client ID when component mounts
  useEffect(() => {
    const fetchClientId = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/google-signup`);
        const clientId_ = decryptData(response.data.clientId, key);
        setClientId(clientId_);
      } catch (err) {
        console.error('Error fetching Google Client ID:', err);
        setError('Failed to load Google Client ID.');
      }
    };

    fetchClientId();
  }, [setError]);

  // Handle Google OAuth button click
  const handleClickButton = async () => {
    // Encode the redirect URI
    const redirectUri = encodeURIComponent(window.location.origin + '/?loading');
    const scope = 'profile email';
    const referralCode = localStorage.getItem('referralCode');

    // Create the Google OAuth URL
    let googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}&include_granted_scopes=true`;

    // Add referral code if it exists
    if (referralCode) {
        googleUrl += `&state=${encodeURIComponent(referralCode)}`;
    }

    // Check if the platform is Android
    if (Capacitor.getPlatform() === 'android') {
        // Use Capacitor Browser to open the URL in an in-app browser
        await Browser.open({ url: googleUrl });
    } else {
        // For web/desktop, use window.location.href to redirect
        window.location.href = googleUrl;
    }
};
  
  return (
    <div>
      <button
        onClick={handleClickButton}
        className="btn btn-danger w-100 mt-2"
        disabled={isLoading} // Disable button while loading
      >
        {t('login_page.continue_with_google')}
      </button>
      {error && <p>{error}</p>}
      {isLoading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default GoogleAuthHandler;
