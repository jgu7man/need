import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ColaboradorModel } from 'src/app/models/colaboradores/colaborador.model';
import { RegistrarService } from 'src/app/services/colaboradores/registrar.service';
import { AuthService } from 'src/app/services/usuarios/auth.service';
import { CoauthService } from 'src/app/services/colaboradores/coauth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ColaboradorService } from '../../../../services/colaboradores/colaborador.service';

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
    private _colaborador: ColaboradorService
  ) {
    this.colab = new ColaboradorModel('','','','','','', 'solicitud')
   }

  async ngOnInit() {
    
    $('app-loading').toggle()
    this.auth.user$.pipe().subscribe( async user => {
      if ( user ) {
        const coRef = this.fs.collection( 'colaboradores' ).ref.doc( user.uid )
        var perfilData = await coRef.get()
        if ( perfilData.exists ) {
          this.colab = perfilData.data() as ColaboradorModel;
          this.colab.uid = user.uid
          this.colab.email = user.email
          this.loged = true
          $( 'app-loading' ).fadeOut()
        }
      } else {
        $( 'app-loading' ).fadeOut()
      }
    } )
  }

  getEmail() {
    this.coAuth.googleSingUp().then(user => {
      this.colab.uid = user.uid
      this.colab.email = user.email
      this.loged = true
      $('app-loading').fadeOut()
    })
  }

  async onSubmit() {
    
    this._reg.onRegistrar(this.colab)
  }

}
