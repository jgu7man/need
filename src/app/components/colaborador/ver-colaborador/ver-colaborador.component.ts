import { Component, OnInit } from '@angular/core';
import { ColaboradorModel } from 'src/app/models/colaboradores/colaborador.model';
import { ColaboradorService } from '../../../services/colaboradores/colaborador.service';
import { ActivatedRoute } from '@angular/router';
import { CoEventoService } from '../../../services/colaboradores/coeventos.service';

@Component({
  selector: 'app-ver-colaborador',
  templateUrl: './ver-colaborador.component.html',
  styleUrls: ['./ver-colaborador.component.css']
})
export class VerColaboradorComponent implements OnInit {

  public colaborador: ColaboradorModel
  public user
  public userCoRate
  public idCo: string
  public ratingUp: number
  public ratingDown: number
  public eventos: number
  public comentario: string
  public comentarios: any[] = []

  constructor(
    public _colaborador: ColaboradorService,
    private _coEvento: CoEventoService,
    private ruta: ActivatedRoute
  ) {
    this.colaborador = new ColaboradorModel('', '', '', '', '', '', '', 'activo')
    this.user = JSON.parse(localStorage.getItem('needlog'))
    this.ruta.params.subscribe(params => {
      this.idCo = params['id']
    })
   }

  ngOnInit() {
    this.getCoPerfil()
    this.getRating()
    this.getEventosCompletados()
    this.getUserCoRate()
    this.getComentarios()
  }

  async getCoPerfil() {
    this.colaborador = await this._colaborador.getCoPerfil(this.idCo) as ColaboradorModel
  }

  getRating() {
    this._colaborador.getCoRating(this.idCo).then(res => {
      this.ratingUp = res.positivo
      this.ratingDown = res.negativo
    })
  }

  getEventosCompletados() {
    this._colaborador.getEventosCompletados(this.idCo).then(res => {
      this.eventos = res
    })
  }

  async getUserCoRate() {
    this.userCoRate = await this._coEvento.getUserCoRate(this.idCo, this.user.uid)
  }

  async rateColaborador(rate) {
    this._coEvento.rateColaborador(this.idCo, this.user.uid, rate)
  }

  onComentar() {
    this._colaborador.comentarCo(this.idCo, this.user.uid, this.comentario)
    this.comentario = ''
    this.getComentarios()
  }

  async getComentarios() {
    this.comentarios = await this._colaborador.getComentarios(this.idCo)
  }

}
