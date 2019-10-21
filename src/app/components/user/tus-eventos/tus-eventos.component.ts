import { Component, OnInit, Input } from '@angular/core';
import { UsuarioModel } from '../../../models/usuario.model';
// import { UsuarioService } from '../../../services/usuario.service';
import { EventoService } from '../../../services/evento.service';
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
    this.evento = new EventoModel('','','','','','','', new Date),
    this.datos = new DatosModel(new Date,new Date,'','','','',''),
    this.servicio = new PersonalModel('','','',{})
  }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('needlog'))
    this.getEventos(this.usuario.uid);
  }

  async getEventos(userId: string){
    this._eventos.getEventosByUser(userId).then(
      response => { this.eventos = response;},
      error => { console.log(<any>error)}
    )
  }

  

  

}
