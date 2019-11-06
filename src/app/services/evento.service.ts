import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFirestore, docChanges } from '@angular/fire/firestore';
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
        this.saveVacantes(event.id, personal)
        return event.id
    }

    async saveVacantes(idEvento, personal) {
        var eventRef = this.fs.collection('eventos').ref.doc(idEvento).collection('info')

        var personalObj = {}
        Object.defineProperty(personalObj, 'mesero', {
            value: personal.meseros, enumerable: true, writable: true, configurable: true
        })
        Object.defineProperty(personalObj, 'jefeMeseros', {
            value: personal.jefeMeseros, enumerable: true, writable: true, configurable: true
        })
        Object.keys(personal.extras).forEach(extra => {
            Object.defineProperty(personalObj, extra, {
                value: personal.extras[extra],enumerable: true, writable: true, configurable: true
            })
        })

        await eventRef.doc('vacantes').set(personalObj)
    }

    async getEventos() {
        var eventos = []
        var evento: EventoModel
        var today = new Date()
        var eventRef = await this.fs.collection('eventos').ref
            .orderBy('fecha').startAfter(today).get()

        eventRef.forEach( event => {
            evento = event.data() as EventoModel
            evento.fecha = event.data().fecha.toDate()
            eventos.push(evento)
        })
        return eventos
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