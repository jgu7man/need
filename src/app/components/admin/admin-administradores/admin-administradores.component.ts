import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ColaboradorService } from '../../../services/colaboradores/colaborador.service';
import { AlertaService } from '../../../services/alerta.service';
import { AdminAlertaService } from '../../../services/admin/admin-alerta.service';

@Component({
  selector: 'app-admin-administradores',
  templateUrl: './admin-administradores.component.html',
  styleUrls: ['./admin-administradores.component.css']
})
export class AdminAdministradoresComponent implements OnInit {

  public emailToSearch
  constructor(
    private fs: AngularFirestore,
    private _user: ColaboradorService,
    private _alerta: AdminAlertaService
  ) { }

  public admins
  ngOnInit() {
    this.getAdmins()
  }

  async getAdmins() {
    this.admins = []
    var usersCol = await this.fs.collection('usuarios').ref.where('admin', '==', true).get()
    usersCol.forEach(user => {
      this.admins.push({uid: user.id, data: user.data()})
    })
  }

  onSearch() {
    this._user.coSearch(this.emailToSearch).then(res => {
      console.log(res);
      if (res == 0) {
        this._alerta.sendAlertaCont('El usuario que buscas aún no está registrado con su correo. Debe registrarse primero con cuenta de Gmail')
      } else {
        this._alerta.sendAlertaCont('Usuario agregado como administrador')
        this.fs.collection('usuarios').ref.doc(res).update({
          admin: true
        }).then(res => {
          this.getAdmins()
        })
      }
    })
  }

  onDeleteAsAdmin(id) {
    this.fs.collection('usuarios').ref.doc(id).update({
          admin: false
        }).then(res => {
          this.getAdmins()
        })
  }

}
