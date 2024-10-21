// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB0NmgZNNDlCZq3ibuv1rBpy0k7mk_MmPQ",
  authDomain: "books-functions.firebaseapp.com",
  projectId: "books-functions",
  storageBucket: "books-functions.appspot.com",
  messagingSenderId: "723632652151",
  appId: "1:723632652151:web:701a3a561c515af1f7eb72",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
