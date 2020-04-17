import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/usuarios/auth.service";
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { AngularFirestore } from '@angular/fire/firestore';
declare var $: any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  
  public usuario;
  public userNegocios;
  public eventos;
  public votos;
  public nuevaNotificacion
  public notificaciones

  constructor(
    public authService: AuthService,
    private _usuario: UsuarioService,
    private _notificaciones: NotificacionesService,
    private fs: AngularFirestore
  ) { }


  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('needlog'));

    this._usuario.getNegocioUser(this.usuario.uid).then(
      res => { this.userNegocios = res; });
    
    this._usuario.getEventosUserNum(this.usuario.uid).then(
      res => { this.eventos = res; })
    
    this.votos = 0;
    
      if (this.usuario) {
        this.userNegocios = false;
    }
    
    this.getNotificaciones()

  }

  async getNotificaciones() {
    this._notificaciones.getPermission()
    this._notificaciones.receiveMessage()
    this.nuevaNotificacion = this._notificaciones.currentMessage
    this.notificaciones = await this._notificaciones.getUserNotidfications()
  }

  async delNotificacion(id) {
    await this.fs.collection('usuarios').ref.doc(this.usuario.uid)
      .collection('notificaciones').doc(id).delete()
    
    this.notificaciones = []
    this.notificaciones = await this._notificaciones.getUserNotidfications()
  }

}
