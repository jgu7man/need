import { Component, OnInit } from '@angular/core';
import { ColaboradorModel } from 'src/app/models/colaboradores/colaborador.model';
import { ColaboradorService } from 'src/app/services/colaboradores/colaborador.service';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/usuarios/auth.service';
import { Router } from '@angular/router';
import { CoauthService } from 'src/app/services/colaboradores/coauth.service';

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
    public auth: CoauthService,
    private router: Router
  ) {
    this.colab = new ColaboradorModel('','','','','','','activo')
   }

  ngOnInit() {
    this.auth.colab$.pipe().subscribe(colab => {
      console.log(colab)
      if ( colab ) {
        this.router.navigate(['/colaborador/perfil'])
      }
    })
  }

  onSubmit() {
  }

}
