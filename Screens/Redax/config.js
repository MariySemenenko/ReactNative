// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQjSxfeNoC-cFQfO5gIm7RGv5kdbLWLaM",
  authDomain: "reactnative-da788.firebaseapp.com",
  projectId: "reactnative-da788",
  storageBucket: "reactnative-da788.appspot.com",
  messagingSenderId: "257036186096",
  appId: "1:257036186096:web:2f8f2b15f32c2b73146d35",
  measurementId: "G-E4F0WF5Z0V"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)