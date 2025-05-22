// Import Firebase dependencies
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { Analytics, getAnalytics } from "firebase/analytics";

// Firebase configuration from the user
const firebaseConfig = {
  apiKey: "AIzaSyD16jUItodB5W86V5KUVsioj794aoppGMc",
  authDomain: "trabajodignoco.firebaseapp.com",
  projectId: "trabajodignoco",
  storageBucket: "trabajodignoco.firebasestorage.app",
  messagingSenderId: "999052025744",
  appId: "1:999052025744:web:a086c5ff21086261c99d15",
  measurementId: "G-E58HTHW8CL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics safely
const getAnalyticsInstance = (): Analytics | null => {
  if (typeof window !== 'undefined') {
    try {
      return getAnalytics(app);
    } catch (error) {
      console.error('Analytics initialization failed:', error);
      return null;
    }
  }
  return null;
};

const analytics = getAnalyticsInstance();

export { app, db, analytics }; 