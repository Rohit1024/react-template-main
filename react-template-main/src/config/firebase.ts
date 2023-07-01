import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBGkw7hxyFS13YqoYqWcltb_Dzc33iQqKc",
    authDomain: "fir-reproduce-19328.firebaseapp.com",
    databaseURL: "https://fir-reproduce-19328-default-rtdb.firebaseio.com",
    projectId: "fir-reproduce-19328",
    storageBucket: "fir-reproduce-19328.appspot.com",
    messagingSenderId: "372271616914",
    appId: "1:372271616914:web:53b736b2cbd5f09d0ba74b",
    measurementId: "G-W3R7WYM6HR"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };