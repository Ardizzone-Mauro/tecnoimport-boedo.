// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

//⚠️Esto no deberia compartirse en un proyecto real
//📚En este proyecto educativo, por simplicidad para todos, lo utilizamos asi
//👉A futuro lo reemplazarían por variables de entorno y archivo .env

const firebaseConfig = {
  apiKey: "AIzaSyDKGBuC4YrFl-e5cbiZ1RDRNORfk0nnfkw",
  authDomain: "mi-proyecto-react-web.firebaseapp.com",
  projectId: "mi-proyecto-react-web",
  storageBucket: "mi-proyecto-react-web.firebasestorage.app",
  messagingSenderId: "245864073469",
  appId: "1:245864073469:web:6f73ae28a9ff4c65395694",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

//para el login
const auth = getAuth(app);

export { db, auth };
