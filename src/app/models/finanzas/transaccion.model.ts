import { FacturaModel } from './factura.model';

export class TransaccionModel {
    constructor(
        public idTransaccion: string,
        public idServicio: string,
        public idUsuario: string,
        
        public concepto: 'evento' | 'suscripcion' | 'promocion',
        public factura: FacturaModel,

        public imgTicket: string,
        public adjudicada: boolean,
        public tipo_pago: 'en linea' | 'transferencia'
    ) {
        
    }
}