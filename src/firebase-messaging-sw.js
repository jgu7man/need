importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyD0XTabizVpvEdD5rUacP_OvwvnabwYjsA",
    authDomain: "need-f6bad.firebaseapp.com",
    databaseURL: "https://need-f6bad.firebaseio.com",
    projectId: "need-f6bad",
    storageBucket: "need-f6bad.appspot.com",
    messagingSenderId: "837988614895",
    appId: "1:837988614895:web:30f9bc23694a8675"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

// messaging.usePublicVapidKey("BJCfWNn_g_e1EZQuwlaWzuZN0dIKPUVijHDOZEt3W8mzuSd-1IqhWS2gmY-Pmi90GjqcdijYVqMa9OhRArBP26o");