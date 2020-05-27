import { Injectable } from "@angular/core";
import { AngularFirestore, docChanges } from '@angular/fire/firestore';
import { EquipoModel } from 'src/app/models/colaboradores/equipo.model';
import { PersonalModel } from 'src/app/models/evento/personal.model';
import * as firebase from 'firebase/app';

@Injectable({ providedIn: 'root' })
export class CoEventoService {
    public equipo: EquipoModel
    constructor(
        private fs: AngularFirestore
    ) {
        this.equipo = new EquipoModel([],[],[],[],[],[],[],[])
     }

    async getVacantes(id: string) {
        var eventRef = this.fs.collection( 'eventos' ).ref.doc( id )
        var personalRef = eventRef.collection( 'personal' )
        var vacantes = await personalRef.doc( 'vacantes' ).get()
        if(vacantes.exists){
            return vacantes.data()
        } else {
            var personal = await personalRef.doc( 'personal' ).get()
            personalRef.doc( 'vacantes' ).set( personal.data() )
            return personal.data()
        }
    }
    
    async postular(idEvento: string, idColaborador: string, puesto: string) {

        try {
            // Referencia a la información del evento
            const eventoInfoRef = this.fs.collection( 'eventos' ).ref.doc( idEvento ).collection( 'info' )
            const eventoPersonalRef = this.fs.collection( 'eventos' ).ref.doc( idEvento ).collection( 'personal' )
            const eventoData = await this.fs.collection( 'eventos' ).ref.doc( idEvento ).get()

            const datosEvento = await eventoInfoRef.doc( 'datos' ).get()
            // Conseguir la fecha del evento
            var inicia: Date = datosEvento.get( 'inicia' ).toDate()
            inicia.setHours( inicia.getHours() - 2 )
            var termina = datosEvento.get( 'termina' ).toDate()
            termina.setHours( termina.getHours() + 1 )

            // Revisar la disponibilidad del colaborador
            var disponible = await this.checkDisponibilidadColaborador( idColaborador, inicia, termina )

            if ( !disponible ) { return false }
            else {


                // Preparar para ocupar la vacante
                await eventoPersonalRef.doc( 'vacantes' ).set( {
                    [ puesto ]: firebase.firestore.FieldValue.increment( -1 ),
                    vacantes_total: firebase.firestore.FieldValue.increment(-1)
                }, {merge: true})

                // Ocupar la vacante
                var miembros: any[] = []
                miembros.push(idColaborador)
                await eventoPersonalRef.doc( 'equipo' ).set( {
                    [puesto]: miembros
                }, {merge: true})

                // Registrar el evento en la información del colaborador
                const coRef = this.fs.collection( 'colaboradores' ).ref.doc( idColaborador )

                await coRef.collection( 'eventos' ).doc( idEvento ).set( {
                    puesto: puesto,
                    inicia: inicia,
                    termina: termina,
                    contrato: false
                } )

                // Enviar la información de la postulación

                var postulacion = {}
                postulacion = { ...postulacion, ...datosEvento.data(), ...eventoData.data() }
                postulacion = { ...postulacion }
                postulacion[ 'puesto' ] = puesto

                return postulacion

            }
        } catch (error) {
            console.error(error);
        }
    }


    async desPostular(data: DataPuesto, explicacion) {
        const eventoRef = this.fs.collection( 'eventos' ).ref.doc( data.idEvento )
        const personalRef = eventoRef.collection( 'personal' )
        const vacantesRef = personalRef.doc( 'vacantes' )
        const equipoRef = personalRef.doc( 'equipo' )
        const colaboradorRef = this.fs.collection( 'colaboradores' ).ref.doc( data.idColaborador )
        const coEventosRef = colaboradorRef.collection( 'eventos' )
        
        try {
            await vacantesRef.update( {
                [ data.puesto ]: firebase.firestore.FieldValue.increment( 1 ),
                vacantes_total: firebase.firestore.FieldValue.increment( 1 )
            } )

            await equipoRef.update( {
                [ data.puesto ]: firebase.firestore.FieldValue.arrayRemove( data.idColaborador )
            } )

            await coEventosRef.doc( data.idEvento ).delete()
            await colaboradorRef.collection( 'eventos cancelados' )
                .doc( data.idEvento ).set( {
                    explicacion: explicacion,
                    fechaCancelacion: new Date(),
                    puesto: data.puesto
                } )
            return true
        } catch ( error ) {
            console.error(error);
            return false
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

    async checkPostulado( idEvento: string, idColaborador: string ) {
        const coRef = this.fs.collection( 'colaboradores' ).ref.doc( idColaborador )
        const evento = await coRef.collection( 'eventos' ).doc( idEvento ).get()
        var postData
        if ( evento.exists ) {
            var encargado = evento.data()['encargado'] ? true : false
            postData = { postulado: true, puesto: evento.data().puesto, encargado }
        } else {
            postData = { puesto: false }
        }
        return postData    
    }


    async getEquipo(idEvento, idUser) {
        // Referencia a la información del evento
        const eventoRef = this.fs.collection('eventos').ref.doc(idEvento).collection('personal')

        // Tomar la data del equipo
        var equipoData = await eventoRef.doc('equipo').get()
        var equipoObj = equipoData.data()

        
            // Definir objeto de equipo
            var equipo = []

            // Por cada puesto del equipo obtener un arreglo
        if ( equipoObj ) {
            Object.keys(equipoObj).forEach(puesto => {
                var puestoArray = []

                // Por cada puesto, invocar los perfiles de cada miembro y asignarlo a un array nuevo
                    equipoObj[puesto].forEach(async id => {
                    var miembro = await this.getPerfilColaborador(id)
                    if (idUser) {
                        var rate = await this.getUserCoRate(id, idUser)
                        return puestoArray.push({ perfil: miembro, rate: rate })
                    } else {
                        return puestoArray.push({ perfil: miembro })
                    }
                })
                
                equipo.push({ name: puesto, miembros: puestoArray })
            })
            } else {
                return false
        }
            
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
            var userRate: string = coRate.data().rate
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



export interface DataPuesto {
    idEvento: string,
    puesto: string,
    idColaborador: string
}