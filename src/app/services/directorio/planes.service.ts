import { Injectable } from "@angular/core";

export interface plan {
    name: string,
    precio: number,
    ahorro: string,
    desc: string,
    total: number
}

@Injectable({
    providedIn: 'root'
})
export class PlanesService {

    public plan: any;
    public planes: Array<plan> = [
        {
        name: 'Mensual', 
        precio: 199, 
        ahorro: 'Primer mes gratis', 
        desc: 'Pruébanos el primer mes gratis, luego deberás pagar $200 cada mes',
        total: 0
        },
        {
        name: 'Trimestral', 
        precio: 139, 
        ahorro: '30%', 
        desc: 'Paga ahora mismo 3 meses y obtén un 30% de descuento',
        total: 417
        },
        {
        name: 'Semestral', 
        precio: 119, 
        ahorro: '40%', 
        desc: 'Paga ahora mismo 6 meses y obtén un 40% de descuento',
        total: 714
        },
        {
        name: 'Anual', 
        precio: 99, 
        ahorro: '50%', 
        desc: 'Paga ahora mismo 12 meses y obtén un 50% de descuento',
        total: 1188
        },

    ]

    getPlanes(){
        return this.planes
    }

    getPlan(name){
        this.plan = this.planes.find( plan => plan.name === name )
        return this.plan;
    }
}