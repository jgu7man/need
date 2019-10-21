import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { UsuarioService } from '../../../services/usuario.service';
declare var $: any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  
  public usuario: any;
  public userNegocios: any;
  public eventos: any;
  public votos: any;

  constructor(
    public authService: AuthService,
    private _usuario: UsuarioService
  ) { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('needlog'));

    this._usuario.getNegocioUser(this.usuario.uid).then(
      res => { this.userNegocios = res; });
    
    this._usuario.getEventosUserNum(this.usuario.uid).then(
      res => { this.eventos = res; })
    
    this.votos = 0;
    
      if (this.usuario) {
        this.userNegocios = false;
      }

  }

}
