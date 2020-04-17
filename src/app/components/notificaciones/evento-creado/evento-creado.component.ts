import { Component, OnInit, Input } from '@angular/core';
import { EventoService } from 'src/app/services/eventos/evento.service';
import { EventoModel } from 'src/app/models/evento/evento.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
declare var $;
@Component({
  selector: 'app-evento-creado',
  templateUrl: './evento-creado.component.html',
  styleUrls: ['./evento-creado.component.css']
})
export class EventoCreadoComponent implements OnInit {

  public evento: any;
  @Input() idEvento: any;

  constructor(
    private _evento: EventoService,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private _notificaciones: NotificacionesService
    ) {
    this.evento = new EventoModel('', '', '', 0, 0, false, 'normal', 'pendiente', 'espera', 'espera', new Date, '', '', 0);
   }

  ngOnInit() {
    $(".contenido").scrollTop(0);
    this._Route.params.subscribe((params: Params) => {
      this.idEvento = params.idEvento;
    })
    this.getEvento(this.idEvento);
  }

  getEvento(id){
    this._evento.getOneEvento(id).then(
      res => {  this.evento = res
      }
    );
  }

  solicitarPermiso() {
    this._notificaciones.getPermission()
  }

}
