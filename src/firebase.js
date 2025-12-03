// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDud2IjfkicjNdII3T5r54AmMM5TsybOn8",
  appId: "1:79183096228:web:49502fb05f4d7b229bb931",
  authDomain: "just-another-todo-app-25878.firebaseapp.com",
  measurementId: "G-45SLRTMGPR",
  messagingSenderId: "79183096228",
  projectId: "just-another-todo-app-25878",
  storageBucket: "just-another-todo-app-25878.firebasestorage.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
