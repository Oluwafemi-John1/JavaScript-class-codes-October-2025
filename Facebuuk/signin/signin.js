import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyARbzKfSMwejapcQFw75fmcNxSKukee0F4",
    authDomain: "facebuuk-76333.firebaseapp.com",
    projectId: "facebuuk-76333",
    storageBucket: "facebuuk-76333.firebasestorage.app",
    messagingSenderId: "1076093407637",
    appId: "1:1076093407637:web:2767371f6a3d62a0de269c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const fetched = JSON.parse(localStorage.getItem('facebuukUsers'))
console.log(fetched);

const signInUser = () => {
    if (email.value.trim() === '' || password.value.trim() === '') {
        showError.style.display = 'block'
        showError2.style.display = 'none'
        showError3.style.display = 'none'
    } else {
        showError.style.display = 'none'
        const signInDetails = {
            mail: email.value,
            pass: password.value,
        }
        console.log(signInDetails);
        const { mail, pass } = signInDetails
        signInWithEmailAndPassword(auth, mail, pass)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                showError2.style.display = 'none'
                showError3.style.display = 'none'
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                if (errorCode === "auth/user-not-found") {
                    showError2.style.display = 'block'
                    showError2.innerHTML = `<small><i class="fas fa-exclamation-circle"></i>&nbsp;&nbsp;<span>Account does not exist!</span></small>`
                }

                if (errorCode === "auth/wrong-password") {
                    showError3.style.display = 'block'
                    showError3.innerHTML = `<small><i class="fas fa-exclamation-circle"></i>&nbsp;&nbsp;<span>Email or Password is incorrect!</span></small>`
                }

                if (errorCode === "auth/invalid-credential") {
                    showError3.style.display = 'block'
                    showError3.innerHTML = `<small><i class="fas fa-exclamation-circle"></i>&nbsp;&nbsp;<span>Email or Password is incorrect!</span></small>`
                }
            });
    }
}
window.signInUser = signInUser


// const signIn = () => {
//     if (email.value.trim() === '' || password.value.trim() === '') {
//         showError.style.display = 'block'
//         showError2.style.display = 'none'
//     } else {
//         showError.style.display = 'none'
//         const signInDetails = {
//             mail: email.value,
//             pass: password.value,
//             logInTime: new Date().toLocaleTimeString()
//         }
//         // console.log(signInDetails);
//         const found = fetched.find(user => user.mail === signInDetails.mail)
//         // console.log(found);
//         if (found) {
//             const newFound = fetched.find(user => user.mail === signInDetails.mail && user.pass === signInDetails.pass)
//             console.log(newFound);
//             if (newFound) {
//                 console.log('go to dashboard');
//                 localStorage.setItem('user', JSON.stringify(signInDetails))
//                 setTimeout(()=>{
//                     window.location.href = "../dashboard/dashboard.html"
//                 }, 2000)
//             } else {
//                 showError3.style.display = 'block'
//                 setTimeout(() => {
//                     showError3.style.display = 'none'
//                 }, 2000)
//             }
//         } else {
//             showError2.style.display = 'block'
//             setTimeout(() => {
//                 showError2.style.display = 'none'
//             }, 2000)
//         }
//     }
// }