import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/usuarios/auth.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioModel } from "../../../models/usuario.model";

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  public usuario: UsuarioModel;
  public idEvento: any;
  public plan: any;
  public link: string

  constructor(
    public authService: AuthService,
    private _Route: ActivatedRoute,
    private _Router: Router,
  ) { 
   }

  ngOnInit() {
     this.authService.user$.pipe().subscribe( user => {
      if (user) { this._Router.navigate(['/usuario']) } 
    })
  }

  defineRoute() {
    this._Route.params.subscribe(params => {
      
       if (params['idEvento']) {
         this.idEvento = params['idEvento'];
         this.link = 'crear-evento/'+this.idEvento
        }else if(params['plan']){
         this.plan = params['plan']
         this.link = 'pagarPlan/'+this.plan
       } else {
         this.link = 'usuario'
       }
       
     })
  }

  google() {
    $("app-loading").fadeIn()
    this.authService.googleSingIn(this.link)
  }

  facebook() {
    $("app-loading").fadeIn()
    this.authService.facebookSingIn(this.link)
  }

}
