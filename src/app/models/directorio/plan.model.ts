export class PlanModel {
    constructor(
        public id: string,
        public nombre: string,
        public precio: number,
        public ahorro: string,
        public desc: string,
        public pago_inicial: number
    ) {
        
    }
}