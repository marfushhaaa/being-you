// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import {
  getFirestore,
  arrayUnion,
  updateDoc,
  getDoc,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";


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
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
  const auth = getAuth(app);
  const db = getFirestore(app);

  // Warte auf Authentifizierung
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "./create-account.html";
    } else {
      // Event-Listener für alle Community-Buttons
      document.querySelectorAll(".community-button").forEach(button => {
        button.addEventListener("click", async () => {
          const communityId = button.getAttribute("community-id");
          if (!communityId) {
            showMessage("Keine Community-ID gefunden!", "communitiesMessage");
            return;
          }

          try {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
              communities: arrayUnion(communityId)
            });

            showMessage("Community erfolgreich hinzugefügt!", "communitiesMessage");
          } catch (error) {
            console.error("Fehler beim Hinzufügen der Community:", error);
            showMessage("Fehler beim Speichern", "communitiesMessage");
          }
        });
      });
    }
  });
});
/**
 * Doppelte Einträge werden vermieden durch arrayUnion
 * Nur das Feld communities wird aktualisiert dank updateDoc
 */