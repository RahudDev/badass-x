import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './i18n'; // Import the i18n configuration
import 'bootstrap/dist/css/bootstrap.min.css';
require('dotenv').config();


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
