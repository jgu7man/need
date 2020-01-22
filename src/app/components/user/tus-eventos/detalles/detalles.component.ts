import { Component, OnInit, Input } from '@angular/core';
import { EventoModel } from '../../../../models/evento/evento.model';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsuarioService } from '../../../../services/usuario.service';
import { UsuarioModel } from '../../../../models/usuario.model';
import { CostosModel } from '../../../../models/evento/costos.model';
import { EventoService } from '../../../../services/evento.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  @Input() id: any;
  @Input() evento: EventoModel
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
    this.evento = new EventoModel('', '','', 0, 0, false, 'normal', 'pendiente', 'espera', 'espera', new Date, '', '', 0);
    this.usuario = new UsuarioModel('', '', '', '')
    this.costos = new CostosModel(0,0,0,0,0,false, [])
   }

  async ngOnInit() {
    // Obtener id evento
    
    
    // Obtener detalles del evento
    // var eventoRef = this.fs.collection('eventos').ref.doc(this.id)
    // var evento = await eventoRef.get()
    // const detalles = evento.data()

    // detalles.fecha = evento.data().fecha.toDate()
    // this.evento = detalles as EventoModel
    // this.uid = evento.data().usuario
    
    // this.costos = await this._eventos.getCostos(this.id)
    
    // // Consultar si es propietario del evento o colaborador
    // var userloged = JSON.parse(localStorage.getItem('needlog'))

    //   if (userloged.uid == this.uid) {
    //     this.owner = true
    //   } else {
    //     this.usuario = await this._usuario.getUserPerfil(this.uid) as UsuarioModel
    //   }

    
  }

  checkConfirmado() {
    return this.evento.estado == 'confirmado'
      || this.evento.estado == 'realizado' ?
      true : false
  }

}
