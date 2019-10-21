import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';

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
  
  @Output() cerrarMenu = new EventEmitter();
  constructor(
    private _ruta: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
    // var isLogged = this.authService.user$.pipe( 
    //   take(1),
    //   map( user => !!user)
    // );
    // console.log(isLogged);
    // var loged = this.authService.userData;
    // console.log(loged);
    // if (loged == null ) {
    //   this.cerrarLink = false
    // } else {
    //   this.uneteLink = false
    // }
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
