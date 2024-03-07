// Import the functions you need from the SDKs you need
// src.firebase.js
import { initializeApp } from "firebase/app"
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore"
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAQrpnAsQJ-xkJhWlTRuNffghI9X457HEc",
    authDomain: "kalyanmilanofficial.firebaseapp.com",
    projectId: "kalyanmilanofficial",
    storageBucket: "kalyanmilanofficial.appspot.com",
    messagingSenderId: "1022966513419",
    appId: "1:1022966513419:web:64a603178ecfc4f3382c0e",
    measurementId: "G-XNPSF17BC8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6LfycY4pAAAAAGSfteWq0s2wo5CMziCP7GUlZTp4'),

    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true
});
const db = getFirestore(app)
const imgDB = getStorage(app)
export { db, imgDB }