import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCe68kHGT_4ELPXBjAnIedTUOe6XQ7kCMg",
  authDomain: "mini-project-b6147.firebaseapp.com",
  projectId: "mini-project-b6147",
  storageBucket: "mini-project-b6147.appspot.com",
  messagingSenderId: "430160590596",
  appId: "1:430160590596:web:1f0c6338ea437c08554251",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
