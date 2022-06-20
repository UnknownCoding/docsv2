// Import the functions you need from the SDKs you need
import { initializeApp , getApp, getApps} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtWjaCFuszK5pRsYY2ESKannbcCJWyK4s",
    authDomain: "docs-8b45a.firebaseapp.com",
    projectId: "docs-8b45a",
    storageBucket: "docs-8b45a.appspot.com",
    messagingSenderId: "1080835800566",
    appId: "1:1080835800566:web:dc470a15327a7aed3b1bd7"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp() ;
const db = getFirestore();
const storage= getStorage();

export {app,db,storage}