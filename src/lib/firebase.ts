
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBhNeEg_YjLDFTsxZxiPFgf9H0F-tKu7D8",
  authDomain: "campusconnect-99410.firebaseapp.com",
  projectId: "campusconnect-99410",
  storageBucket: "campusconnect-99410.firebasestorage.app",
  messagingSenderId: "166376175294",
  appId: "1:166376175294:web:f88254967102df69c950ef",
  measurementId: "G-HTHB0Y7D7E"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
