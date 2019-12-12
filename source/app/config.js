export const URL = "http://opentable.herokuapp.com";
export const DEFAULT_LANGUAGE = "en";

import Firebase from 'react-native-firebase';
let config = {
    clientId: '390649493566-8bi7tefocrgcca4nfn264dumcou1llem.apps.googleusercontent.com',
    apiKey: "AIzaSyAYf8p6KHm7QN1mtD1puk-LCJhbfu-GqMU",
    appId: '1:390649493566:android:f3c871e2cde94c9d43b96f',
    authDomain: "spend-it-d530f.firebaseapp.com",
    databaseURL: 'https://spend-it-d530f.firebaseio.com',
    projectId: 'spend-it-d530f',
    storageBucket: 'spend-it-d530f.appspot.com',
    messagingSenderId: '390649493566'
};
let app = Firebase.initializeApp(config);
export const database = app.database();
export const auth = app.auth();
