import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FacturaService } from '../finanzas/facturas.service';
import { HistorialService } from '../historial.service';
import { TransaccionModel } from 'src/app/models/finanzas/transaccion.model';

@Injectable({providedIn: 'root'})
export class PagosEventoService {
    constructor(
        private fs: AngularFirestore,
        private _facturas: FacturaService,
        private _historial: HistorialService
    ) { }
    

    async setPagoEvento(transaccion: TransaccionModel) {
        // Busca el evento a adjudicar
            const eventoDoc = this.fs.collection('eventos').ref.doc(transaccion.idServicio)
            var eventoData = await eventoDoc.get()
            var resto = (await eventoDoc.collection('finanzas').doc('costos').get()).get('resto')

    
            // Agrega el pago a la subcoleccion de pagos del evento
            var pago = await eventoDoc.collection('pagos').add({
                fecha: transaccion.factura.fecha,
                cantidad: transaccion.factura.subtotal,
                ticket: transaccion.imgTicket,
                tipo: transaccion.tipo_pago
            })
    
    
            // Define si se liquidó o se abonó al costo total del evento
            var newResto = resto - transaccion.factura.subtotal
            var estadoFinanciero
            newResto > 0 ?
                estadoFinanciero = 'anticipo' :
                estadoFinanciero = 'pagado';
        
            
    
            // Actualiza las subcolecciones correspondientes
            await eventoDoc.collection('pagos').doc(pago.id).update({ factura: pago.id })
            await eventoDoc.collection('finanzas').doc('costos').update({ resto: newResto })
            await eventoDoc.update({
                estado_financiero: estadoFinanciero,
                estado: 'confirmado'
            })
    

            // Crea factura
            transaccion.factura.idServicio = transaccion.idServicio
            await this._facturas.createFactura( transaccion.factura)
            // Registra actividad
        this._historial.setActividad('eventos', transaccion.idServicio, 'usuarios', 'Transferencia adjudicada al evento', 'finanzas')
        
        return transaccion.idServicio
    }
}