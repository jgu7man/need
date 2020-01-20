import { Component, OnInit} from '@angular/core';
import { EventoModel } from '../../../../models/evento/evento.model';
import { DatosModel } from '../../../../models/evento/datosevento.model';
import { PersonalModel } from '../../../../models/evento/personal.model';
import { ActivatedRoute } from '@angular/router';
import { CoEventoService } from '../../../../services/colaboradores/coeventos.service';
import { EventoService } from '../../../../services/evento.service';
import { CostosModel } from '../../../../models/evento/costos.model';
import { UsuarioService } from '../../../../services/usuario.service';
declare var $;

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  public idEvento: any;
  public usuario
  public evento: EventoModel;
  public costos: CostosModel
  public datos: DatosModel;
  public servicio: PersonalModel;
  public equipo: any
  public owner

  constructor(
    private _ruta: ActivatedRoute,
    private _evento: EventoService,
    private _coEvento: CoEventoService,
    private _usuario: UsuarioService
   ) { 
    this._ruta.params.subscribe(params => {
      this.idEvento = params['id']
    })
    
  }
  
  ngOnInit() {
    $(document).ready(function(){
      $('.carousel').carousel();
    });

    this.getData();
  }

  toggleLoading() {
    
  }

  async getData() {
    var detalles = await this._evento.getOneEvento(this.idEvento)
    this.evento = detalles as EventoModel

    // Consultar si es propietario del evento o colaborador
    this.usuario = JSON.parse(localStorage.getItem('needlog'))
    if (this.usuario) {
      if (this.usuario.uid == this.evento.usuario) {
        this.owner = true
      }
    } else {
        this.usuario = await this._usuario.getUserPerfil(this.evento.usuario)
      }

    this.costos = await this._evento.getCostos(this.idEvento)
    var datos = await this._evento.getDatos(this.idEvento)
    this.datos = datos as DatosModel
    var resEquipo = await this._coEvento.getEquipo(this.idEvento, this.usuario.uid)
    this.equipo = resEquipo
  }

  

}
