import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCFyrVPnG7GFrzvEsgkfCH_EhvD3H4zjaw",
    authDomain: "imessage-clone-82ecc.firebaseapp.com",
    databaseURL: "https://imessage-clone-82ecc.firebaseio.com",
    projectId: "imessage-clone-82ecc",
    storageBucket: "imessage-clone-82ecc.appspot.com",
    messagingSenderId: "1044388890785",
    appId: "1:1044388890785:web:d4b224327597ccbff488e0",
    measurementId: "G-GWBYW6FQ56"
  };

const firbaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

export default db;
