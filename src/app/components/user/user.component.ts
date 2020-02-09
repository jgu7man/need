import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/usuarios/auth.service';
// import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UsuarioComponent implements OnInit {

  public usuario
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.user$.pipe().subscribe( user => {
      if (user) {
        this.usuario = user
      } else {
        this.router.navigate(['/login'])
      }
    })
  }

  
}
