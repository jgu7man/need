import { Component, OnInit } from '@angular/core';
import { PreciosPersonal, ListaDePrecios, ListaPreciosModel } from '../../../models/precios.personal';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css']
})
export class PreciosComponent implements OnInit {

  public precios: any = ListaDePrecios;
  
  constructor() {
    
   }

  ngOnInit() {
  }

}
