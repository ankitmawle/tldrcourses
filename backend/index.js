// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5d34oavtEJCKEZQwU3gnoOZcnEbybAOo",
  authDomain: "tldr-courses.firebaseapp.com",
  projectId: "tldr-courses",
  storageBucket: "tldr-courses.appspot.com",
  messagingSenderId: "755406451812",
  appId: "1:755406451812:web:be52d741df6cb16c8c9b71",
  measurementId: "G-3X3T8B8VGK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);