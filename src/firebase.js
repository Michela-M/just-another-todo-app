// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDud2IjfkicjNdII3T5r54AmMM5TsybOn8",
  authDomain: "just-another-todo-app-25878.firebaseapp.com",
  projectId: "just-another-todo-app-25878",
  storageBucket: "just-another-todo-app-25878.firebasestorage.app",
  messagingSenderId: "79183096228",
  appId: "1:79183096228:web:49502fb05f4d7b229bb931",
  measurementId: "G-45SLRTMGPR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
