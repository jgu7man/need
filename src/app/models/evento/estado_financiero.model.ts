import { AnticipoEventoModel } from './anticipo.model';
export class EstadoFinancieroModel {
    constructor(
        public total: number,
        public subtotal: number,
        public iva: number,
        public factura: boolean,
        public folio: any,
        public anticipos: AnticipoEventoModel[],
        public estado:'espera' | 'anticipado' | 'pagado' | 'adeudo',
    ) {}
}