export class EventoModel {

    constructor(
        public id: string,
        public usuario: string,
        public tipoEvento: any,
        public personas: number,
        public calidad: any,
        public promocionado: boolean,
        public solicitud: 'normal' | 'urgente',
        public estado: 'pendiente' | 'creado' | 'confirmado' | 'cancelado' | 'realizado',
        public estado_financiero:'espera' | 'anticipo' | 'pagado' | 'adeudo',
        public estado_equipo: 'espera' | 'completo',
        public fecha: Date,
        public lugar: string,
        public area: string,
        public costo: number
    ){}
}