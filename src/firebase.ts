// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJH_pp9CaIssezaeYlmjvJR2ysxLOOx6o",
  authDomain: "infiniteiterators.firebaseapp.com",
  projectId: "infiniteiterators",
  storageBucket: "infiniteiterators.appspot.com",
  messagingSenderId: "711368546990",
  appId: "1:711368546990:web:7dcac5c738eb2b8e0d2b3f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
