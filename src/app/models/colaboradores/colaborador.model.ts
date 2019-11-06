export class ColaboradorModel{
    constructor(
        public id: string,
        public email: string,
        public password: string,
        public nombre: string,
        public apellido_paterno: string,
        public apellido_materno: string,
        public imgPerfil: string,
        public estado: 'solicitud' | 'activo' | 'inactivo'
    ){}
}