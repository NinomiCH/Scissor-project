// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCbyw_5cBPESHdVpjkhIbq2zMRT6Fzaw28",
  authDomain: "scissor-8e8c6.firebaseapp.com",
  projectId: "scissor-8e8c6",
  storageBucket: "scissor-8e8c6.appspot.com",
  messagingSenderId: "887043828249",
  appId: "1:887043828249:web:9cdf7bf671eb52a5419888",
  measurementId: "G-HBS6SK320X",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

const logout = () => {
  return signOut(auth);
};

export { auth, db, storage, signInWithGoogle, logout, serverTimestamp };
