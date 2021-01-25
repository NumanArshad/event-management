import * as firebase from "firebase";
import firestore from "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBW3u6t71GbObhtb1qfvpIBee9u2QuC5eU",
  authDomain: "evezapp.firebaseapp.com",
  projectId: "evezapp",
  storageBucket: "evezapp.appspot.com",
  messagingSenderId: "245895412232",
  appId: "1:245895412232:web:623a3bf572509b3d9aafbd",
  measurementId: "G-4CZRC4RR7H",
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

firebase.firestore();
export default firebase;
