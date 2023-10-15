// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from  "firebase/firebase-auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaO1IFZaIvkx3Iej7dcMShprLLRXo8ilQ",
  authDomain: "phone-auth-383cc.firebaseapp.com",
  projectId: "phone-auth-383cc",
  storageBucket: "phone-auth-383cc.appspot.com",
  messagingSenderId: "831794771204",
  appId: "1:831794771204:web:6f0821784c173ecadecc51",
  measurementId: "G-GCY684B81W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Auth=getAuth(app)
export default app;