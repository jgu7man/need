export class TransferenciaModel {
    constructor(
        public id: string,
        public fecha: Date,
        public concepto: 'evento' | 'suscripcion',
        public RFC: string,
        public razon: string,
        public email: string,
        public telefono: number,
        public subtotal: number,
        public iva: number,
        public total: number,
        public factura_req: boolean,
        public adjudicada: boolean,
        public imgTicket: string,
        public idUsuario: string,
        public idServicio: string
    ) {
        
    }
}