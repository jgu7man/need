/* jshint esversion: 8 */

const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const notificaciones = require('./notificaciones/notificaciones');
const pagos_stripe = require('./src/pagos/pago_stripe');




Object.defineProperty(exports, "__esModule", { value: true });
const angularUniversal = require("angular-universal-express-firebase");

exports.need = angularUniversal.trigger({
    index: __dirname + '/dist-server/index.html',
    main: __dirname + '/dist-server/main.bundle',
    enableProdMode: true,
    cdnCacheExpiry: 1200,
    browserCacheExpiry: 600
});





// NOTIFICACIONES
exports.notificacion_usuario = functions.firestore
    .document('usuarios/{uid}/notificaciones/{notification}').onCreate(async(snap, context) => { notificaciones.notificacion_usuario(snap); });
exports.evento_cubierto = functions.firestore
    .document('eventos/{eid}/personal/vacantes').onUpdate(async(change, context) => { notificaciones.evento_cubierto(change); });

// PAGOS
exports.pago_stripe = functions.firestore
    .document('stripe_pagos/{idPago}').onCreate(async(snap, context) => {
        pagos_stripe.pago_stripe(snap);
    });

exports.pagar_con_stripe = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        console.log(res);
        pagos_stripe.pagar_con_stripe(req, res);
    });
});