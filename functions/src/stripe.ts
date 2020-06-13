import { Stripe } from "stripe";
import * as firebase from './firebase.index'

const stripe = new Stripe( 'sk_test_oKyU7sT0EaKBCCVttl9KMGrY00ACLL8tmE', {
    apiVersion: '2020-03-02',
} )
const fs = firebase.firestore

export var pago_stripe = async ( snap:any ) => {

    const pago_stripe = snap.data();
    console.log( pago_stripe );
    const transaccion = pago_stripe.transaccion;
    console.log( transaccion );
    const token = pago_stripe.source.id;
    const amount = transaccion.total * 100;
    console.log( amount );

    stripe.charges.create( {
        amount: amount,
        currency: 'mxn',
        source: token,
        description: 'Pago de prueba',
        metadata: transaccion
    }).then( charge => {
        console.log(charge);  
    } ).catch( error => {
        console.log(error);
    })

};


export var pagar_con_stripe = async ( req:any, res: any ) => {

    const source = req.body;
    console.log( source );
    const transaccion = source.metadata;
    console.log( transaccion );
    const token = source.id;
    console.log( token );

    stripe.charges.create( {
        amount: +transaccion.total * 100,
        currency: 'mxn',
        source: token,
        description: 'Pago de prueba http',
        metadata: transaccion
    }).then( async charge => {
        console.log( charge );

        transaccion.adjudicada = true;
        await fs.collection( 'transacciones' ).add( transaccion );
        res.status( 200 ).send( { message: 'Pago existoso' } );
        
    } ).catch( error => {
        console.log( 'Ups! Algo salió mal: ', error.message );
        res.status( 500 ).send( { message: 'Ups! Algo salió mal: ' + error.message } );
        
    })

};