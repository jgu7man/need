import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
// import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UsuarioComponent implements OnInit {

  public usuario
  constructor(
    private auth: AuthService,
    // private _usuario: UsuarioService
  ) { }

  ngOnInit() {
    this.auth.user$.pipe().subscribe( user => {
      if (user) {
        this.usuario = user
      }
    })
  }

  
}
