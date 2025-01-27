import firebase from "@react-native-firebase/app";
import '@react-native-firebase/auth';
import '@react-native-firebase/storage';

import { Platform } from "react-native";

const firebaseConfig = {
    appId: Platform.OS === 'ios'
        ? '1:982261473023:ios:71f5df0963eabc745876ca'
        : '1:1015992256855:android:367fcbd33a4180df269612',
    apiKey: 'AIzaSyB2KrJDnbIWawhrEJcuZ7nsrigDhooEOuU',
    projectId: 'npte-ninja',
    storageBucket: 'npte-ninja.firebasestorage.app',
    messagingSenderId: '982261473023',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
export { firebase, auth };


// const androidCredentials = {
//     clientId: '',
//     appId: '1:1015992256855:android:367fcbd33a4180df269612',
//     apiKey: 'AIzaSyCkM3yIJepmghfbxX6zj6B0duiRWqUOHyE',
//     databaseURL: '',
//     storageBucket: 'ptfe-game.appspot.com',
//     messagingSenderId: '1015992256855',
//     projectId: 'ptfe-game',
// };

// const iosCredentials = {
//     clientId: '',
//     appId: '1:1015992256855:ios:2c2e88fa1c5aacd7269612',
//     apiKey: 'AIzaSyCknR61LCdJe6IZreqjHuRAEcVjo74uC2Y',
//     databaseURL: '',
//     storageBucket: 'ptfe-game.appspot.com',
//     messagingSenderId: '1015992256855',
//     projectId: 'ptfe-game',
// };

// const webCredentials = {
//     apiKey: "AIzaSyA56l3as1n5JnPiMp2rrMYKlD9vksOUFmE",
//     authDomain: "ptfe-game.firebaseapp.com",
//     projectId: "ptfe-game",
//     storageBucket: "ptfe-game.appspot.com",
//     messagingSenderId: "1015992256855",
//     appId: "1:1015992256855:web:eba8daf56364e097269612",
//     measurementId: "G-7C9NH6XLND"
// };

// console.log(Platform.OS);

// const credentials = (Platform.OS == 'ios') 
// ? iosCredentials : ((Platform.OS == 'android') ?
// androidCredentials : webCredentials);

// const config = {
//     name: 'ptfe-game'
// }

// const app = firebase.initializeApp(credentials, config);
// const auth = firebase.app('ptfe-game').auth()

// export { app, auth };