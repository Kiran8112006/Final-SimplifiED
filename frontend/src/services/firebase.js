// Firebase configuration and initialization for EchoNotes
// Initialize Firebase app with credentials from environment variables
// Export auth, firestore, and storage instances for use across app
// Configuration keys come from .env file with REACT_APP_ prefix
// Services needed: Authentication, Firestore Database, Cloud Storage

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration object
// Keys: apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId
const firebaseConfig = {
  apiKey: "AIzaSyD2KGIaO7IOaGnPdyc28thrMZIXKb5sgmk",
  authDomain: "simplified-e4089.firebaseapp.com",
  projectId: "simplified-e4089",
  storageBucket: "simplified-e4089.firebasestorage.app",
  messagingSenderId: "994877954242",
  appId: "1:994877954242:web:dfca2f88d2dabe7820c35b",
  measurementId: "G-3XBW0W3L35"
};

// Initialize Firebase app with config
const app = initializeApp(firebaseConfig);

// Initialize and export authentication service
export const auth = getAuth(app);

// Initialize and export Firestore database
export const db = getFirestore(app);

// Initialize and export Cloud Storage
export const storage = getStorage(app);

// Export Google auth provider for OAuth sign-in
export const googleProvider = new GoogleAuthProvider();