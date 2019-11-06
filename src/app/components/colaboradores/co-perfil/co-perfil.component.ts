import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ColaboradorService } from '../../../services/colaboradores/colaborador.service';

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
  constructor(
    public auth: AuthService,
    private router: Router,
    private _colaborador: ColaboradorService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('needlog'))
    this.auth.user$.pipe().subscribe(user => {
      if (!user) {
        this.router.navigate(['/colaborador/login'])
      }
    })

    this.getRating()
    this.getEventosCompletados()
  }

  getRating() {
    this._colaborador.getCoRating(this.user.uid).then(res => {
      this.ratingUp = res.positivo
      this.ratingDown = res.negativo
    })
  }

  getEventosCompletados() {
    this._colaborador.getEventosCompletados(this.user.uid).then(res => {
      this.eventos = res
    })
  }

}
