// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCVm9tI3Gcrxvpo_CoU18c0PRGhKRgd4eM",
    authDomain: "smoketime-78c49.firebaseapp.com",
    databaseURL: "https://smoketime-78c49-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smoketime-78c49",
    storageBucket: "smoketime-78c49.appspot.com",
    messagingSenderId: "332302520663",
    appId: "1:332302520663:web:9cc9773493a56f939aee12",
    measurementId: "G-JQ1MQ003M7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);