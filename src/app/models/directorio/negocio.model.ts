export class NegocioModel {

    constructor(
        public idNegocio: string,
        public idUsuario: string,
        public ownerEmail: string,
        public nombre: string,
        public categoria: string,
        public suscripcion: Date,
        public fechaPago: Date,
        public corte: Date,
        public plan: string,
        public imgPerfil: string,
        public estado: 'solicitud' | 'activo' | 'inactivo'
    ){}
}