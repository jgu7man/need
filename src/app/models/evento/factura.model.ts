export class FacturaModel {
    constructor(
        public tipo_pago: 'evento' | 'suscripcion',
        public folio: any,
        public RFC: string,
        public razon: string,
        public email: string,
        public telefono: number,
        public subtotal: number,
        public iva: number,
        public total: number,
        public requerida: boolean
    ) {
        
    }
}