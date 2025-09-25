// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMqt21J8XmVSGVh15zP30ZYXZmkBoOP2k",
  authDomain: "ecommerce--login.firebaseapp.com",
  projectId: "ecommerce--login",
  storageBucket: "ecommerce--login.firebasestorage.app",
  messagingSenderId: "262272794607",
  appId: "1:262272794607:web:b04fd6f09aea7bb802001a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Function to Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("User Info:", user);
    return user;
  } catch (error) {
    console.error("Google Sign-in Error:", error);
    throw error;
  }
};
