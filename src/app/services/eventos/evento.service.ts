import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFirestore, docChanges } from '@angular/fire/firestore';
import { EventoModel } from 'src/app/models/evento/evento.model';
import { Actividad } from 'src/app/models/evento/actividad.model';
import { HistorialService } from '../historial.service';
import { PersonalModel } from 'src/app/models/evento/personal.model';
import { CostosModel } from 'src/app/models/evento/costos.model';
import { DatosModel } from 'src/app/models/evento/datosevento.model';
import { AlertaService } from '../alerta.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PagoModel } from 'src/app/models/evento/pago.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class EventoService{
 
    private apiKey = 'AIzaSyD5qs1RP5Hm53w19CXYG_5VGm7zi0O4Vns'
    constructor(
        private fs: AngularFirestore,
        private _historial: HistorialService,
        private _alerta: AlertaService,
        private _location: Location,
        private router: Router,
        private _http: HttpClient,
    ) {}

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
        } )
        datos.inicia = new Date( datos.inicia )
        datos.termina = new Date( datos.termina)
        console.log(datos);

        var eventRef = this.fs.collection('eventos').ref.doc(idEvento)
        await eventRef.collection('info').doc('datos').set(datos)
        await eventRef.collection('personal').doc('personal').set(personal)
        await eventRef.collection('finanzas').doc('costos').set(finanzas)
        // crear vacantes
        this.saveVacantes(idEvento, personal)

        // registrar historial
        this._historial.setActividad('eventos', evento, 'usuario', 'Evento creado', 'evento')

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
            return fechaSolicitada == eventDate ? disponible = false : disponible = true
        })
        return disponible

    }


    async saveVacantes(idEvento, personal) {
        try {
            var eventRef = this.fs.collection( 'eventos' ).ref.doc( idEvento ).collection( 'personal' )

            function sum( obj ) {
                var sum = 0;
                for ( var el in obj ) {
                    if ( obj.hasOwnProperty( el ) ) {
                        sum += parseFloat( obj[ el ] );
                    }
                }
                return sum;
            }

            var vacantes_total = sum(personal)

            await eventRef.doc( 'vacantes' ).set( personal )
            await eventRef.doc( 'vacantes' ).update({vacantes_total: vacantes_total})
        } catch (error) {
            console.error(error);
        }
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


    

    

    async getEventosByCity() {
        $('app-loading').fadeIn()
        const waitFor = (ms) => new Promise(r => setTimeout(r, ms))
        var eventos = []
        var evento: EventoModel
        var today = new Date()
        var lat: number, lng: number
        // console.log('ejecutado')
        
        navigator.geolocation.getCurrentPosition( setCords, noGeocords, {
            enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 10000
        } )
        function setCords(geo) {
            lat = geo.coords.latitude
            lng = geo.coords.longitude
        }
        function noGeocords() {
            console.error('No se encontraron cordenadas');
        }
        await waitFor( 500 )
        console.log(lat, lng)
        var ubi = await this.geoCoder(lat, lng).toPromise()
        console.log(ubi)
        
        var splitUbi = ubi.results[0].formatted_address.split(',')
        var area = splitUbi[0]
        console.log(area)
        
        var eventRef = await this.fs.collection('eventos').ref
        .where('area','==', area)
        .orderBy('fecha').startAfter(today).get()
        
        eventRef.forEach( event => {
            evento = event.data() as EventoModel
            evento.fecha = event.data().fecha.toDate()
            eventos.push(evento)
        } )
        
        $( 'app-loading' ).fadeOut()

        return eventos
    }

    geoCoder(lat: number, long: number): Observable<any>{
        return this._http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&result_type=administrative_area_level_1&key=" + this.apiKey)
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
            .where('usuario', '==', id).orderBy('fecha', 'asc').get()
        
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
        var equipo = await eventoRef.collection('personal').doc('equipo').get()
        var infoPersonal = personal.data()
        return infoPersonal
    }
    async getEquipo( idEvento ) {
        var eventoRef = this.fs.collection( 'eventos' ).ref.doc( idEvento )
        var personal = await eventoRef.collection( 'personal' ).doc( 'personal' ).get()
        var equipoDoc = await eventoRef.collection( 'personal' ).doc( 'equipo' ).get()
        if(equipoDoc.exists) {
            var puestos: any[] = Object.keys( equipoDoc.data() )
            var equipo: any[] = []
            
            // Arma un arregle de puestos
            await puestos.forEach(async  (puesto: string) => {
                let Puesto: string[] = equipoDoc.data()[ puesto ]
                let miembros: any[] = []
                
                // Arma un arreglo de miembros
                await Puesto.forEach( async miembroId => {
                    var miembroDoc = await this.fs.collection( 'colaboradores' ).ref.doc( miembroId ).get()
                    miembros.push(miembroDoc.data())
                })
                equipo.push( {
                    name: puesto,
                    cantidad: personal.data()[ puesto ],
                    miembros: miembros
                } )
                return 
    
            } )
            console.log(equipo);
            return equipo
        } else {
            return false
        }
    }
    async getDatos(idEvento) {
        var eventoRef = this.fs.collection('eventos').ref.doc(idEvento)
        var infoDatos = await eventoRef.collection('info').doc('datos').get()
        const datos = infoDatos.data() as DatosModel
        datos.inicia = new Date(infoDatos.data().inicia)
        datos.termina = new Date(infoDatos.data().termina)
        return datos
    }
    async getCostos(idEvento) {
        var eventoRef = this.fs.collection('eventos').ref.doc(idEvento)
        var infoCostos = await eventoRef.collection('finanzas').doc('costos').get()
        var pagosCol = await eventoRef.collection('pagos').orderBy('fecha', 'asc').get()
        var pagos = []
        pagosCol.forEach(pago => {
            var pay = pago.data()
            pay.fecha = pago.data().fecha.toDate()
            pagos.push(pay)
        })
        return {
            costos: infoCostos.data() as CostosModel,
            pagos: pagos as PagoModel[]
        }    
    }

    async cancelEvento(idEvento) {
        var doc = this.fs.collection('eventos').ref.doc(idEvento)
        
        // revisar si está pagado
        var eventoRes = await doc.get()
        var eventoEdo = eventoRes.get('estado_financiero')
        if (eventoEdo == 'anticipo' || eventoEdo == 'pagado') {
            this._alerta.alertAsk('Si cancelas ahora tu evento, perderás el 50% del total del evento')
                .subscribe(respuesta => {
                    respuesta == 'aceptar' ? (
                        doc.update({ estado: 'cancelado' }),
                        this._historial.setActividad('eventos', idEvento, 'usuarios', 'Evento cancelado', 'evento'),
                        this.router.navigateByUrl('/usuario', { skipLocationChange: true })
                        .then(() => this.router.navigate(['usuario/tus-eventos'])) 
                        ) : $('app-alertas').fadeToggle()
                })
        } else {
            await doc.update({ estado: 'cancelado' })
            this._historial.setActividad('eventos', idEvento, 'usuarios', 'Evento cancelado', 'evento'),
            this._alerta.sendAlertaCont('Evento cancelado').subscribe(res => {
                this.router.navigateByUrl('/usuario', { skipLocationChange: true })
                .then(() => this.router.navigate(['usuario/tus-eventos'])) 
            })
        }
    }

    async deleteEvento(idEvento) {
        try {
            var eventoRef = this.fs.collection( 'eventos' ).ref.doc( idEvento )
            eventoRef.collection( 'finanzas' ).get().then( docs => { docs.forEach( doc => { eventoRef.collection( 'finanzas' ).doc( doc.id ).delete() } ) } )
            eventoRef.collection( 'info' ).get().then( docs => { docs.forEach( doc => { eventoRef.collection( 'info' ).doc( doc.id ).delete() } ) } )
            eventoRef.collection( 'personal' ).get().then( docs => { docs.forEach( doc => { eventoRef.collection( 'personal' ).doc( doc.id ).delete() } ) } )
            eventoRef.collection( 'historial' ).get().then( docs => { docs.forEach( doc => { eventoRef.collection( 'historial' ).doc( doc.id ).delete() } ) } )
            eventoRef.delete(),
                this._historial.setActividad( 'eventos', idEvento, 'usuarios', 'Evento eliminado', 'personal' ),
                this.router.navigateByUrl( '/usuario', { skipLocationChange: true } )
                    .then( () => this.router.navigate( [ 'usuario/tus-eventos' ] ) )
            return true
        } catch (error) {
            console.error(error);
        }
    }


    async aceptarContrato(idEvento) {
        const eventoRef = this.fs.collection( 'eventos' ).ref.doc( idEvento )
        return eventoRef.update({contrato_aceptado: true})
    }
}