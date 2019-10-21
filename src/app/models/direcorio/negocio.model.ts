export class NegocioModel {

    constructor(
        public idNegocio: string,
        public idUsuario: string,
        public nombre: string,
        public imgPerfil: string,
        public categoria: string,
        public telefono: string,
        public email: string,
        public sitioweb: string,
        public direccion: string,
        public colonia: string,
        public ciudad: string,
        public descripcion: string,
        public rating: any,
        public images: Array<string>,
        public comentarios: Array<string>
    ){}
}