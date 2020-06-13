
import * as admin from'firebase-admin'

var config = {
    apiKey: "AIzaSyD0XTabizVpvEdD5rUacP_OvwvnabwYjsA",
    authDomain: "need-f6bad.firebaseapp.com",
    databaseURL: "https://need-f6bad.firebaseio.com",
    projectId: "need-f6bad",
    storageBucket: "need-f6bad.appspot.com",
    messagingSenderId: "837988614895",
    appId: "1:837988614895:web:30f9bc23694a8675"
};
admin.initializeApp(config);


export const firestore = admin.firestore()
export const messaging = admin.messaging()