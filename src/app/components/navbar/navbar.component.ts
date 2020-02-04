import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { ColaboradorService } from '../../services/colaboradores/colaborador.service';
import { Router } from '@angular/router';
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
    public _co: ColaboradorService,
    public router: Router
  ) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('needlog'))
    var url = window.location.href

    if (user) {
      this._co.changeMenu.subscribe(menu => { this.changeUserCo(menu) })

      if (url.includes('colaborador') && user.colaborador) {
        this.colabMenu = true
        // this.router.navigate(['/colaborador'])
      } else {
        this.colabMenu = false
        // this.router.navigate(['/usuario/perfil'])
      }
    }
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

  async toggleMenu(){
    await $("app-main-menu").toggle()
    await $("#menu").toggleClass('opened').toggleClass('closed')
    await $("#close").toggle()
  }
  
  async cerrarMenu(e) {
    const waitFor = (ms) => new Promise(r => setTimeout(r, ms))
    await $("#menu").toggleClass('opened').toggleClass('closed')
    await $("#close").toggle()
    await waitFor(1000)
    await $("app-main-menu").toggle()
  }

  

  

}
