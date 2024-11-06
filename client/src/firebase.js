// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-45388.firebaseapp.com",
  projectId: "mern-estate-45388",
  storageBucket: "mern-estate-45388.firebasestorage.app",
  messagingSenderId: "879497059791",
  appId: "1:879497059791:web:a80a437ea0b65b917086ba"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);