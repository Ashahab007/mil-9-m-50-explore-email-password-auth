import { getAuth } from "firebase/auth";

// 2.0 create firebase.init.js
// 2.1 In firebase site create a firebase project from get started => name your project name
// 2.3 go to authentication => sign in method tab => Email/Password => enable it => save
// 2.4 again go to ur project => web => registar App => name ur app & registar
// 2.5 after register it redirects the page now use npm to install and copy the code below npm & paste it here

// 2.6 paste
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdwu_vlKnWvL1ihOFA2HQ0x-04fnU10KA",
  authDomain: "email-password-auth-68da5.firebaseapp.com",
  projectId: "email-password-auth-68da5",
  storageBucket: "email-password-auth-68da5.firebasestorage.app",
  messagingSenderId: "1029039954947",
  appId: "1:1029039954947:web:dd089cc71666357e22c236",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2.7 now copy const auth = getAuth(app) from get started and export it
export const auth = getAuth(app);
