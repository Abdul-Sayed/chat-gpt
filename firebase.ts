import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGeWjXRA7mwFjKW3S1-PZq2DyJVE6qWFc",
  authDomain: "chat-gpt-8f34d.firebaseapp.com",
  projectId: "chat-gpt-8f34d",
  storageBucket: "chat-gpt-8f34d.appspot.com",
  messagingSenderId: "162973930135",
  appId: "1:162973930135:web:e8f75c2ab88212235e0fd2",
};

// Initialize Firebase singleton
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Get the Firebase db
const db = getFirestore(app);

export { db };
