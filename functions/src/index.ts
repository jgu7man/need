import * as functions from 'firebase-functions';
import * as Cors from 'cors'
import * as notificaciones from './notificaciones' 
import * as stripe from './stripe'
const cors = Cors({origin: true})
const universal = require( `${ process.cwd() }/dist/server` ).app;

export const hosting = functions.https.onRequest( universal );

// Notificiones
export const notificacion_usuario = functions.firestore
    .document( 'usuarios/{uid}/notificaciones/{notification}' ).onCreate( async ( snap, context ) => { notificaciones.notificacion_usuario( snap ); } )
export const evento_cubierto = functions.firestore
    .document( 'eventos/{eid}/personal/vacantes' ).onUpdate( async ( change, context ) => { notificaciones.evento_cubierto( change ); } );
// PAGOS
export const pago_stripe = functions.firestore
    .document( 'stripe_pagos/{idPago}' ).onCreate( async ( snap, context ) => {
        stripe.pago_stripe( snap );
    } );

export const pagar_con_stripe = functions.https.onRequest( ( req, res ) => {
    return cors( req, res, () => {
        console.log( res );
        stripe.pagar_con_stripe( req, res );
    } );
} );