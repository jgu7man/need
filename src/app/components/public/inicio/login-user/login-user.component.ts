import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/usuarios/auth.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioModel } from "src/app/models/usuario.model";
import { MatDialog, MatDialogRef, MatCheckboxChange } from '@angular/material';

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
  public acept: boolean = false

  constructor(
    public authService: AuthService,
    private _Route: ActivatedRoute,
    private _Router: Router,
    private dialog: MatDialog
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

  onAcept( e: MatCheckboxChange ) {
    this.acept = e.checked
  }

  google() {
    if (this.acept){
      $("app-loading").fadeIn()
      this.authService.googleSingIn( this.link )
    } else {
      this.dialog.open( AlertLoginComponent)
    }
  }

  facebook() {
    if ( this.acept ) {
      $( "app-loading" ).fadeIn()
      this.authService.facebookSingIn( this.link )
    } else {
      this.dialog.open( AlertLoginComponent )
    }
  }

}



@Component({
  templateUrl: './alert-login.dialog.html',
  styleUrls: ['./login-user.component.css']
})
export class AlertLoginComponent implements OnInit {
  constructor ( public dialog: MatDialogRef<AlertLoginComponent>) { }

  ngOnInit(): void { }
}

