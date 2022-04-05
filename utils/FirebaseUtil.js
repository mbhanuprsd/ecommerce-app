import firebase from 'firebase/compat/app'
import  "firebase/compat/auth";
import "firebase/compat/firestore";
import { firebaseConfig } from "../firebase";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();