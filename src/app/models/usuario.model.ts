export class UsuarioModel {
    constructor(
        public uid: string,
        public email: string,
        public photoURL: string,
        public displayName: string,
        public nombre?: string,
        public ap_paterno?: string,
        public ap_materno?: string,
        public telefono?: string
    ){}
    }