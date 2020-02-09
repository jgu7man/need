import { Component, OnInit, Input } from '@angular/core';
import { UsuarioModel } from '../../../models/usuario.model';
// import { UsuarioService } from '../../../services/usuario.service';
import { EventoService } from '../../../services/eventos/evento.service';
import { EventoModel } from '../../../models/evento/evento.model';
import { PersonalModel } from '../../../models/evento/personal.model';
import { DatosModel } from '../../../models/evento/datosevento.model';

declare var $;

@Component({
  selector: 'app-tus-eventos',
  templateUrl: './tus-eventos.component.html',
  styleUrls: ['./tus-eventos.component.css']
})
export class TusEventosComponent implements OnInit {

  public usuario: UsuarioModel;
  public eventos: EventoModel[];
  public datos: DatosModel;
  public servicio: PersonalModel
  public evento: any;
  public more: boolean = false;

  constructor(
    // private _usuario: UsuarioService,
    private _eventos: EventoService
  ) {
    this.evento = new EventoModel('', '','', 0, 0, false, 'normal', 'pendiente', 'espera', 'espera', new Date, '', '',0);
    this.datos = new DatosModel(new Date,new Date,'','','','','',0,0),
    this.servicio = new PersonalModel('','')
  }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('needlog'))
    this.getEventos(this.usuario.uid);
  }

  getEventos(userId: string){
    this._eventos.getEventosByUser(userId).then(
      response => { this.eventos = response;},
      error => { console.log(<any>error)}
    )
  }

  

  

}
