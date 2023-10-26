// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//   apiKey: "AIzaSyAaO1IFZaIvkx3Iej7dcMShprLLRXo8ilQ",
//   authDomain: "phone-auth-383cc.firebaseapp.com",
//   projectId: "phone-auth-383cc",
//   storageBucket: "phone-auth-383cc.appspot.com",
//   messagingSenderId: "831794771204",
//   appId: "1:831794771204:web:6f0821784c173ecadecc51",
//   measurementId: "G-GCY684B81W"
// };


const firebaseConfig = {
  apiKey: "AIzaSyBxxsEHaTeVaCYNXza8nM5jBOssUylrNf0",
  authDomain: "firststep-e9a03.firebaseapp.com",
  databaseURL: "https://firststep-e9a03.firebaseio.com",
  projectId: "firststep-e9a03",
  storageBucket: "firststep-e9a03.appspot.com",
  messagingSenderId: "935597825573",
  appId: "1:935597825573:web:9e412e905cc84d93b3e9cc",
  measurementId: "G-RLRCM9C9JF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
// export default app;