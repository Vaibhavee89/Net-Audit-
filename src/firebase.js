// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCphQ4LRvQTCf7ezm_EbIYbUi8ncf2nQl0",
  authDomain: "net-audit.firebaseapp.com",
  projectId: "net-audit",
  storageBucket: "net-audit.firebasestorage.app",
  messagingSenderId: "342114054245",
  appId: "1:342114054245:web:e349c2e1e303caa8d8568c",
  measurementId: "G-JQ5PF66X4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Auth
export const auth = getAuth(app);