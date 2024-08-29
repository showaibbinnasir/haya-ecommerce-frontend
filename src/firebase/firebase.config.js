// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpo0c9OR4nEeGzyI2HOdk0k4Cx0f2BF6E",
  authDomain: "haya-ecommerce.firebaseapp.com",
  projectId: "haya-ecommerce",
  storageBucket: "haya-ecommerce.appspot.com",
  messagingSenderId: "634852028169",
  appId: "1:634852028169:web:421363eb61d5380b0e2dd8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;