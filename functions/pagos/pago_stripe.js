/* jshint esversion: 8 */

const stripe = require('stripe')('sk_test_oKyU7sT0EaKBCCVttl9KMGrY00ACLL8tmE');
const firebase = require('../firebase.index');

var pago_stripe = async(snap) => {

    const pago_stripe = snap.data();
    console.log(pago_stripe);
    const transaccion = pago_stripe.transaccion;
    console.log(transaccion);
    const token = pago_stripe.source.id;
    const amount = transaccion.total * 100;
    console.log(amount);

    stripe.charges.create({
            amount: amount,
            currency: 'mxn',
            source: token,
            description: 'Pago de prueba',
            metadata: transaccion
        },
        function(err, charge) {
            if (err) {
                console.log(err.message);
            } else {
                console.log(charge);
            }
        }
    );

};


var pagar_con_stripe = async(req, res) => {

    const source = req.body;
    console.log(source);
    const transaccion = source.metadata;
    console.log(transaccion);
    const token = source.id;
    console.log(token);

    stripe.charges.create({
            amount: +transaccion.total * 100,
            currency: 'mxn',
            source: token,
            description: 'Pago de prueba http',
            metadata: transaccion
        },
        async function(err, charge) {
            if (err) {
                console.log('Ups! Algo salió mal: ', err.message);
                res.status(500).send({ message: 'Ups! Algo salió mal: ' + err.message });
            } else {
                console.log(charge);
                var fs = firebase.firestore;

                transaccion.adjudicada = true;
                var tran = await fs.collection('transacciones').add(transaccion);
                res.status(200).send({ message: 'Pago existoso' });
            }
        });

};


module.exports = {
    pago_stripe: pago_stripe,
    pagar_con_stripe: pagar_con_stripe
};