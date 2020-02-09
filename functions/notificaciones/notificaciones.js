/* jshint esversion: 8 */

const firebase = require('../firebase.index');

var notificacion_usuario = async(snap) => {
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



    var usuario = firebase.firestore.collection('usuarios').doc(uid);
    var tokenDoc = await usuario.collection('tokens').doc('token_notificaciones').get();
    var token = tokenDoc.data().token;
    var res = await firebase.messaging.sendToDevice(token, payload);
};



var evento_cubierto = async(change) => {
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
};


module.exports = {
    notificacion_usuario: notificacion_usuario,
    evento_cubierto: evento_cubierto
};