import { PreciosPersonalModel } from "./precios.personal.model";

export class ListaPreciosModel {
    constructor(
        public concept: string,
        public precio: string,
        public imagen: string,        
    ){}
}

export const PreciosPersonal:PreciosPersonalModel = {
    mesero:350,
    jefe: 1200,
    barman: 350,
    bartender: 800,
    escamoche: 400,
    valet: 350,
    hostess: 350,
    vigilante: 350

}

export const ListaDePrecios:Array<object> = [
    { id: 'mesero',concept: 'Mesero', precio: '350', imagen: '../../../../assets/img/equipo/meseros1.jpg' },
    { id: 'capitanMesero',concept: 'Capitán de meseros', precio: '1200', imagen: '../../../../assets/img/equipo/jefedemeseros.jpg' },
    { id: 'barman', concept: 'Barman', precio: '350', imagen: '../../../../assets/img/equipo/barman2.jpg' },
    { id: 'bartender',concept: 'Bartender', precio: '800', imagen: '../../../../assets/img/equipo/barman2.jpg' },
    { id: 'escamoche',concept: 'Escamoche', precio: '400', imagen: '../../../../assets/img/equipo/pdbarra2.jpg' },
    { id: 'valet',concept: 'Valet parking', precio: '350', imagen: '../../../../assets/img/equipo/valetparking.jpg' },
    { id: 'hostess',concept: 'Hostess', precio: '350', imagen: '../../../../assets/img/equipo/hostess.jpg' },
    { id: 'vigilante',concept: 'Vigilante', precio: '350', imagen: '../../../../assets/img/equipo/vigilante.jpg' },
]