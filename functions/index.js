"use strict";
const fuctions = require('firebase-functions');
const admin = require('firebase-admin');

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
const fs = admin.firestore();

Object.defineProperty(exports, "__esModule", { value: true });
const angularUniversal = require("angular-universal-express-firebase");

exports.need = angularUniversal.trigger({
    index: __dirname + '/dist-server/index.html',
    main: __dirname + '/dist-server/main.bundle',
    enableProdMode: true,
    cdnCacheExpiry: 1200,
    browserCacheExpiry: 600
});

exports.notificaciones = fuctions.firestore
    .document('usuarios/{uid}/notificaciones/{notification}')
    .onCreate(async(snap, context) => {

        const mensaje = snap.data();
        const uid = snap.ref.parent.parent.id;


        const payload = {
            notification: {
                title: mensaje.title,
                body: mensaje.body,
                icon: 'https://need.mx/assets/img/logos/logo256.png',

            },
            data: {
                openURL: `https://need.mx/usuario/perfil`
            }
        };



        var usuario = fs.collection('usuarios').doc(uid);
        var tokenDoc = await usuario.collection('tokens').doc('token_notificaciones').get();
        var token = tokenDoc.data().token;
        var res = await admin.messaging().sendToDevice(token, payload);


        // .catch(err => { console.log(err); });

    });


exports.evento_cubierto = fuctions.firestore
    .document('eventos/{eid}/personal/vacantes')
    .onUpdate(async(change, context) => {

        const newValue = change.after.data();
        const eventoRes = await change.after.ref.parent.parent.get();
        const evento = eventoRes.data();
        const today = new Date();

        if (newValue.vacantes_total == 0) {
            const fechaEvento = evento.fecha.toDate();
            const eventoNotificado = `${evento.tipoEvento} para el ${fechaEvento.toLocaleDateString()}`;
            console.log(fechaEvento, eventoNotificado);
            await fs.collection('usuarios').doc(evento.usuario)
                .collection('notificaciones').add({
                    time: today,
                    title: '¡Listo!',
                    body: `Ya está listo tu evento de ${eventoNotificado}. Todo el personal que solicitaste está cubierto por nuestro equipo. Ahora ya puedes pagar el anticipo para asegurar tu evento.`,
                    eid: evento.id
                });


        }

    });