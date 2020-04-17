import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { TransaccionModel } from 'src/app/models/finanzas/transaccion.model';
import { FacturaService } from '../finanzas/facturas.service';

@Injectable({ providedIn: 'root' })
export class SuscripcionService {
    constructor(
        private fs: AngularFirestore,
        private _factura: FacturaService
    ) {
        
    }

    async setPagoSuscripcion(transaccion: TransaccionModel) {
        const suscripColl = this.fs.collection('suscripciones').ref,
        today = new Date(),
        nextMonth = new Date( today.getFullYear(), today.getMonth(),today.getDate())
        
        var idNegocio
                
            
        if (!transaccion.idServicio){
            
            
            var suscrip = await suscripColl.add({
                idUsuario: transaccion.idUsuario,
                fecha_registro: today,
                fecha_corte: nextMonth,
                plan: transaccion.factura.descripcion,
                activa: true
            })
            
            
            idNegocio = suscrip.id
            suscripColl.doc(idNegocio).update({ idNegocio: idNegocio })
            this.fs.collection('usuarios').ref.doc(transaccion.idUsuario).update({
                idNegocio: idNegocio
            })

        
        } else {
        
            idNegocio = transaccion.idServicio
            suscripColl.doc(transaccion.idServicio).update({
                fecha_corte: nextMonth,
                plan: transaccion.factura.descripcion
            })
            


        }

        transaccion.factura.idServicio = idNegocio
        this._factura.createFactura(transaccion.factura)
            

        return idNegocio
    }
}