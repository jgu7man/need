import * as firebase from "./firebase.index";
const fs = firebase.firestore


export var notificacion_usuario = async ( snap:any ) => {
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



    var usuario = fs.collection( 'usuarios' ).doc( uid );
    var tokenDoc = await usuario.collection( 'tokens' ).doc( 'token_notificaciones' ).get();
    var tokeData = tokenDoc.data() as TOKEN
    var token = tokeData['token'];
    await firebase.messaging.sendToDevice( token, payload );
};



export var evento_cubierto = async ( change: any ) => {
    const newValue = change.after.data();
    const eventoRes = await change.after.ref.parent.parent.get();
    const evento = eventoRes.data();
    const today = new Date();

    if ( newValue.vacantes_total == 0 ) {
        const fechaEvento = evento.fecha.toDate();
        const eventoNotificado = `${ evento.tipoEvento } para el ${ fechaEvento.toLocaleDateString() }`;
        console.log( { fechaEvento, eventoNotificado } );
        await fs.collection( 'usuarios' ).doc( evento.usuario )
            .collection( 'notificaciones' ).add( {
                time: today,
                title: '¡Listo!',
                body: `Ya está listo tu evento de ${ eventoNotificado }. Todo el personal que solicitaste está cubierto por nuestro equipo. Ahora ya puedes pagar para asegurar tu evento.`,
                eid: evento.id
            } );


    }
};


interface TOKEN  {
    token: string
}