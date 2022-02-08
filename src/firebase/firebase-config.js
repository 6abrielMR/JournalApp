import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBs9jJKC89FytmEgAKtsX3XHZIKVCgGEL4",
  authDomain: "journal-app-ac8b3.firebaseapp.com",
  projectId: "journal-app-ac8b3",
  storageBucket: "journal-app-ac8b3.appspot.com",
  messagingSenderId: "834350628695",
  appId: "1:834350628695:web:ea86d3b5009449cbe3c812",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export { db, googleAuthProvider };
