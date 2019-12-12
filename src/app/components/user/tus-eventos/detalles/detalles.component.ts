import { Component, OnInit, Input } from '@angular/core';
import { EventoModel } from '../../../../models/evento/evento.model';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsuarioService } from '../../../../services/usuario.service';
import { UsuarioModel } from '../../../../models/usuario.model';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  @Input() id: any;
  public evento: EventoModel
  public owner: boolean = false
  public uid: string
  public usuario: UsuarioModel
  constructor( 
    private fs: AngularFirestore,
    private ruta: ActivatedRoute,
    private _usuario: UsuarioService
    ) {
    this.evento = new EventoModel('', '', '', '', '', '', 'pendiente', new Date, '');
    this.usuario = new UsuarioModel('','','','')
   }

  async ngOnInit() {
    // Obtener id evento
    if (!this.id) {
      this.ruta.parent.url.subscribe(params => {
        this.id = params[params.length - 1].path
      })
    }
    
    // Obtener detalles del evento
    var eventoRef = this.fs.collection('eventos').ref.doc(this.id)
    var evento = await eventoRef.get()
    const detalles = evento.data()

    detalles.fecha = evento.data().fecha.toDate()
    this.evento = detalles as EventoModel
    this.uid = evento.data().usuario
    
    // Consultar si es propietario del evento o colaborador
    var userloged = JSON.parse(localStorage.getItem('needlog'))

      if (userloged.uid == this.uid) {
        this.owner = true
      } else {
        this.usuario = await this._usuario.getUserPerfil(this.uid) as UsuarioModel
      }

    
  }

}
