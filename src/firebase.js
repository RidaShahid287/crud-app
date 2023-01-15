import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAdGOkOMff6234d1R6m45b2C0XerIonjzc",
  authDomain: "crud-app-417a1.firebaseapp.com",
  projectId: "crud-app-417a1",
  storageBucket: "crud-app-417a1.appspot.com",
  messagingSenderId: "21576870056",
  appId: "1:21576870056:web:06fcf8e6b987447cfd7a9d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)