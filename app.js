import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, query, orderBy, where, onSnapshot, getDocs, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";
const firebaseConfig = {
    apiKey: "AIzaSyDLbECF-2tPMjpLHu77DwxPOThFXt4cL5U",
    authDomain: "project-1-15e3e.firebaseapp.com",
    projectId: "project-1-15e3e",
    storageBucket: "project-1-15e3e.appspot.com",
    messagingSenderId: "1063919827502",
    appId: "1:1063919827502:web:8230d2f97f912648d57dbf",
    measurementId: "G-NZ32H3T8FJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage();



const logoutBtn = document.getElementById("logout-btn")

logoutBtn && logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        localStorage.clear()
        location.href = "index.html"
    }).catch((error) => {
      console.log("err....>",err)
    });

})



const registerBtn = document.getElementById('register-btn');

registerBtn && registerBtn.addEventListener("click", (e) => {
    e.preventDefault()
    let fullName = document.getElementById("fullName")
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(async (userCredential) => {
            try {
                const user = userCredential.user;
                await setDoc(doc(db, "users", user.uid), {
                    fullName: fullName.value,
                    email: email.value,
                    password: password.value
                });
                Swal.fire({
                    icon: 'success',
                    title: 'User register successfully',
                })
                localStorage.setItem("uid", user.uid)
                location.href = "dashboard.html"
            } catch (err) {
                console.log("err....>",err)
            }
        })
        .catch((error) => {
            const errorMessage = error.message;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorMessage,
            })
        });
})


const loginBtn = document.getElementById('login-btn');

loginBtn && loginBtn.addEventListener("click", (e) => {
    e.preventDefault()
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then(async (userCredential) => {
            try {
                Swal.fire({
                    icon: 'success',
                    title: 'User login successfully',
                })
                localStorage.setItem("uid", userCredential.user.uid)
                location.href = "dashboard.html"
            } catch (err) {
                console.log(err)
            }
        })
        .catch((error) => {
            const errorMessage = error.message;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorMessage,
            })
        });
})