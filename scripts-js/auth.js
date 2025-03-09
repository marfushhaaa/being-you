// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFireStore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZakPH7Gpuic_leb01wEY26t5-GsApgeQ",
  authDomain: "being-you-339d8.firebaseapp.com",
  projectId: "being-you-339d8",
  storageBucket: "being-you-339d8.firebasestorage.app",
  messagingSenderId: "1080020512210",
  appId: "1:1080020512210:web:7d35509e9721ff42732c0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);