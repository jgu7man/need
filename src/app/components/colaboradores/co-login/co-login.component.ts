import { Component, OnInit } from '@angular/core';
import { ColaboradorModel } from '../../../models/colaboradores/colaborador.model';
import { ColaboradorService } from '../../../services/colaboradores/colaborador.service';
import { Location } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-co-login',
  templateUrl: './co-login.component.html',
  styleUrls: ['./co-login.component.css']
})
export class CoLoginComponent implements OnInit {

  public colab: ColaboradorModel
  constructor(
    private _colaboradores: ColaboradorService,
    public location: Location,
    public auth: AuthService,
    private router: Router
  ) {
    this.colab = new ColaboradorModel('','','','','','','','activo')
   }

  ngOnInit() {
    this.auth.user$.pipe().subscribe(user => {
      if (user) {
        this.router.navigate(['/colaborador/perfil'])
      }
    })
  }

  onSubmit() {
    this._colaboradores.onLogin(this.colab.email, this.colab.password)
  }

}
