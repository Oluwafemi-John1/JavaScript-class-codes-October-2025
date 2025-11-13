import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";


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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const gProvider = new GithubAuthProvider();

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

const signGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user);
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    console.log('Email verification sent!');
                });
            setTimeout(() => {
                window.location.href = "../dashboard/dashboard.html"
            }, 1000)
        }).catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
            if (errorCode === "auth/popup-closed-by-user") {
                showError3.innerHTML = `<small><i class="fas fa-exclamation-circle"></i>&nbsp;&nbsp;<span>Popup closed by user. Try again!</span></small>`
                showError3.style.display = 'block'
            }
            if (errorCode === "auth/operation-not-allowed") {
                showError3.innerHTML = `<small><i class="fas fa-exclamation-circle"></i>&nbsp;&nbsp;<span>You are not authorized for this operation!</span></small>`
                showError3.style.display = 'block'
            }
            if (errorCode === "auth/unauthorized-domain") {
                showError3.innerHTML = `<small><i class="fas fa-exclamation-circle"></i>&nbsp;&nbsp;<span>You are not authorized for this operation</span></small>`
                showError3.style.display = 'block'
            }
        });
}

const signGitHub = () => {
    signInWithPopup(auth, gProvider)
        .then((result) => {
            const user = result.user;
            console.log(user);
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    console.log('Email verification sent!');
                });
            setTimeout(() => {
                window.location.href = "../dashboard/dashboard.html"
            }, 1000)
        }).catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
            if (errorCode === "auth/popup-closed-by-user") {
                showError3.innerHTML = `<small><i class="fas fa-exclamation-circle"></i>&nbsp;&nbsp;<span>Popup closed by user. Try again!</span></small>`
                showError3.style.display = 'block'
            }
            if (errorCode === "auth/account-exists-with-different-credential") {
                showError3.innerHTML = `<small><i class="fas fa-exclamation-circle"></i>&nbsp;&nbsp;<span>You have already signed in with Google!</span></small>`
                showError3.style.display = 'block'
            }
            if (errorCode === "auth/unauthorized-domain") {
                showError3.innerHTML = `<small><i class="fas fa-exclamation-circle"></i>&nbsp;&nbsp;<span>You are not authorized for this operation</span></small>`
                showError3.style.display = 'block'
            }
        });
}

const sendResetEmail = () => {
    if (emailReset.value.trim() === '') {
        showError4.style.display = 'block'
    } else {
        showError4.style.display = 'none'
        sendPasswordResetEmail(auth, emailReset.value)
            .then(() => {
                console.log('Password reset link sent');
                showInfo.style.display = 'block'
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
            });
    }
}

window.signInUser = signInUser;
window.signGoogle = signGoogle;
window.signGitHub = signGitHub;
window.sendResetEmail = sendResetEmail;


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