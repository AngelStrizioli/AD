import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAEfOLExD58PcVjMNOj9_vXOlI9FEE3zJo",
  authDomain: "proyectoad-ce381.firebaseapp.com",
  databaseURL: "https://proyectoad-ce381.firebaseio.com",
  projectId: "proyectoad-ce381",
  storageBucket: "proyectoad-ce381.appspot.com",
  messagingSenderId: "449993244941",
  appId: "1:449993244941:web:13bb6b6fd83380050ef044",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
