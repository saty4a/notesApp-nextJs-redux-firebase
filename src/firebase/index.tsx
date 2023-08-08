import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACP1a2PfGJat1G9tW-97i4UHuBpX-b1FE",
  authDomain: "todo-d53b2.firebaseapp.com",
  projectId: "todo-d53b2",
  storageBucket: "todo-d53b2.appspot.com",
  messagingSenderId: "812987987275",
  appId: "1:812987987275:web:c16ca7f73915474e14e4ce",
  measurementId: "G-MG85FNZC27"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };