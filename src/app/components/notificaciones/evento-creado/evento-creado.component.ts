import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { EventoService } from 'src/app/services/eventos/evento.service';
import { EventoModel } from 'src/app/models/evento/evento.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { AuthService } from '../../../services/usuarios/auth.service';
import { MatSnackBar } from '@angular/material';
declare var $;
@Component({
  selector: 'app-evento-creado',
  templateUrl: './evento-creado.component.html',
  styleUrls: ['./evento-creado.component.css']
})
export class EventoCreadoComponent implements OnInit, AfterViewChecked {

  public evento: any;
  public usuario: any
  public personal: any
  public finanzas: any
  public datos: any
  @Input() idEvento: any;

  constructor(
    private _evento: EventoService,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private _notificaciones: NotificacionesService,
    private _auth: AuthService,
    private _snack: MatSnackBar
    ) {
    this.evento = new EventoModel( '', '', '', 0, 0, false, 'normal', 'pendiente', 'espera', 'espera', new Date, '', '', 0 );
    this._auth.user$.pipe().subscribe( user => {
      this.usuario = user
    })
   }

  ngOnInit() {
    $(".contenido").scrollTop(0);
    this._Route.params.subscribe((params: Params) => {
      this.idEvento = params.idEvento;
    })
    this.getEvento(this.idEvento);
  }

  ngAfterViewChecked() {
    // this._Route.params.subscribe( ( params: Params ) => {
    //   this.idEvento = params.idEvento;
    // } )
    // this.getEvento( this.idEvento );
  }



  getEvento(id){
    this._evento.getOneEvento( id ).then( res => { this.evento = res});
    this._evento.getPersonal( id ).then( res => { this.personal = res} )
    this._evento.getCostos( id ).then( res => { this.finanzas = res.costos } )
    this._evento.getDatos( id ).then( res => { this.datos = res } )
  }

  solicitarPermiso() {
    this._notificaciones.getPermission()
  }

  get invitados() {
    var num
    switch (this.evento.calidad) {
      case 'Deficiente':
        num = 40
        break;
      case 'Regular':
        num = 30
        break;
      case 'Óptima':
        num = 20
        break;
    }
    return num
  }

  get horas_servicio() {
    return 5 + this.finanzas.horas_extras
  }

  acepta_contrato() {
    this._evento.aceptarContrato( this.idEvento ).then( () => {
      this._snack.open('Contrato aceptado', 'ok')
    })
  }


}
