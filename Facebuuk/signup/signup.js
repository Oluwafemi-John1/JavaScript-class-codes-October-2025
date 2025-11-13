import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";


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

const signUpUser = () => {
    if (firstName.value.trim() === '' || lastName.value.trim() === '' || email.value.trim() === '' || password.value.trim() === '') {
        showError.style.display = 'block'
        showError2.style.display = 'none'
    } else {
        showError.style.display = 'none'
        const userObj = {
            first_name: firstName.value,
            last_name: lastName.value,
            mail: email.value,
            pass: password.value
        }
        signUpButton.innerHTML = `
                        <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                        <span role="status">Loading...</span>
                `
        const { mail, pass } = userObj
        createUserWithEmailAndPassword(auth, mail, pass)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                user.displayName = `${firstName.value} ${lastName.value}`
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log('Email verification sent!');
                    });
                signUpButton.innerHTML = `<i class="fas fa-user-plus"></i> Create Account`
                setTimeout(() => {
                    window.location.href = "../signin/signin.html"
                }, 1000)
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                if (errorCode === "auth/password-does-not-meet-requirements") {
                    showError2.innerHTML = `<small><i class="fas fa-exclamation-circle"></i>&nbsp;&nbsp;<span>Password requirements not met!</span></small>`
                    showError2.style.display = 'block'
                }

                if (errorCode === "auth/invalid-email") {
                    showError2.style.display = 'block'
                }

                if (errorCode === "auth/email-already-in-use") {
                    showError2.innerHTML = `<small><i class="fas fa-exclamation-circle"></i>&nbsp;&nbsp;<span>Email already in use!</span></small>`
                    showError2.style.display = 'block'
                }
                signUpButton.innerHTML = `<i class="fas fa-user-plus"></i> Create Account`
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
                showError2.innerHTML = `<small><i class="fas fa-exclamation-circle"></i>&nbsp;&nbsp;<span>Popup closed by user. Try again!</span></small>`
                showError2.style.display = 'block'
            }
            if (errorCode === "auth/operation-not-allowed") {
                showError2.innerHTML = `<small><i class="fas fa-exclamation-circle"></i>&nbsp;&nbsp;<span>You are not authorized for this operation!</span></small>`
                showError2.style.display = 'block'
            }
            if (errorCode === "auth/unauthorized-domain") {
                showError2.innerHTML = `<small><i class="fas fa-exclamation-circle"></i>&nbsp;&nbsp;<span>You are not authorized for this operation</span></small>`
                showError2.style.display = 'block'
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
                showError2.innerHTML = `<small><i class="fas fa-exclamation-circle"></i>&nbsp;&nbsp;<span>Popup closed by user. Try again!</span></small>`
                showError2.style.display = 'block'
            }
            if (errorCode === "auth/account-exists-with-different-credential") {
                showError2.innerHTML = `<small><i class="fas fa-exclamation-circle"></i>&nbsp;&nbsp;<span>You have already signed in with Google!</span></small>`
                showError2.style.display = 'block'
            }
            if (errorCode === "auth/unauthorized-domain") {
                showError2.innerHTML = `<small><i class="fas fa-exclamation-circle"></i>&nbsp;&nbsp;<span>You are not authorized for this operation</span></small>`
                showError2.style.display = 'block'
            }
        });
}
window.signUpUser = signUpUser;
window.signGoogle = signGoogle;
window.signGitHub = signGitHub;

// let allUsers = []
// if (localStorage.facebuukUsers) {
//     const fetched = JSON.parse(localStorage.getItem('facebuukUsers'))
//     allUsers = fetched
// } else {
//     allUsers = []
// }
// localStorage.facebuukUsers?allUsers=JSON.parse(localStorage.getItem('facebuukUsers')):allUsers=[]

// let newUsers = JSON.parse(localStorage.getItem('facebuukUsers')) || []


// const signUp = () => {
//     if (firstName.value.trim() === '' || lastName.value.trim() === '' || email.value.trim() === '' || password.value.trim() === '') {
//         showError.style.display = 'block'
//         showError2.style.display = 'none'
//     } else {
//         showError.style.display = 'none'
//         const userObj = {
//             first_name: firstName.value,
//             last_name: lastName.value,
//             mail: email.value,
//             pass: password.value
//         }
//         let regexString = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
//         const confirmEmail = regexString.test(userObj.mail)
//         if (confirmEmail) {
//             const found = allUsers.find(user => user.mail === userObj.mail)
//             if (found) {
//                 alert('account already exists')
//             } else {
//                 signUpButton.innerHTML = `
//                         <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
//                         <span role="status">Loading...</span>
//                 `
//                 allUsers.push(userObj)
//                 localStorage.setItem('facebuukUsers', JSON.stringify(allUsers))
//                 setTimeout(()=>{
//                     window.location.href = "../signin/signin.html"
//                 }, 2000)
//             }
//         } else {
//             showError2.style.display = 'block'
//         }


//         firstName.value = ''
//         lastName.value = ''
//         email.value = ''
//         password.value = ''
//     }
// }