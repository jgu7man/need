export class EventoModel {

    constructor(
        public id: string,
        public usuario: any,
        public tipoEvento: any ,
        public personas: any ,
        public calidad: any ,
        public costo: any,
        public estado: 'pendiente'|'confirmado'|'cancelado'|'realizado',
        public fecha: Date,
        public lugar: string
        
    ){}
}