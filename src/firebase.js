// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { API_KEY_FIREBASE, AUTH_DOMAIN_FIREBASE, PROJECT_ID_FIREBASE, STORAGEBUCKET_FIREBASE, MESSAGING_SENDERID_FIREBASE, APPID_FIREBASE, MEASUREMENTID_FIREBASE } from './config';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: API_KEY_FIREBASE,
    authDomain: AUTH_DOMAIN_FIREBASE,
    projectId: PROJECT_ID_FIREBASE,
    storageBucket: STORAGEBUCKET_FIREBASE,
    messagingSenderId: MESSAGING_SENDERID_FIREBASE,
    appId: APPID_FIREBASE,
    measurementId: MEASUREMENTID_FIREBASE
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('Firebase initialized successfully.');
console.log('Firebase App Name:', app.name); // Should print "[DEFAULT]"

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

console.log('Firebase Auth initialized successfully');
console.log('Firestore initialized successfully');

export { auth, db };
