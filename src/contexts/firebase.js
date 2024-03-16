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
    apiKey: "AIzaSyBOdaMsn7JKYLOG_GxERfBYVF3LXYIuIxI",
    authDomain: "kalyanmilanapp-18a1e.firebaseapp.com",
    projectId: "kalyanmilanapp-18a1e",
    storageBucket: "kalyanmilanapp-18a1e.appspot.com",
    messagingSenderId: "355818342577",
    appId: "1:355818342577:web:cd711b63b6a5035f6aba90",
    measurementId: "G-ZH54MTVRJZ"
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