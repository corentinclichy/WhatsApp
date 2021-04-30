import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBSFcaMFvvS2RtITyjX4lBgWoqT25Pc8r4",
  authDomain: "whatsapp-118eb.firebaseapp.com",
  projectId: "whatsapp-118eb",
  storageBucket: "whatsapp-118eb.appspot.com",
  messagingSenderId: "245366173079",
  appId: "1:245366173079:web:0c8035e739119670a928d2",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

// const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
