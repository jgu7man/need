import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../../services/evento.service';
import { EventoModel } from '../../../models/evento/evento.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
declare var $;
@Component({
  selector: 'app-evento-creado',
  templateUrl: './evento-creado.component.html',
  styleUrls: ['./evento-creado.component.css']
})
export class EventoCreadoComponent implements OnInit {

  public evento: any;
  public idEvento: any;

  constructor(
    private _evento: EventoService,
    private _Router: Router,
    private _Route: ActivatedRoute
    ) {
    this.evento = new EventoModel('', '', '', '', '', 0, 'pendiente',new Date, '');
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

}
