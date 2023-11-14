// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATPp-l3B7o6tKWTkIm9IvsoI0q_WqFE54",
  authDomain: "bird-cage-shop.firebaseapp.com",
  projectId: "bird-cage-shop",
  storageBucket: "bird-cage-shop.appspot.com",
  messagingSenderId: "116221017245",
  appId: "1:116221017245:web:2b7cea1fcdfee8b0496874"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);