// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD16jUItodB5W86V5KUVsioj794aoppGMc",
  authDomain: "trabajodignoco.firebaseapp.com",
  projectId: "trabajodignoco",
  storageBucket: "trabajodignoco.firebasestorage.app",
  messagingSenderId: "999052025744",
  appId: "1:999052025744:web:a086c5ff21086261c99d15",
  measurementId: "G-E58HTHW8CL"
};

// Función para inicializar Firebase de forma segura
function initializeFirebase() {
  console.log("Inicializando Firebase con configuración:", JSON.stringify(firebaseConfig));
  
  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    console.log("Firebase inicializado con éxito:", app.name);
    
    // Initialize Firestore
    const firestore = getFirestore(app);
    console.log("Firestore inicializado con éxito");
    
    return { app, db: firestore };
  } catch (error) {
    console.error("Error al inicializar Firebase:", error);
    return { app: null, db: null };
  }
}

// Inicializar Firebase y exportar instancias
const { app, db } = initializeFirebase();

export { db }; 