import { Component, OnInit } from '@angular/core';
import { ColaboradorModel } from '../../../models/colaboradores/colaborador.model';
import { ColaboradorService } from '../../../services/colaboradores/colaborador.service';
import { Location } from '@angular/common';
import { AuthService } from '../../../services/usuarios/auth.service';
import { Router } from '@angular/router';
import { CoauthService } from '../../../services/colaboradores/coauth.service';

@Component({
  selector: 'app-co-login',
  templateUrl: './co-login.component.html',
  styleUrls: ['./co-login.component.css']
})
export class CoLoginComponent implements OnInit {

  public colab: ColaboradorModel
  constructor(
    public _coauth: CoauthService,
    public location: Location,
    public auth: AuthService,
    private router: Router
  ) {
    this.colab = new ColaboradorModel('','','','','','','activo')
   }

  ngOnInit() {
    this.auth.user$.pipe().subscribe(user => {
      if (user) {
        this.router.navigate(['/colaborador/perfil'])
      }
    })
  }

  onSubmit() {
  }

}
