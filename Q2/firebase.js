// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6yxc-XF4qT8csLktTCpH0H4TxUG5KUrY",
  authDomain: "dsw02b2-ec111.firebaseapp.com",
  projectId: "dsw02b2-ec111",
  storageBucket: "dsw02b2-ec111.firebasestorage.app",
  messagingSenderId: "661481028508",
  appId: "1:661481028508:web:8af85d9daa43052f902659",
  measurementId: "G-8RDQY7QR42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);