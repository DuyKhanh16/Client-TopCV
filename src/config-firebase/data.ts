// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdG-KcNuzoDeMZd-KqzCk4xfboO71a7IA",
  authDomain: "project5-73b7f.firebaseapp.com",
  projectId: "project5-73b7f",
  storageBucket: "project5-73b7f.appspot.com",
  messagingSenderId: "76252648884",
  appId: "1:76252648884:web:cfdc6b557260628ecf0ee1",
  measurementId: "G-G6VFPZ9CLP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;