import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ColaboradorModel } from 'src/app/models/colaboradores/colaborador.model';
import { RegistrarService } from 'src/app/services/colaboradores/registrar.service';
import { AuthService } from 'src/app/services/usuarios/auth.service';
import { CoauthService } from 'src/app/services/colaboradores/coauth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ColaboradorService } from '../../../../services/colaboradores/colaborador.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CoTycComponent } from '../../docs/co-tyc/co-tyc.component';

@Component({
  selector: 'app-co-registro',
  templateUrl: './co-registro.component.html',
  styleUrls: ['./co-registro.component.css']
})
export class CoRegistroComponent implements OnInit {

  public colab: ColaboradorModel
  public loged: boolean = false
  constructor(
    public location: Location,
    private _reg: RegistrarService,
    public auth: AuthService,
    public coAuth: CoauthService,
    private fs: AngularFirestore,
    private _colaborador: ColaboradorService,
    private _matDialog: MatDialog
  ) {
    this.colab = new ColaboradorModel('','','','','','', 'solicitud')
   }

  async ngOnInit() {
    
    $('app-loading').toggle()
    this.coAuth.colab$.pipe().subscribe( async colab => {
      if ( colab ) {
        const coRef = this.fs.collection( 'colaboradores' ).ref.doc( colab.uid )
        var perfilData = await coRef.get()
        if ( perfilData.exists ) {
          this.colab = perfilData.data() as ColaboradorModel;
          this.colab.uid = colab.uid
          this.colab.email = colab.email
          this.loged = true
          $( 'app-loading' ).fadeOut()
        }
      } else {
        $( 'app-loading' ).fadeOut()
      }
    } )
  }

  openTyc() {
    const dialogRef = this._matDialog.open( CotycDialogComponent );

    dialogRef.afterClosed().subscribe( result => {
      this.getEmail()
    } );
  }

  getEmail() {
    this.coAuth.googleSingUp().then(colab => {
      this.colab.uid = colab.uid
      this.colab.email = colab.email
      this.loged = true
      $('app-loading').fadeOut()
    })
  }

  async onSubmit() {
    
    this._reg.onRegistrar(this.colab)
  }

}


@Component({
  templateUrl: './co-tyc-dialog.html',
  styleUrls: ['./co-registro.component.css']
})
export class CotycDialogComponent implements OnInit {

  acept:boolean = false
  constructor (
    public dialogRef: MatDialogRef<CotycDialogComponent>
  ) { }

  ngOnInit(): void { }

  acept_tyc() {
    this.acept = true
  }
}




