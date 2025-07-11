
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBkXw5wX95D6-5jSG8caH2jrEn-EO0Rg_H2k",
  authDomain: "campusconnect-99410.firebaseapp.com",
  projectId: "campusconnect-99410",
  storageBucket: "campusconnect-99410.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
