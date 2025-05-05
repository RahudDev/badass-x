import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { key, decryptData } from '../App';
import { Capacitor } from '@capacitor/core';
import axios from 'axios';
import { API_URL } from '../App';
import { Plugins } from '@capacitor/core';
const { GoogleAuth } = Plugins;

const GoogleAuthHandler = ({ isLoading }) => {
  const [clientId, setClientId] = useState('');
  const [error, setError] = useState('');
  const { t } = useTranslation();

  // Android-specific sign-in
  async function signInWithAndroid() {
    try {
      const result = await GoogleAuth.signIn();
      return result.authentication.idToken;
    } catch (error) {
      console.error('Android sign-in failed:', error);
      setError('Android sign-in failed. Please try again.');
    }
  }

  // Fetch Google Client ID when component mounts
  useEffect(() => {
    const fetchClientId = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/google-signup`);
        const decryptedClientId = decryptData(response.data.clientId, key);
        setClientId(decryptedClientId);
      } catch (err) {
        console.error('Error fetching Google Client ID:', err);
        setError('Failed to load Google Client ID.');
      }
    };

    fetchClientId();
  }, []);

  const handleClickButton = async () => {
    if (!clientId) {
      setError('Google Client ID is not loaded.');
      return;
    }

    try {
      if (Capacitor.getPlatform() === 'android') {
        const accessToken = await signInWithAndroid();
        await sendAccessTokenToServer(accessToken);
      } else {
        // Web flow
        const redirectUri = encodeURIComponent(window.location.origin + '/?loading');
        const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=profile email&include_granted_scopes=true`;
        window.location.href = googleUrl;
      }
    } catch (err) {
      console.error('Error during sign-in:', err);
      setError('Google sign-in failed.');
    }
  };

  const sendAccessTokenToServer = async (accessToken) => {
    try {
      await axios.post(`${API_URL}/api/google-auth`, { accessToken });
      console.log('Access token sent to the server successfully');
    } catch (err) {
      console.error('Error sending access token to server:', err);
      setError('Failed to authenticate with server.');
    }
  };

  return (
    <div>
      <button
        onClick={handleClickButton}
        className="btn btn-danger w-100 mt-2"
        disabled={isLoading || !clientId}
      >
        {t('login_page.continue_with_google')}
      </button>
      {error && <p>{error}</p>}
      {isLoading && (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default GoogleAuthHandler;
