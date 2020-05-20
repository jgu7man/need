import { Component, OnInit } from '@angular/core';
import { ColaboradorModel } from 'src/app/models/colaboradores/colaborador.model';
import { ColaboradorService } from 'src/app/services/colaboradores/colaborador.service';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/usuarios/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CoauthService } from 'src/app/services/colaboradores/coauth.service';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-co-login',
  templateUrl: './co-login.component.html',
  styleUrls: ['./co-login.component.css']
})
export class CoLoginComponent implements OnInit {

  public colab: ColaboradorModel
  public estado: string
  constructor(
    public _coauth: CoauthService,
    public location: Location,
    public auth: CoauthService,
    private router: Router,
    private url: ActivatedRoute,
    private matDialog: MatDialog
  ) {
    this.colab = new ColaboradorModel( '', '', '', '', '', '', 'activo' )
    this.estado = this.url.snapshot.params.estado
   }

  ngOnInit() {
    switch (this.estado) {
      case 'solicitud':
        return this.matDialog.open(SolicitudDialog)
      case 'inactivo':
        return this.matDialog.open( InactivoDialog )
      default:

        this.auth.colab$.pipe().subscribe(colab => {
          console.log(colab)
          if ( colab ) {
            this.router.navigate(['/colaborador/perfil'])
          }
        } )
        
        break;
    }
    
  }

  onSubmit() {
  }

}

//  STUB Component for dialogbox
 @Component({
   templateUrl: 'solicitud.dialog.html'
 })
 export class SolicitudDialog {
 
   constructor( public MatDialog: MatDialogRef<SolicitudDialog> ) { }
 
}
 

@Component( {
  templateUrl: 'inactivo.dialog.html'
} )
export class InactivoDialog {

  constructor ( public MatDialog: MatDialogRef<InactivoDialog> ) { }


}
