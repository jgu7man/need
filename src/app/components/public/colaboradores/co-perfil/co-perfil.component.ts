import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/usuarios/auth.service';
import { Router } from '@angular/router';
import { ColaboradorService } from 'src/app/services/colaboradores/colaborador.service';
import { ColaboradorModel } from '../../../../models/colaboradores/colaborador.model';

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
    public auth: AuthService,
    private router: Router,
    private _colaborador: ColaboradorService
  ) {
    this.coPerfil = new ColaboradorModel( '', '', '', '', '','/assets/img/co_blank_purple.png','solicitud')
   }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('needlog'))
    this.auth.user$.pipe().subscribe( user => {
      console.log(user)
      if ( !user ) {
        this.router.navigate( [ '/colaborador/login' ] )
      } else {
        this.getPerfil(user)
        this.getRating(user)
        this.getEventosCompletados(user)
      }
    })

  }

  async getPerfil(user) {
    this.coPerfil = await this._colaborador.getCoPerfil( user.uid )
    console.log(this.coPerfil)
    // if ( this.coPerfil.estado = 'solicitud' ) 
    //   this.router
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
