export class SuscripcionModel {
    constructor(
        public idUsuario: string,
        public idNegocio: string,
        public fecha_registro: Date,
        public fecha_corte: Date,
        public plan: string,
        public activa: boolean
    ) {
        
    }
}