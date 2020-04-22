import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/usuarios/auth.service";
import { ColaboradorService } from 'src/app/services/colaboradores/colaborador.service';
import { Router } from '@angular/router';
import { CoauthService } from '../../../services/colaboradores/coauth.service';
declare var $;

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public menu: boolean = false;
  public colabMenu: boolean = false
  public colab_userIcon: boolean = false
  
  constructor(
    public auth: AuthService,
    public coAuth: CoauthService,
    public _co: ColaboradorService,
    public router: Router
  ) { }

  ngOnInit() {
    // var user = JSON.parse(localStorage.getItem('needlog'))
    var url = window.location.href

    this._co.changeMenu.subscribe(menu => { this.changeUserCo(menu) })

    if (url.includes('colaborador')) {
      this.colabMenu = true
      // this.router.navigate(['/colaborador'])
    } else {
      this.colabMenu = false
      // this.router.navigate(['/usuario/perfil'])
    }
    // if (user) {
    // }
    console.log(this.colabMenu)
  }

  changeUserCo(menu) {
      if (menu.perfil == 'colaborador') {
        this.colabMenu = true
      } else {
        this.colabMenu = false
      }
  }

  menuResponsive() {
    window.innerWidth;
  }

  

  togglePanel () {
    let open = $( '#menu' ).hasClass( 'opened' ),
      close = $( '#menu' ).hasClass( 'closed' )
    open ? $( "#menu" ).removeClass( 'opened' ) : $( "#menu" ).addClass( 'opened' )
    close ? $( "#menu" ).removeClass( 'closed' ) : $( "#menu" ).addClass( 'closed' )
    if ( open && close ) { $( "#menu" ).addClass( 'opened' ); $( "#menu" ).removeClass( 'closed' ) }
    if ( !open && !close ) { $( "#menu" ).removeClass( 'opened' ); $( "#menu" ).addClass( 'closed' ) }
  }

  async toggleMenu () {
    var opened = $( 'app-main-menu' ).attr( 'style', 'display: none' )
    if ( !opened ) {
      this.cerrarMenu()
    } else {
      $( "app-main-menu" ).toggle()
      $( "#close" ).toggle()
      this.togglePanel()
    }
  }
  
  async cerrarMenu(e?) {
    const waitFor = ( ms ) => new Promise( r => setTimeout( r, ms ) )
    this.togglePanel()
    $("#close").hide()
    await waitFor(1000)
    $("app-main-menu").hide()
  }

  

  

}
