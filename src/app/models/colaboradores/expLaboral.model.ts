import { TiempoExp } from "./tiempoExp.model";
import { ItemExpLaboral } from "./item.expLaboral.model";

export class ExpLaboralModel {
    constructor(
        public lugares: ItemExpLaboral[],
        public extracto: string,
        public mesero: TiempoExp,
        public barman: TiempoExp,
        public hostess: TiempoExp,
        public seguridad: TiempoExp
    ){}
}