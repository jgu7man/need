export class FacturaModel {
    constructor(
        public folio: any,
        public fecha: Date,
        public mesFacturado: Date,

        public idServicio: string,
        public concepto: 'evento' | 'suscripcion' | 'promocion',
        public descripcion: string,
        public RFC: string,
        public razon: string,
        public email: string,
        public telefono: number,
        public subtotal: number,
        public iva: number,
        public total: number,
        public tipo_factura: 'privada' | 'publica',
    ) { }
}