// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import {
  getFirestore,
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

  /**
   * Diese Funktion speichert die ausgewählte Categorien in Firebase mit Nutzer
   */
  onAuthStateChanged(auth, async (user) => {
    if (user) {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData.categories) {
                userData.categories.forEach(category => {
                    const checkbox = document.querySelector(`input[value="${category}"]`);
                    if (checkbox) checkbox.checked = true;
                });
            }
        }
    } else {
        window.location.href = "./create-account.html"; //wenn user ist noch nicht eingeloggt
    }
  });
  document.getElementById("saveCategories").addEventListener("click", async () => {
    const checkboxes = document.querySelectorAll("input[name='categories']:checked");
    const selectedCategories = Array.from(checkboxes).map(cb => cb.value);

    try {
        const user = auth.currentUser;
        if (!user) {
            showMessage("User not found!!", "categoriesMessage");
            return;
        }

        await setDoc(doc(db, "users", user.uid), { categories: selectedCategories }, { merge: true });

        showMessage("Categories saved successfuly!", "categoriesMessage");
        setTimeout(
         ()=>
            (window.location.href = "./../main/index.html"),
         2000
        );
    } catch (error) {
        console.error("Fehler beim speichern:", error);
    }
  });
});
