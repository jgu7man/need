import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { FacturaModel } from '../models/evento/factura.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PagoService {
    constructor(
        private fs: AngularFirestore,
        private auth: AuthService,
        private _router: Router
    ) {
        
    }

    async saveDatosFacturacion(idServicio, datosFactura: FacturaModel) {
        const user = JSON.parse(localStorage.getItem('needlog'))
        const userDoc = this.fs.collection('usuarios').ref.doc(user.uid)

        var collection
        idServicio == 'evento' ? collection = 'eventos' : collection == 'suscripciones'
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


    createFactura(idServicio, datosFactura: FacturaModel) {
        const user = JSON.parse(localStorage.getItem('needlog'))
        this.fs.collection('facturas').ref.doc(idServicio).set({
            idUsuario: user.uid,
            razon: datosFactura.razon,
            RFC: datosFactura.RFC,
            email: datosFactura.email,
            telefono: datosFactura.telefono,
            concepto: 'evento',
            requerida: datosFactura.requerida,
            subtotal: datosFactura.subtotal,
            iva: datosFactura.iva,
            total: datosFactura.total,
            tipo_pago: datosFactura.tipo_pago
        })
        
    }

    async onPagar(idServicio, datosFactura: FacturaModel) {
        await this.auth.user$.pipe().subscribe(async user => {
            if (user) {
                var collection
                idServicio == 'evento' ? collection = 'eventos' : collection == 'suscripciones'
                const servicioDoc = this.fs.collection(collection).ref.doc(idServicio)
        
                var pago = await servicioDoc.collection('pagos').add({
                    fecha: new Date(),
                    cantidad: datosFactura.subtotal,
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