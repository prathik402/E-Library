import firebase from 'firebase'
require('@firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyD5Tfx-A9RTNBS5TQVvS-nrfvU07c6yT1Q",
    authDomain: "e-libary-87e35.firebaseapp.com",
    projectId: "e-libary-87e35",
    storageBucket: "e-libary-87e35.appspot.com",
    messagingSenderId: "348037595798",
    appId: "1:348037595798:web:0b284d8a773665f43a38b7"
  };
  firebase.initializeApp(firebaseConfig)
  export default firebase.firestore()