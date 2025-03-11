import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import {
  getFirestore,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyCZakPH7Gpuic_leb01wEY26t5-GsApgeQ",
   authDomain: "being-you-339d8.firebaseapp.com",
   projectId: "being-you-339d8",
   storageBucket: "being-you-339d8.firebasestorage.app",
   messagingSenderId: "1080020512210",
   appId: "1:1080020512210:web:7d35509e9721ff42732c0b",
 };
 
 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 const auth = getAuth();
 const db = getFirestore();


 /**
  * Diese Methode zeigt im HTML den eingeloggten Usercredentials
  */
 onAuthStateChanged(auth, (user)=>{
   const loggedInUserId = localStorage.getItem('loggedInUserId');
   if(loggedInUserId){
      const docRef = doc(db, "users", loggedInUserId);
      getDoc(docRef)
      .then((docSnap)=>{
         if(docSnap.exists()){
            const userData = docSnap.data();
            document.getElementById('loggedUserUsername').innerText = userData.username;
            document.getElementById('loggedUserEmail').innerText = userData.email;
         }
         else {
            console.log("no document found matching id");
         }
      })
      .catch((error)=>{
         console.log("Error getting document");
      })
   }
   else {
      console.log("user id not found in storage");
   }
 })