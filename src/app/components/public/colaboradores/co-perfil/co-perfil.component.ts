import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/usuarios/auth.service';
import { Router } from '@angular/router';
import { ColaboradorService } from 'src/app/services/colaboradores/colaborador.service';
import { ColaboradorModel } from '../../../../models/colaboradores/colaborador.model';
import { CoauthService } from '../../../../services/colaboradores/coauth.service';

@Component({
  selector: 'app-co-perfil',
  templateUrl: './co-perfil.component.html',
  styleUrls: ['./co-perfil.component.css']
})
export class CoPerfilComponent implements OnInit {

  public eventos
  public ratingUp
  public ratingDown
  public user
  coPerfil: ColaboradorModel
  constructor(
    public auth: CoauthService,
    private router: Router,
    private _colaborador: ColaboradorService
  ) {
    this.coPerfil = new ColaboradorModel( '', '', '', '', '','/assets/img/co_blank_purple.png','solicitud')
   }

  async ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('needlog'))
    this.auth.colab$.pipe().subscribe( async colab => {
      if ( !colab ) {
        this.router.navigate( [ '/colaborador/login' ] )
      } else {
        this.getRating(colab)
        this.getEventosCompletados(colab)
        await this._colaborador.getCoPerfil()
        this._colaborador.coPerfil
          .subscribe( colab => this.coPerfil = colab );
      }
    })

  }

  

  getRating(user) {
    this._colaborador.getCoRating(user.uid).then(res => {
      this.ratingUp = res.positivo
      this.ratingDown = res.negativo
    })
  }

  getEventosCompletados(user) {
    this._colaborador.getEventosCompletados(user.uid).then(res => {
      this.eventos = res
    })
  }

}
