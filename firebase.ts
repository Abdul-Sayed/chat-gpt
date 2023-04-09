import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.Firebase_Api_Key,
  authDomain: "chat-gpt-8f34d.firebaseapp.com",
  projectId: "chat-gpt-8f34d",
  storageBucket: "chat-gpt-8f34d.appspot.com",
  messagingSenderId: "162973930135",
  appId: process.env.Firebase_App_Id,
};

// Initialize Firebase singleton
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Get the Firebase db
const db = getFirestore(app);

export { db };
