import firebase from "firebase/app";
import  "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyC4noogLIhXvFsRHcJVmRm9UY3nj4mHSYs",
    authDomain: "mercychat-4d50d.firebaseapp.com",
    projectId: "mercychat-4d50d",
    storageBucket: "mercychat-4d50d.appspot.com",
    messagingSenderId: "780943333198",
    appId: "1:780943333198:web:22aa63af9e39c371d2301f"
  }).auth();