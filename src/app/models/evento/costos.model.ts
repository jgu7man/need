import { PagoModel } from './pago.model';
export class CostosModel {
    constructor(
        public costo_servicio: number,
        public horas_extras: number,
        public costo_horas: number,
        public promocion: number,
        public resto: number,
        public factura: boolean,
        public pagos: PagoModel[],
    ) {}
}