import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Add your Firebase config here
  apiKey: "api-key",
  authDomain: "domain.firebaseapp.com",
  projectId: "project-id",
  storageBucket: "bucket.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Configure GitHub Auth Provider
auth.useDeviceLanguage(); 
