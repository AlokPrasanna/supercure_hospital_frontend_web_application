import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBspjdjupZjqTdxjrfrjCx3_l5Lsko2noY",
    authDomain: "medical-appointment-d966c.firebaseapp.com",
    projectId: "medical-appointment-d966c",
    storageBucket: "medical-appointment-d966c.appspot.com",
    messagingSenderId: "194728113222",
    appId: "1:194728113222:web:0fd8bda56ea922684b8647"
};

const app = initializeApp(firebaseConfig);
export const ImageDb = getStorage(app);