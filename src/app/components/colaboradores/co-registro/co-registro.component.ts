import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ColaboradorModel } from '../../../models/colaboradores/colaborador.model';
import { RegistrarService } from 'src/app/services/colaboradores/registrar.service';
import { AuthService } from '../../../services/usuarios/auth.service';
import { CoauthService } from '../../../services/colaboradores/coauth.service';

@Component({
  selector: 'app-co-registro',
  templateUrl: './co-registro.component.html',
  styleUrls: ['./co-registro.component.css']
})
export class CoRegistroComponent implements OnInit {

  public colab: ColaboradorModel
  public loged: boolean = false
  constructor(
    public location: Location,
    public _reg: RegistrarService,
    public auth: AuthService,
    public coAuth: CoauthService
  ) {
    this.colab = new ColaboradorModel('','','','','','', 'solicitud')
   }

  ngOnInit() {
  }

  getEmail() {
    this.coAuth.googleSingUp().then(user => {
      this.colab.uid = user.uid
      this.colab.email = user.email
      this.loged = true
    })
  }

  async onSubmit() {
    
    this._reg.onRegistrar(this.colab)
  }

}
