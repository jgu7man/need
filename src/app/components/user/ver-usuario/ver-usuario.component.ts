import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { EventoService } from '../../../services/evento.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.component.html',
  styleUrls: ['./ver-usuario.component.css']
})
export class VerUsuarioComponent implements OnInit {

  public usuario: UsuarioModel
  public co
  public coUserRate
  public uid: string
  public ratingUp: number
  public ratingDown: number
  public eventos: number
  public comentario: string
  public comentarios: any[] = []

  constructor(
    private _usuario: UsuarioService,
    private _ruta: ActivatedRoute,
  ) {
    this.usuario = new UsuarioModel('', '', '', '')
    this.co = JSON.parse(localStorage.getItem('needlog'))
    this._ruta.params.subscribe(params => {
      this.uid = params['id']
    })
   }

  ngOnInit() {
    this.getUserPerfil()
    this.getRating()
    this.getEventosCompletados()
    this.getUserCoRate()
    this.getComentarios()
  }

  async getUserPerfil() {
    this.usuario = await this._usuario.getUserPerfil(this.uid) as UsuarioModel
  }

  getRating() {
    this._usuario.getUserRating(this.uid).then(res => {
      this.ratingUp = res.positivo
      this.ratingDown = res.negativo
    })
  }

  async getEventosCompletados() {
    this.eventos = await this._usuario.getEventosCompletados(this.uid)
  }

  async getUserCoRate() {
    this.coUserRate = await this._usuario.getUserRateOfCo(this.co.uid, this.uid)
  }

  rateUsuario(rate) {
    this._usuario.rateUser(this.uid, this.co.uid, rate)
  }

  onComentar() {
    this._usuario.comentarUser(this.uid, this.co.uid, this.comentario)
    this.comentario = ''
    this.getComentarios()
  }

  async getComentarios() {
    this.comentarios = await this._usuario.getComentarios(this.uid)
  }

}
