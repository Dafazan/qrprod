// firebase.js (or firebaseConfig.js)

import { initializeApp } from "firebase/app";
import { getAuth, signOut, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBNWFfCvqnTSfZUHz-f17nrAoePHGxFV2U",
    authDomain: "qrprod-3m.firebaseapp.com",
    projectId: "qrprod-3m",
    storageBucket: "qrprod-3m.appspot.com",
    messagingSenderId: "52751927648",
    appId: "1:52751927648:web:f6b5cde11b87436ec57605",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const logout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    }
};

const signUp = async (email, password, username, fullName, role) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update Firebase Auth profile
    await updateProfile(user, { displayName: username });

    // Save additional user info to Firestore
    await setDoc(doc(db, 'users', user.uid), {
        username,
        email,
        fullName,
        role,
    });
};

export { app, auth, db, storage, logout, signUp };

