import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {

  apiKey: "AIzaSyC8osUuIoSbzj3BkwsdwnCVEAT5c1XCTnM",

  authDomain: "repar-ar.firebaseapp.com",

  projectId: "repar-ar",

  storageBucket: "repar-ar.firebasestorage.app",

  messagingSenderId: "770638189779",

  appId: "1:770638189779:web:1702367a79cdf75cabb026",

  measurementId: "G-3ZTLFEZRWB"

};



export const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
