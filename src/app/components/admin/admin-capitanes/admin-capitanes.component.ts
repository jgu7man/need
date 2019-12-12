import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ColaboradorService } from '../../../services/colaboradores/colaborador.service';
import { AdminAlertaService } from '../../../services/admin/admin-alerta.service';

@Component({
  selector: 'app-admin-capitanes',
  templateUrl: './admin-capitanes.component.html',
  styleUrls: ['./admin-capitanes.component.css']
})
export class AdminCapitanesComponent implements OnInit {

  constructor(
    private fs: AngularFirestore,
    private _co: ColaboradorService,
    private _alerta: AdminAlertaService
  ) { }
  public capitanes
  public emailToSearch

  ngOnInit() {
    this.getCapitanes()
  }

  async getCapitanes() {
    this.capitanes = []
    const coRef = this.fs.collection('colaboradores').ref
    var coData = await coRef.where('capitan', '==', true).get()
    coData.forEach(co => {
      this.capitanes.push({coId: co.id, data: co.data()})
    })
  }

  onSearch() {
    this._co.coSearch(this.emailToSearch).then(res => {
      console.log(res);
      if (res == 0) {
        this._alerta.sendAlertaCont('El email que buscas no se encuentra en el equipo. Debe registrarse primero para trabajar en NEED Team')
      } else {
        this._co.setCapitan(res).then(res => {
          this._alerta.sendAlertaCont('Usuario agregado como capitan')
          this.getCapitanes()
        })
      }
    })
  }

  onDeleteAsCap(capId) {
    this.fs.collection('colaboradores').ref.doc(capId).update({
      capitan: false
    }).then(res => {
      this.getCapitanes()
    })
    
  }

}
