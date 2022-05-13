import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  // Your Firebase configuration
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export default auth;
