import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { FacturaModel } from '../models/factura.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { PagoModel } from '../models/evento/pago.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AlertaService } from './alerta.service';
import { TransferenciaModel } from '../models/transferencia.model';
import { HistorialService } from './historial.service';

@Injectable({ providedIn: 'root' })
export class PagoService {
    constructor(
        private fs: AngularFirestore,
        private st: AngularFireStorage,
        private auth: AuthService,
        private _router: Router,
        private _alerta: AlertaService,
        private _historial: HistorialService
    ) {
        
    }

    porcentaje = new Subject<number>()

    async saveDatosFacturacion(idServicio, datosFactura: FacturaModel) {
        const user = JSON.parse(localStorage.getItem('needlog'))
        const userDoc = this.fs.collection('usuarios').ref.doc(user.uid)

        var collection
        datosFactura.concepto == 'evento' ? collection = 'eventos' : collection == 'suscripciones'
        const servicioDoc = this.fs.collection(collection).ref.doc(idServicio)

        const datos = {
            razon: datosFactura.razon,
            RFC: datosFactura.RFC,
            email: datosFactura.email,
            telefono: datosFactura.telefono
        }

        userDoc.collection('datos').doc('facaturacion').set(datos)
        servicioDoc.collection('finanzas').doc('facturacion').set(datos)
    }

    async getDatosFactura(id, servicio) {
        var collection
        servicio == 'evento' ? collection = 'eventos' : collection == 'suscripciones'
        const coll = this.fs.collection(collection).ref.doc(id)

        const user = JSON.parse(localStorage.getItem('needlog'))
        user

        var datos = await coll.collection('finanzas').doc('facturacion').get()
        if (!datos.exists) {
            var userDatos = this.fs.collection('usuarios').ref.doc(user.uid)
                .collection('datos').doc('facturacion').get()
            return (await userDatos).data() as FacturaModel
        } else {
            return (await datos).data() as FacturaModel
        }
    }


    createFactura(idServicio, datosFactura: FacturaModel) {
        const user = JSON.parse(localStorage.getItem('needlog'))
        this.fs.collection('facturas').ref.doc(idServicio).set({
            idUsuario: user.uid,
            razon: datosFactura.razon,
            RFC: datosFactura.RFC,
            email: datosFactura.email,
            telefono: datosFactura.telefono,
            concepto: datosFactura.concepto,
            requerida: datosFactura.requerida,
            subtotal: datosFactura.subtotal,
            iva: datosFactura.iva,
            total: datosFactura.total,
        })
        
    }

    async pagoTransferencia(idServicio, datosFactura, file: any) {
        var collection
        datosFactura.concepto == 'evento' ? collection = 'eventos' : collection == 'suscripciones'
        const transDoc = this.fs.collection('transferencias').ref.doc(idServicio)
        const user = JSON.parse(localStorage.getItem('needlog'))

        await transDoc.set({
            fecha: new Date(),
            concepto: datosFactura.concepto,
            razon: datosFactura.razon,
            RFC: datosFactura.RFC,
            email: datosFactura.email,
            telefono: datosFactura.telefono,
            subtotal: datosFactura.subtotal,
            iva: datosFactura.iva,
            total: datosFactura.total,
            usuario: user.uid,
            idServicio: idServicio
        })

        const id = new Date().getTime()
            const name = id + file.name
            const path = `tickets_de_pago/${name}`
            const ref = this.st.ref(path)
            const task = this.st.upload(path, file)
            
            $("app-loading").fadeToggle()
            // $("app-uploading").fadeToggle()

            await task.percentageChanges().subscribe(res => {
              return this.porcentaje.next(res)
            })
    
            task.snapshotChanges().pipe(
                finalize(() => {
                    ref.getDownloadURL().subscribe(res => {
                        transDoc.update({ imgTicket: res }).then(res => {
                            this._alerta.sendAlertaCont('Se agregó la información de tu pago, la revisión puede tardar 24 horas, hasta entonces debes esperar para ver reflejado el pago').subscribe(res => {
                                this._router.navigate(['/usuario/evento/', idServicio])
                            })
                      })
                    })
                })
            ).subscribe()

    }

    async getTrasnferencias() {
        const coll = this.fs.collection('transferencias').ref.orderBy('fecha', 'desc')
        var collRes = await coll.get()
        var transferencias:any[] = []
        collRes.forEach(trans => {
            var transferencia = trans.data()
            transferencia.fecha = trans.data().fecha.toDate()
            transferencia.id = trans.id
            transferencias.push(transferencia)
        })
        return transferencias as TransferenciaModel[]
    }

    async getOneTransferencia(id) {
        const coll = this.fs.collection('transferencias').ref
        var transDoc = await coll.doc(id).get()
        var transferencia = transDoc.data()
        transferencia.id = transDoc.id
        transferencia.fecha = transDoc.data().fecha.toDate()
        return transferencia as TransferenciaModel
    }

    async adjudicarTransferencia(transferencia: TransferenciaModel) {
        console.log(transferencia)
        const doc = this.fs.collection('eventos').ref.doc(transferencia.idServicio)
        const transDoc = await this.fs.collection('transferencias').ref.doc(transferencia.id)

        var docData = await doc.get()
        var costo = docData.get('costo')

        var pago = await doc.collection('pagos').add({
            fecha: new Date(),
            cantidad: transferencia.subtotal,
            ticket: transferencia.imgTicket,
            tipo: 'transferencia'
        })

        console.log(pago.id)

        var estadoFinanciero
        costo > transferencia.subtotal ?
            estadoFinanciero = 'anticipo' :
            estadoFinanciero = 'pagado'
        
        var resto = costo - transferencia.subtotal

        console.log(estadoFinanciero, costo - transferencia.subtotal)

        await doc.collection('pagos').doc(pago.id).update({ factura: pago.id })
        await doc.collection('finanzas').doc('costos').update({ resto: resto })
        await transDoc.update({adjudicada: true})
        await doc.update({
            estado_financiero: estadoFinanciero,
            estado: 'confirmado'
        })

        
        this._historial.setActividad('eventos', transferencia.id, 'usuarios', 'Transferencia adjudicada al evento', 'finanzas')

        this._alerta.sendAlertaCont('Se adjudicó el pago').subscribe(res => {
            this._router.navigateByUrl('/admin', { skipLocationChange: true })
            .then(()=> this._router.navigate(['/admin/transferencias']))
        })
    }

    async onPagar(idServicio, pagoInfo: PagoModel,  datosFactura: FacturaModel) {
        await this.auth.user$.pipe().subscribe(async user => {
            if (user) {
                var collection
                datosFactura.concepto == 'evento' ? collection = 'eventos' : collection == 'suscripciones'
                const servicioDoc = this.fs.collection(collection).ref.doc(idServicio)
        
                var pago = await servicioDoc.collection('pagos').add({
                    fecha: new Date(),
                    cantidad: pagoInfo.cantidad,
                    tipo: pagoInfo.tipo,
                    ticket: pagoInfo.ticket
                })
        
                servicioDoc.collection('pagos').doc(pago.id).update({
                    factura: pago.id
                })

                this.createFactura(pago.id, datosFactura)
                var servicio = await servicioDoc.get()
                var costo = await servicio.get('costo')
                costo <= datosFactura.subtotal ?
                    servicioDoc.update({
                        estado_financiero: 'pagado',
                        estado: 'confirmado'
                    }) :
                    servicioDoc.update({
                        estado_financiero: 'anticipo',
                        estado: 'confirmado'
                    });
                    
            } else {
                this._router.navigate(['/login'])
            }
        })
        
    }

    
}