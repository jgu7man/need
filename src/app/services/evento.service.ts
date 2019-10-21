import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatosModel } from '../models/evento/datosevento.model';
import { EventoModel } from '../models/evento/evento.model';

@Injectable({ providedIn: 'root' })
export class EventoService{
 
    constructor(
        private fs: AngularFirestore
    ) { }
    
    async postEvento(evento, datos, personal) {

        console.log(datos.inicia);
        var datosEvento = {
            ciudad: datos.ciudad,
            colonia: datos.colonia,
            direccion: datos.direccion,
            estado: datos.estado,
            inicia: datos.inicia,
            lugar: datos.lugar,
            termina: datos.termina
        }
        const event = await this.fs.collection('eventos').ref.add(evento)
        var eventRef = this.fs.collection('eventos').ref.doc(event.id)
        await eventRef.update({id: event.id})
                
        await eventRef.collection('info').doc('datos').set(datosEvento)
        await eventRef.collection('info').doc('personal').set(personal)
        return event.id
        
        
    }

    async getOneEvento(id: string) {
        var eventRef = this.fs.collection('eventos').ref.doc(id)
        var evento = await eventRef.get()
        return evento.data()
    }

    async getEventosByUser(id) {
        var eventosDelUsuario = []
        var eventos = await this.fs.collection('eventos').ref
                    .where('usuario', '==', id).get()
        
        eventos.forEach(event => {
            var evento = event.data() as EventoModel
            evento.fecha = event.data().fecha.toDate()
            eventosDelUsuario.push(evento)
        })

        return eventosDelUsuario
    }

    @Output() idEvento = new EventEmitter()
    sendEventId(id) {
        console.log(id);
        this.idEvento.emit(id)
    }

    async getFullEvento(idEvento) {
        var eventoRef = this.fs.collection('eventos').ref.doc(idEvento)
        
        var evento = await eventoRef.get()
        const detalles = evento.data()
        detalles.fecha = evento.data().fecha.toDate()

        var infoPeronal = await eventoRef.collection('info').doc('personal').get()
        const personal = infoPeronal.data()
        
        var infoDatos = await eventoRef.collection('info').doc('datos').get()
        const datos = infoDatos.data()
        datos.inicia = infoDatos.data().inicia.toDate()
        datos.termina = infoDatos.data().termina.toDate()

        return { detalles: detalles, personal: personal, datos: datos }
    }
}