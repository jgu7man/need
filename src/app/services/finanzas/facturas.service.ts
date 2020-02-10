import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { TransaccionModel } from '../../models/finanzas/transaccion.model';
import { FacturaModel } from '../../models/finanzas/factura.model';

@Injectable({ providedIn: 'root' })
export class FacturaService {
    constructor(
        private fs: AngularFirestore
    ) {
        
    }

    async saveDatosFacturacion(uid, datosFactura: FacturaModel) {
        const userDoc = this.fs.collection('usuarios').ref.doc(uid)

        const datos = {
            razon: datosFactura.razon,
            RFC: datosFactura.RFC,
            email: datosFactura.email,
            telefono: datosFactura.telefono
        }

        userDoc.collection('datos').doc('facturacion').set(datos)
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







    async createFactura( datosFactura:FacturaModel) {

        var factura = {}
        await Object.keys(datosFactura).forEach(key => { factura[key] = datosFactura[key] })
        this.fs.collection('facturas').ref.add(factura)
        
    }







    async getFacturasByMes(month, filtro) {
        const coll = this.fs.collection('facturas').ref
        var facturas: FacturaModel[] = [];


        if (filtro == 'todas') {
            let resColl = await coll.where('mesFacturado', '==', month).get();
            
            (await resColl).forEach(doc => {
                console.log(doc.data())
                var factura:FacturaModel = doc.data() as FacturaModel
                factura.fecha = doc.data().fecha.toDate()
                factura['id'] = doc.id
                facturas.push(factura)    
            })


        } else if (filtro == 'requeridas') {
            let resColl = await coll
                .where('requerida', '==', true)
                .where('mesFacturacion', '==', month).get();
            
            if (resColl.size > 0) {
                (await resColl).forEach(doc => {
                   console.log(doc.data())
                    var factura:FacturaModel = doc.data() as FacturaModel
                    factura.fecha = doc.data().fecha.toDate()
                    factura['id'] = doc.id
                    facturas.push(factura)    
                }) 
            } else {
                console.log('No hay facturas requeridas este mes')
            }

        } else if ('publicas') {

            let resColl = await coll.where('mesFacturado', '==', month).get();
            
            (await resColl).forEach(doc => {
                console.log(doc.data())
                var factura: FacturaModel = doc.data() as FacturaModel
                
                if (factura.tipo_factura == 'publica') {
                    factura.fecha = doc.data().fecha.toDate()
                    factura['id'] = doc.id
                    facturas.push(factura)    
                }

            })

        }


        return facturas
    }


    async getOneFactura(idFactura: string) {
        const facColl = this.fs.collection('facturas').ref
        const facDoc = facColl.doc(idFactura).get()
        var factura: FacturaModel = (await facDoc).data() as FacturaModel
        factura.fecha = (await facDoc).get('fecha').toDate()
        
        return factura
    }






    async getFacturaUserData(uid) {
        const userDoc = this.fs.collection('usuarios').ref.doc(uid)
        const facturaDoc = await userDoc.collection('datos').doc('facaturacion').get()
        if (facturaDoc.exists) var facturaData = facturaDoc.data() 
        return facturaData
    }
}