export class PagoModel {
    constructor(
        public fecha: Date,
        public cantidad: number,
        public factura: string,
        public tipo: string,
        public ticket: string,
    ) {
        
    }
}