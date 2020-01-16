export class ActividadModel {
    constructor(
        public collection: string,
        public document: string,
        public activador: string,
        public date: Date,
        public actividad: string,
        public tipo    : 'finanzas' | 'personal' | 'datos'
    ) {
        
    }
}