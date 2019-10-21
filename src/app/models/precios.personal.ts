import { PreciosPersonalModel } from "./precios.personal.model";

export class ListaPreciosModel {
    constructor(
        public concept: string,
        public precio: string,
        public imagen: string,        
    ){}
}

export const PreciosPersonal:PreciosPersonalModel = {
    mesero:400,
    jefe: 1200,
    barman: 400,
    barra: 400,
    valet: 400,
    hostess: 400,
    seguridad: 400

}

export const ListaDePrecios:Array<object> = [
    {concept: 'mesero', precio: '400', imagen: '../../../../assets/img/equipo/meseros1.jpg' },
    {concept: 'jefe de meseros', precio: '1200', imagen: '../../../../assets/img/equipo/jefedemeseros.jpg' },
    {concept: 'barman', precio: '400', imagen: '../../../../assets/img/equipo/barman2.jpg' },
    {concept: 'personal de barra', precio: '400', imagen: '../../../../assets/img/equipo/pdbarra2.jpg' },
    {concept: 'valet parking', precio: '400', imagen: '../../../../assets/img/equipo/valetparking.jpg' },
    {concept: 'hostess', precio: '400', imagen: '../../../../assets/img/equipo/hostess.jpg' },
    {concept: 'seguridad', precio: '400', imagen: '../../../../assets/img/equipo/seguridad.jpg' },
]