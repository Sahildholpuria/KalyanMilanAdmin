// Import the functions you need from the SDKs you need
// src.firebase.js
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDNXKfK-KRs_2iEqhsD3MzqbxCH8kYBjZk",
    authDomain: "otp-demo-86e6a.firebaseapp.com",
    projectId: "otp-demo-86e6a",
    storageBucket: "otp-demo-86e6a.appspot.com",
    messagingSenderId: "163356141884",
    appId: "1:163356141884:web:a4d1867be3dc8c5e0a1639",
    measurementId: "G-J579VZE4W5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export { db }