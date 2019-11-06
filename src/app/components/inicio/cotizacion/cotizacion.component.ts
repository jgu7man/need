import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatosModel } from '../../../models/evento/datosevento.model';
import { PersonalModel } from '../../../models/evento/personal.model';
import { PreciosPersonalModel } from "../../../models/precios.personal.model";
import { PreciosPersonal } from '../../../models/precios.personal';
import { EventoModel } from 'src/app/models/evento/evento.model';
import { ExtrasModel } from '../../../models/evento/extras.model';
import { UsuarioModel } from '../../../models/usuario.model';
declare var $

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {

  public personal: PersonalModel;
  public evento: EventoModel;
  public extras: ExtrasModel;
  public usuario: UsuarioModel;
  public precios = PreciosPersonal;
  public total: number;
  public idEvento:any;
  

  constructor(
    private _Route: ActivatedRoute,
    private _Router: Router,
  ) {
    this.personal = new PersonalModel( '', 0, 0, []);
    this.evento = new EventoModel('', '', 0, 0, 0, 0, 'pendiente',new Date, '');
    this.extras = new ExtrasModel(0, 0, 0, 0, 0);
    this.usuario = new UsuarioModel('', '', '', '');
   }

  ngOnInit() {
    this._Route.params.subscribe((params: Params) => {
      this.idEvento = params.idEvento;
      var evento = params.idEvento+'evento';
      var personal = params.idEvento+'personal';
      var extras = params.idEvento+'extras';
      this.evento = JSON.parse(sessionStorage.getItem(evento));
      this.personal = JSON.parse(sessionStorage.getItem(personal));
      this.extras = JSON.parse(sessionStorage.getItem(extras));
    });  
  }
    
  getExtras() {
    if (this.extras.barman > 0 ) {
      Object.defineProperty(this.personal.extras, 'barman', 
      {value: this.extras.barman,enumerable: true,configurable: true,writable: true});
    }
    if (this.extras.barra > 0 ) {
      Object.defineProperty(this.personal.extras, 'barra', 
      {value: this.extras.barra,enumerable: true,configurable: true,writable: true});
    }
    if (this.extras.valet > 0 ) {
      Object.defineProperty(this.personal.extras, 'valet', 
      {value: this.extras.valet,enumerable: true,configurable: true,writable: true});
    }
    if (this.extras.hostess > 0 ) {
      Object.defineProperty(this.personal.extras, 'hostess', 
      {value: this.extras.hostess,enumerable: true,configurable: true,writable: true});
    }
    if (this.extras.seguridad > 0 ) {
      Object.defineProperty(this.personal.extras, 'seguridad', 
      {value: this.extras.seguridad,enumerable: true,configurable: true,writable: true});
    }
    
  }

  contratar(){
    this.getExtras();
    this.total = +$('#total').text();
    this.evento.costo = this.total;
    
    
    sessionStorage.setItem(this.idEvento+'personal', JSON.stringify(this.personal));
    sessionStorage.setItem(this.idEvento+'extras', JSON.stringify(this.extras));

    var log = JSON.parse(localStorage.getItem('needlog'));
    
    if (!log) {
      this._Router.navigate(['login/'+this.idEvento]);
    } else {
      this.evento.usuario = this.usuario.uid;
      sessionStorage.setItem(this.idEvento+'evento', JSON.stringify(this.evento));
      this._Router.navigate(['crear-evento/'+this.idEvento]);
    }  

  }

}
