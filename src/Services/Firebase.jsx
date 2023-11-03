import firebase from 'firebase/app';
import 'firebase/firestore'; // Import the Firestore module
import 'firebase/auth'
import 'firebase/storage';

import { useEffect } from 'react';
const firebaseConfig = {
 
  apiKey: "AIzaSyAFFHYj3m7TrYgtf2S7nMiL9StaLbPn_xA",
  authDomain: "let-s-talk-f2f11.firebaseapp.com",
  databaseURL: "https://let-s-talk-f2f11-default-rtdb.firebaseio.com",
  projectId: "let-s-talk-f2f11",
  storageBucket: "let-s-talk-f2f11.appspot.com",
  messagingSenderId: "1028038001565",
  appId: "1:1028038001565:web:5ebfb950fdc843a1982574"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const storage = firebase.storage();

const firestore = firebase.firestore();
const Auth =  firebase.auth();
export { firestore ,Auth,storage};