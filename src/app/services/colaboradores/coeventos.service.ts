import { Injectable } from "@angular/core";
import { AngularFirestore, docChanges } from '@angular/fire/firestore';
import { EquipoModel } from 'src/app/models/colaboradores/equipo.model';
import { PersonalModel } from '../../models/evento/personal.model';

@Injectable({ providedIn: 'root' })
export class CoEventoService {
    public equipo: EquipoModel
    constructor(
        private fs: AngularFirestore
    ) {
        this.equipo = new EquipoModel([],[],[],[],[],[],[],[])
     }

    async getVacantes(id: string) {
        var eventRef = this.fs.collection('eventos').ref.doc(id)
        var vacantes = await eventRef.collection('info').doc('vacantes').get()
        return vacantes.data()
    }
    
    async postular(idEvento: string, idColaborador: string, puesto: string) {

        // Referencia a la información del evento
        const eventoRef = this.fs.collection('eventos').ref.doc(idEvento).collection('info')
        
        const datosEvento = await eventoRef.doc('datos').get()
        // Conseguir la fecha del evento
        var inicia: Date = datosEvento.get('inicia').toDate()
        inicia.setHours(inicia.getHours() - 2)
        var termina = datosEvento.get('termina').toDate()
        termina.setHours(termina.getHours() + 1)

        // Revisar la disponibilidad del colaborador
        var disponible = await this.checkDisponibilidadColaborador(idColaborador, inicia, termina)
        
        if (!disponible) { return false }
        else {
        
            // Preparar el usuario para agregar a la lista
            var nuevoElemento = {}
            Object.defineProperty(nuevoElemento, puesto, {
                value: [idColaborador], enumerable: true, writable: true, configurable: true
            })
    
            // Registrar el usuario en el equipo
            await eventoRef.doc('equipo').set(nuevoElemento, { merge: true })
    
            // Preparar para ocupar la vacante
            var vacantes = await eventoRef.doc('vacantes').get()
            var vacantesPuesto = vacantes.get(puesto)
            var vacantesEvento = vacantes.get('vacantes_total')
            var newVacantes = {}
            // Actualiza las vacantes del puesto
            Object.defineProperty(newVacantes, puesto, {
                value: vacantesPuesto -1, enumerable: true, writable: true, configurable: true
            })
            // Actualiza las vacantes totales del evento
            Object.defineProperty(newVacantes, 'vacantes_total', {
                value: vacantesEvento -1, enumerable: true, writable: true, configurable: true
            })
            
            // Ocupar la vacante
            await eventoRef.doc('vacantes').update(newVacantes)
    
            // Registrar el evento en la información del colaborador
            const coRef = this.fs.collection('colaboradores').ref.doc(idColaborador)
                
            await coRef.collection('eventos').doc(idEvento).set({
                puesto: puesto,
                inicia: inicia,
                termina: termina
            })

        }
    }

    async checkDisponibilidadColaborador(idCo, inicia, termina) {
        const coRef = this.fs.collection('colaboradores').ref.doc(idCo)

        var eventosQueInician = await coRef.collection('eventos')
            .where('inicia', '>=', inicia)
            .where('inicia', '<=', termina)
            .get()

        var eventosQueTerminan = await coRef.collection('eventos')
            .where('termina', '>=', inicia)
            .where('termina', '<=', termina)
            .get()
        

        return eventosQueInician.size > 0 || eventosQueTerminan.size > 0 ? false : true
        
    }

    async checkPostulado(idEvento: string, idColaborador: string) {
        const coRef = this.fs.collection('colaboradores').ref.doc(idColaborador)
        const evento = await coRef.collection('eventos').doc(idEvento).get()
        
        return evento.exists ? true : false
    }

    async getEquipo(idEvento, idUser) {
        // Referencia a la información del evento
        const eventoRef = this.fs.collection('eventos').ref.doc(idEvento).collection('personal')

        // Tomar la data del equipo
        var personalData = await eventoRef.doc('personal').get()
        var personalObj = personalData.data()
        var equipoData = await eventoRef.doc('equipo').get()
        var equipoObj = equipoData.data()


        
            // Definir objeto de equipo
            var equipo = []

            // Por cada puesto del equipo obtener un arreglo
            Object.keys(personalObj).forEach(puesto => {
                var puestoArray = []

                // Por cada puesto, invocar los perfiles de cada miembro y asignarlo a un array nuevo
                if (equipoObj) {
                    equipoObj[puesto].forEach(async id => {
                    var miembro = await this.getPerfilColaborador(id)
                    if (idUser) {
                        var rate = await this.getUserCoRate(id, idUser)
                        return puestoArray.push({ perfil: miembro, rate: rate })
                    } else {
                        return puestoArray.push({ perfil: miembro })
                    }
                })
                }

                equipo.push({ name: puesto, miembros: puestoArray, cantidad: personalObj[puesto] })
            })

        return equipo
    }

    async getPerfilColaborador(idCo) {
        const coRef = this.fs.collection('colaboradores').ref.doc(idCo)
        const coData = await coRef.get()
        const coPerfil = coData.data()
        return coPerfil
    }

    async rateColaborador(idCo: string, idUsuario: string, rate: string) {
        if (idCo == idUsuario) { return false }
        else {
            const coRef = this.fs.collection('colaboradores').ref.doc(idCo)
            await coRef.collection('ratings').doc(idUsuario).set({
                rate: rate
            })
            return rate
        }
    }

    async getUserCoRate(idCo, idUser) {
        const coRef = this.fs.collection('colaboradores').ref.doc(idCo)
        var coRate = await coRef.collection('ratings').doc(idUser).get()
        if (coRate.exists) {
            var userRate = coRate.data().rate
            return userRate
        } else {
            return false
        }
    }

    async getCoRate(idCo) {
        
    }

    async getCoEventos(idCo) {
        const coRef = this.fs.collection('colaboradores').ref.doc(idCo)
        const eventoRef = this.fs.collection('eventos').ref
        var eventosQuery = await coRef.collection('eventos').get()
        
        var eventos = []
        if (eventosQuery.size > 0) {
            eventosQuery.forEach(async evento => {
                var eventoData = await eventoRef.doc(evento.id).get()
                var event = eventoData.data()

                return eventos.push({
                    estado: event.estado,
                    fecha: event.fecha.toDate(),
                    tipo: event.tipoEvento,
                    lugar: event.lugar,
                    id: event.id
                })
            })
        }

        return eventos
    }

    async getCoCalendar(idCo) {
        const today = new Date()
        const coRef = this.fs.collection('colaboradores').ref.doc(idCo)
        var eventosQuery = await coRef.collection('eventos')
                            .orderBy('inicia').startAfter(today).get()
        
        var eventos = []
        if (eventosQuery.size > 0) {
            eventosQuery.forEach(evento => {
                var eventStart = evento.data().inicia.toDate()
                var eventEnd = evento.data().termina.toDate()
                var eventTitle = evento.id
                eventos.push({ id: eventTitle, start: eventStart, end: eventEnd})
            })
        }

        return eventos
    }
}