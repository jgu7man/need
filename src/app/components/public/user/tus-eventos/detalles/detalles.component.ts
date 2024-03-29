import { Component, OnInit, Input } from '@angular/core';
import { EventoModel } from 'src/app/models/evento/evento.model';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { CostosModel } from 'src/app/models/evento/costos.model';
import { EventoService } from 'src/app/services/eventos/evento.service';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  waitFor = (ms) => new Promise(r => setTimeout(r, ms))
  
  public id: any;
  public evento
  @Input() costos: CostosModel
  @Input() owner: boolean = false
  public uid: string
  public usuario: UsuarioModel
  @Input() pagos
  
  constructor( 
    private fs: AngularFirestore,
    private ruta: ActivatedRoute,
    private _usuario: UsuarioService,
    private _eventos: EventoService
  ) {
    this.id = this.ruta.snapshot.paramMap.get('id')
    this.evento = new EventoModel('', '','', 0, 0, false, 'normal', 'pendiente', 'espera', 'espera', new Date, '', '', 0);
    this.usuario = new UsuarioModel('', '', '', '')
    this.costos = new CostosModel(0,0,0,0,0,false, [])
  }

  async ngOnInit() {
    if ( this.id ) {
      // Obtener detalles del evento
      var eventoRef = this.fs.collection( 'eventos' ).ref.doc( this.id )
      var evento = await eventoRef.get()
      const detalles = evento.data()

      detalles.fecha = evento.data().fecha.toDate()
      this.evento = detalles as EventoModel
      this.uid = evento.data().usuario

      this.costos = await ( await this._eventos.getCostos( this.id ) ).costos

      // Consultar si es propietario del evento o colaborador
      var userloged = JSON.parse( localStorage.getItem( 'needlog' ) )

      if ( userloged.uid == this.uid ) {
        this.owner = true
      } else {
        this.usuario = await this._usuario.getUserPerfil( this.uid ) as UsuarioModel
      }

    }
    
  }

  checkConfirmado() {
    return this.evento.estado == 'confirmado'
      || this.evento.estado == 'realizado' ?
      true : false
  }

}
