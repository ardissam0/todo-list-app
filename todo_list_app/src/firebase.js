// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyByybW11kAnHAU5mJTYAWyV7j98GjbvzAA",
    authDomain: "todo-list-app-a1b10.firebaseapp.com",
    databaseURL: "https://todo-list-app-a1b10.firebaseio.com",
    projectId: "todo-list-app-a1b10",
    storageBucket: "todo-list-app-a1b10.appspot.com",
    messagingSenderId: "931999928648",
    appId: "1:931999928648:web:a4c9b4444c7e07b033e37d",
    measurementId: "G-SXCGFZYTLC"
});

const db = firebaseApp.firestore();

export default db;