import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA56l3as1n5JnPiMp2rrMYKlD9vksOUFmE",
  authDomain: "ptfe-game.firebaseapp.com",
  projectId: "ptfe-game",
  storageBucket: "ptfe-game.appspot.com",
  messagingSenderId: "1015992256855",
  appId: "1:1015992256855:web:eba8daf56364e097269612",
  measurementId: "G-7C9NH6XLND"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };