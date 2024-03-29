import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/usuarios/auth.service';
// import { UsuarioService } from 'src/app/services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { swipeUsuarioAnimation } from "../../../../assets/animations/usuario.animation";
import { NavbarService } from '../navbar/navbar.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [ swipeUsuarioAnimation ]
})
export class UsuarioComponent implements OnInit {

  public usuario
  constructor(
    private auth: AuthService,
    private router: Router,
    private _ruta: ActivatedRoute,
    private navbar: NavbarService
  ) { }

  ngOnInit() {
    this.auth.user$.pipe().subscribe( user => {
      if (user) {
        this.usuario = user
      } else {
        this.router.navigate(['/login'])
      }
    })
    this.navbar.setRouteType('usuario')
  }

  getPage(outlet) {
    return outlet.activatedRouteData['nav'];
  }

  
}
