import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from "src/app/services/usuarios/auth.service";
import { Router, ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { ColaboradorService } from 'src/app/services/colaboradores/colaborador.service';
import { Location } from '@angular/common';

declare var $: any

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  public uneteLink: boolean = true;
  public provLink: boolean = true;
  public conocenosLink: boolean = true;
  public preciosLink: boolean = true;
  public cerrarLink: boolean = true;
  public perfilMenu 
  public isAdmin: boolean = false
  @Output() cerrarMenu = new EventEmitter();
  
  constructor(
    private _ruta: ActivatedRoute,
    public authService: AuthService,
    public _colab: ColaboradorService,
    private location: Location
  ) {
    var user = JSON.parse(localStorage.getItem('needlog'))
    if (user || user != undefined ) { user.admin ? this.isAdmin = true : this.isAdmin = false }
   }

  ngOnInit() {
    var url = window.location.href
    var user = JSON.parse(localStorage.getItem('needlog'))
    if (user) {
      // 'si hay log'
      if (url.includes('colaborador')) {
        // 'si está en colaborador'
        if (user.colaborador) {
          // 'si tiene permiso de ver colaborador'
          this.switchMenu('colaborador')
        } else {
          // 'no tiene permiso de ver colaborador'
          this.perfilMenu = this._colab.coMenu
        }
      } else {
        // 'no está en colaborador'
        this.perfilMenu = this._colab.coMenu
      }
    }

  }

  switchMenu(perfil) {
    this._colab.switchMenu(perfil).then(menu => {
      this.perfilMenu = menu
    })
  }

  // cerrarSesion(){
  //   localStorage.removeItem("login");
  //   window.location.href = '/'
  // }

  toggleMenu(){
    $("#menu").toggleClass('opened')
    $("#close").toggle();
    this.cerrarMenu.emit(false)
  }
}
