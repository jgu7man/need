import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ColaboradorService } from '../../../services/colaboradores/colaborador.service';
import { AdminAlertaService } from '../../../services/admin/admin-alerta.service';

@Component({
  selector: 'app-admin-bartenders',
  templateUrl: './admin-bartenders.component.html',
  styleUrls: ['./admin-bartenders.component.css']
})
export class AdminBartendersComponent implements OnInit {

  constructor(
    private fs: AngularFirestore,
    private _co: ColaboradorService,
    private _alerta: AdminAlertaService
  ) { }
  public bartenders
  public emailToSearch

  ngOnInit() {
    this.getBartenders()
  }

  async getBartenders() {
    this.bartenders = []
    const coRef = this.fs.collection('colaboradores').ref
    var coData = await coRef.where('bartender', '==', true).get()
    coData.forEach(co => {
      this.bartenders.push({coId: co.id, data: co.data()})
    })
  }

  onSearch() {
    this._co.coSearch(this.emailToSearch).then(res => {
      console.log(res);
      if (res == 0) {
        this._alerta.sendAlertaCont('El email que buscas no se encuentra en el equipo. Debe registrarse primero para trabajar en NEED Team')
      } else {
        this._co.setCapitan(res).then(res => {
          this._alerta.sendAlertaCont('Usuario agregado como bartender')
          this.getBartenders()
        })
      }
    })
  }

  onDeleteAsCap(barId) {
    this.fs.collection('colaboradores').ref.doc(barId).update({
      capitan: false
    }).then(res => {
      this.getBartenders()
    })
    
  }

}
