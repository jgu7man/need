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
        public estado_financiero:'espera' | 'anticipado' | 'pagado' | 'adeudo',
        public estado_equipo: 'espera' | 'completo',
        public fecha: Date,
        public lugar: string,
        public ciudad: string,
        public costo: number
    ){}
}