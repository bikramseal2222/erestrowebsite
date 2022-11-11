import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import config from "./config";
require("firebase/auth");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
  measurementId: config.measurementId,
};

// eslint-disable-next-line
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();

const facebookprovider = new firebase.auth.FacebookAuthProvider();

export { auth, googleProvider, facebookprovider, firebase };
