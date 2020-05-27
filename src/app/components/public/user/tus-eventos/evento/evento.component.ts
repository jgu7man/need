import { Component, OnInit} from '@angular/core';
import { EventoModel } from 'src/app/models/evento/evento.model';
import { DatosModel } from 'src/app/models/evento/datosevento.model';
import { PersonalModel } from 'src/app/models/evento/personal.model';
import { ActivatedRoute } from '@angular/router';
import { CoEventoService } from 'src/app/services/colaboradores/coeventos.service';
import { EventoService } from 'src/app/services/eventos/evento.service';
import { CostosModel } from 'src/app/models/evento/costos.model';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { PagoModel } from 'src/app/models/evento/pago.model';
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
  public pagos: PagoModel[]
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
  
  async ngOnInit() {
    $(document).ready(function(){
      $('.carousel').carousel();
    });

    await this.getData();
    $('app-loading').fadeOut()

  }

  async toggleLoading() {

    await !this.evento
    await !this.costos
    await !this.equipo
    await !this.datos 
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

    this.costos = await (await this._evento.getCostos(this.idEvento)).costos
    this.pagos = await (await this._evento.getCostos(this.idEvento)).pagos
    var datos = await this._evento.getDatos(this.idEvento)
    this.datos = datos as DatosModel
    console.log(this.datos);
    var resEquipo = await this._coEvento.getEquipo(this.idEvento, this.usuario.uid)
    this.equipo = resEquipo
    return 
  }

  onCancel() {
    this._evento.cancelEvento(this.idEvento)
  }

  onDelete() {
    this._evento.deleteEvento(this.idEvento)
  }

}
