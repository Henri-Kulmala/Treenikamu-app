import { initializeApp } from "firebase/app";
// import { getAuth} from "firebase/auth"; 
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtdOXrzk0SnQpTTXEsfWm8rYf4Xh3kmi8",
    authDomain: "treenikamu-65097.firebaseapp.com",
    databaseURL: "https://treenikamu-65097-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "treenikamu-65097",
    storageBucket: "treenikamu-65097.firebasestorage.app",
    messagingSenderId: "521679636405",
    appId: "1:521679636405:web:5ff52baa11a9c21901bbfc",
    measurementId: "G-K8ZFG3Q3NZ"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Export initialized services
export { app, auth, database };
