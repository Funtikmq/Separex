import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgsycZsy-CUhSpnSyUtzIFuuGu7D3TbiY",
  authDomain: "separex-a6a43.firebaseapp.com",
  projectId: "separex-a6a43",
  storageBucket: "separex-a6a43.firebasestorage.app",
  messagingSenderId: "56684228541",
  appId: "1:56684228541:web:51320a32386dc34e122cd4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider, signInWithPopup, signOut };
