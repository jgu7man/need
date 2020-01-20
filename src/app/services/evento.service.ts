import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFirestore, docChanges } from '@angular/fire/firestore';
import { EventoModel } from '../models/evento/evento.model';
import { ActividadModel } from '../models/evento/actividad.model';
import { HistorialService } from './historial.service';
import { PersonalModel } from '../models/evento/personal.model';
import { CostosModel } from '../models/evento/costos.model';
import { DatosModel } from '../models/evento/datosevento.model';


@Injectable({ providedIn: 'root' })
export class EventoService{
 
    public actividad: ActividadModel
    constructor(
        private fs: AngularFirestore,
        private _historial: HistorialService
    ) {
        this.actividad = new ActividadModel('eventos','','', new Date, '','datos')
     }

    async savePreEvento(uid, idEvento) {
        // recuperar datos del session storage
        console.log(idEvento)
        var log = JSON.parse(localStorage.getItem('needlog'));
        var evento = await JSON.parse(sessionStorage.getItem(idEvento + 'evento'))
        evento.usuario = log.uid
        evento.fecha = new Date(evento.fecha)
        var personal = await JSON.parse(sessionStorage.getItem(idEvento + 'personal'))
        var finanzas = await JSON.parse(sessionStorage.getItem(idEvento + 'costos'))
        var extras = await JSON.parse(sessionStorage.getItem(idEvento + 'extras'))
        
        // REGISTRAR EVENTO
        const colRef = this.fs.collection('eventos').ref
        const event = await colRef.add(evento)
        const eventRef = colRef.doc(event.id)
        await eventRef.update({ id: event.id })
        await eventRef.collection('personal').doc('personal').set(personal)
        await eventRef.collection('personal').doc('extras').set({extras: extras})
        await eventRef.collection('finanzas').doc('costos').set(finanzas)
        
    }

    async getTodayPrevento(uid) {
        
        const colRef = this.fs.collection('eventos').ref
        console.log(uid)
        var eventos = await colRef.where('usuario', '==', uid).where('estado', '==', 'pendiente').get()
        var evento
        console.log(eventos.size)
        if (eventos.size > 0) {
            console.log(eventos.docs[0].data())    
            evento = await eventos.docs[0].data()
            let eventDate: Date = evento.fecha.toDate()
            eventDate.setHours(0, 0, 0, 0)
            evento.fecha = eventDate
        } else {
            evento = await null
        }

        return evento
    }
    
    async postEvento(idTemp, evento, datos, personal, finanzas) {
        const colRef = this.fs.collection('eventos').ref
        // recuperar datos del session storage
        var datos = await JSON.parse(sessionStorage.getItem(idTemp + 'datos'))
        var idEvento

        // revisar si se ya estaba creado el evento
        if (typeof evento.id == 'number') {
            var event = await colRef.add(evento)
            idEvento = await event.id
            await colRef.doc(idEvento).update({
                id: idEvento,
                estado: 'creado',
                ciudad: datos.ciudad
            })
        } else {
            idEvento = await evento.id
        }
        
        // almacenar todos los datos
        colRef.doc(idEvento).update({
            estado: 'creado',
            ciudad: datos.ciudad
        })

        var eventRef = this.fs.collection('eventos').ref.doc(idEvento)
        await eventRef.collection('info').doc('datos').set(datos)
        await eventRef.collection('personal').doc('personal').set(personal)
        await eventRef.collection('finanzas').doc('costos').set(finanzas)
        // crear vacantes
        this.saveVacantes(idEvento, personal)

        // registrar historial
        this.actividad.document = idEvento
        this.actividad.actividad = 'Evento creado'
        this.actividad.tipo = 'datos'
        this._historial.setActividad(this.actividad)

        // eliminar los datos del navegador
        await sessionStorage.removeItem(idEvento + 'evento')
        await sessionStorage.removeItem(idEvento + 'personal')
        await sessionStorage.removeItem(idEvento + 'costos')
        
        return idEvento
    }

    async checkUserDisp(fechaSolicitada: Date) {
        var user = JSON.parse(localStorage.getItem('needlog'))
        const coll = this.fs.collection('eventos').ref
        var userEvents = await coll.where('usuario', '==', user.uid).get();

        var disponible: boolean
        await userEvents.forEach(async event => {
            var eventDate = event.get('fecha').toDate() as Date
            eventDate.setHours(0, 0, 0, 0)
            console.log(eventDate)
            return fechaSolicitada == eventDate ? disponible = true : disponible = false
        })
        console.log(disponible)
        return disponible

    }


    async saveVacantes(idEvento, personal) {
        var eventRef = this.fs.collection('eventos').ref.doc(idEvento).collection('personal')

        var personalObj = {}
        Object.defineProperty(personalObj, 'mesero', {
            value: personal.meseros, enumerable: true, writable: true, configurable: true
        })
        Object.defineProperty(personalObj, 'capitanMeseros', {
            value: personal.capitanMeseros, enumerable: true, writable: true, configurable: true
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
        var eventoRes = await eventRef.get()
        var evento = eventoRes.data() as EventoModel
        evento.fecha = eventoRes.data().fecha.toDate()
        return evento
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
        
        var eventoRes = await eventoRef.get()
        const evento: EventoModel = eventoRes.data() as EventoModel
        evento.fecha = eventoRes.data().fecha.toDate()

        var infoPersonal = await eventoRef.collection('personal').doc('personal').get()
        const personal: PersonalModel = infoPersonal.data() as PersonalModel

        var infoCostos = await eventoRef.collection('finanzas').doc('costos').get()
        const finanzas: CostosModel = infoCostos.data() as CostosModel
        
        var infoDatos = await eventoRef.collection('info').doc('datos').get()
        const datos: DatosModel = infoDatos.data() as DatosModel
        datos.inicia = infoDatos.data().inicia.toDate()
        datos.termina = infoDatos.data().termina.toDate()

        return { evento: evento, personal: personal, datos: datos, finanzas: finanzas }
    }

    async getPersonal(idEvento) {
        var eventoRef = this.fs.collection('eventos').ref.doc(idEvento)
        var personal = await eventoRef.collection('personal').doc('personal').get()
        var extras = await eventoRef.collection('personal').doc('extras').get()
        var infoPersonal = {
            personal: personal.data() as PersonalModel,
            extras: extras.data().extras
        }
        return infoPersonal
    }
    async getDatos(idEvento) {
        var eventoRef = this.fs.collection('eventos').ref.doc(idEvento)
        var infoDatos = await eventoRef.collection('info').doc('datos').get()
        
        const datos = infoDatos.data()
        datos.inicia = new Date(infoDatos.data().inicia)
        datos.termina = new Date(infoDatos.data().termina)
        return datos
    }
    async getCostos(idEvento) {
        var eventoRef = this.fs.collection('eventos').ref.doc(idEvento)
        var infoCostos = await eventoRef.collection('finanzas').doc('costos').get()
        return infoCostos.data() as CostosModel    
    }

    async deleteEvento(idEvento) {
        var eventoRef = this.fs.collection('eventos').ref.doc(idEvento)
        var deleted = await eventoRef.delete()
        return true
    }
}