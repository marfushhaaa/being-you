// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

/**
 * Diese Function zeigt in unserem HTML eine Meldung
 */
function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.style.marginLeft = "auto";
  messageDiv.style.marginRight = "auto";
  messageDiv.style.width = "max-content";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
  const auth = getAuth(app);
  const db = getFirestore(app);

  /**
   * Das ist ein SignUp method, that creates a user in a database "Firebase"
   */
  const signUp = document.getElementById("submitSignUp");
  if (signUp) {
    signUp.addEventListener("click", async (event) => {
      event.preventDefault();

      const username = document.getElementById("rUsername").value;
      const email = document.getElementById("rEmail").value;
      const password = document.getElementById("rPassword").value;

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        //POST Anfrage
        await setDoc(doc(db, "users", user.uid), { username, email, password });

        showMessage("Account created successfully", "signUpMessage");

        console.log("POST request sent to Firebase Auth:", email);
        setTimeout(
          () =>
            (window.location.href = "./../../pages/registration/index.html"),
          2000
        );
      } catch (error) {
        console.error("Registration error:", error.code, error.message);
        showMessage(
          error.code === "auth/email-already-in-use"
            ? "Email address is already used!"
            : "Unable to create a user",
          "signUpMessage"
        );
      }
    });
  }

  /**
   * Das ist eine LogIn Methode
   */
  const signIn = document.getElementById("submitLogIn");
  if (signIn) {
    signIn.addEventListener("click", async (event) => {
      event.preventDefault();

      const email = document.getElementById("sEmail").value;
      const password = document.getElementById("sPassword").value;

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        showMessage("Login successful!", "signInMessage");
        localStorage.setItem("loggedInUserId", user.uid);

        setTimeout(
          () => (window.location.href = "./../../pages/user/index.html"),
          1500
        );
      } catch (error) {
        console.error("Login error:", error.code, error.message);
        showMessage(
          error.code === "auth/invalid-credential"
            ? "Incorrect Email or Password"
            : "Account doesn’t exist or an error occurred",
          "signInMessage"
        );
      }
    });
  }
});
