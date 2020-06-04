import firebase from 'firebase';
import firestore from 'firebase/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyBRa_fC-xwdTrPOtslwEehrEoQUaXhKG-8",
    authDomain: "exemplo-60408.firebaseapp.com",
    databaseURL: "https://exemplo-60408.firebaseio.com",
    projectId: "exemplo-60408",
    storageBucket: "exemplo-60408.appspot.com",
    messagingSenderId: "650070382621",
    appId: "1:650070382621:web:00c800449a3e6f8cd30ef4",
    measurementId: "G-XZGSEN3V7S"
  };
  // Initialize Firebase

  if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
  }

  export default firebase;