import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoEventoService } from 'src/app/services/colaboradores/coeventos.service';
import { EventoService } from '../../../../../services/eventos/evento.service';
import { EventoModel } from '../../../../../models/evento/evento.model';

@Component({
  selector: 'app-ver-equipo',
  templateUrl: './ver-equipo.component.html',
  styleUrls: [ './ver-equipo.component.css' ],
})
export class VerEquipoComponent implements OnInit {

  public id: string
  @Input() equipo: any
  @Input() estado
  public personal
  public user
  public evento: EventoModel
  constructor(
    private ruta: ActivatedRoute,
    private _coEvento: CoEventoService,
    private _evento: EventoService
  ) {
    this.id = this.ruta.snapshot.params.id
   }

  async ngOnInit() {
    this.evento = await this._evento.getOneEvento(this.id)
    this.equipo = await this._coEvento.getEquipo( this.id, this.evento.usuario )
  }

  



  async rateColaborador(idColaborador, rate) {
    this._coEvento.rateColaborador(idColaborador, this.user.uid, rate)
  }

}
