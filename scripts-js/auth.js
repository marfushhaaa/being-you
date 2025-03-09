// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
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

/**
 * Diese Function zeigt in unserem HTML eine Meldung
 */
function showMessage(message, divId){
   var messageDiv = document.getElementById(divId);
   messageDiv.style.display = "block";
   messageDiv.style.marginLeft = "auto";
   messageDiv.style.marginRight = "auto";
   messageDiv.style.width = "max-content";
   messageDiv.innerHTML = message;
   messageDiv.style.opacity = 1;
   setTimeout(function(){
      messageDiv.style.opacity = 0;
   }, 5000);
}


/**
 * Das ist ein SignUp method, that creates a user in a database "Firebase"
 */
const signUp = document.getElementById('submitSignUp');

signUp.addEventListener('click', (event)=> {
   event.preventDefault();
   const username = document.getElementById('rUsername').value;
   const email = document.getElementById('rEmail').value;
   const password = document.getElementById('rPassword').value;

   const auth = getAuth();
   const db = getFirestore(app);

   createUserWithEmailAndPassword(auth, email, password)
   .then((userCredential)=>{
      const user = userCredential.user;
      const userData={
         username: username,
         email: email,
         password: password
      };
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
      .then(()=>{
         showMessage('Account created successfully', 'signUpMessage');
         setTimeout(()=>{
            window.location.href = './../../pages/registration/index.html';
         }, 2000);
      })
      .catch((error)=>{
         console.error("Error while writing a document", error);
      });
   })
   .catch((error)=>{
      const errorCode = error.code;
      if(errorCode == 'auth/email-already-in-use'){
         showMessage('Email adress is already used!', 'signUpMessage');
      }
      else {
         showMessage('Unable to create a user', 'signUpMessage');
      }
   })

});