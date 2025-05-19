import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDOKbVT5CB6ogF-s5fDEOE2ACF4n8aJro8",
  authDomain: "bo-ok-c0e30.firebaseapp.com",
  projectId: "bo-ok-c0e30",
  storageBucket: "bo-ok-c0e30.firebasestorage.app",
  messagingSenderId: "268559290099",
  appId: "1:268559290099:web:c351028d91e7916a81f186"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
