export class HelpMessageModel {
    constructor(
        public nombre: string,
        public email: string,
        public telefono: string,
        public asunto: string,
        public mensaje: string,
        public fechayhora: Date
    ) {
        
    }
}