// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLBBwjUJAwtV9YDVfCvF0y4VepQugRcTw",
  authDomain: "fooddonation-9dd24.firebaseapp.com",
  projectId: "fooddonation-9dd24",
  storageBucket: "fooddonation-9dd24.appspot.com",
  messagingSenderId: "115029706320",
  appId: "1:115029706320:web:54be256ee2237469bc3355"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;