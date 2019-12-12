export class ColaboradorModel{
    constructor(
        public uid: string,
        public email: string,
        public nombre: string,
        public apellido_paterno: string,
        public apellido_materno: string,
        public imgPerfil: string,
        public estado: 'solicitud' | 'activo' | 'inactivo'
    ){}
}