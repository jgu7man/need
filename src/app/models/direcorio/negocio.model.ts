export class NegocioModel {

    constructor(
        public idNegocio: string,
        public idUsuario: string,
        public ownerEmail: string,
        public nombre: string,
        public categoria: string,
        public suscripcion: Date,
        public corte: Date,
        public plan: string,
        public estado: 'solicitud' | 'activo' | 'inactivo'
    ){}
}