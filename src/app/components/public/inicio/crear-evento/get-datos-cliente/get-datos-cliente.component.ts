import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../../../../services/usuarios/auth.service';
import { UsuarioModel } from '../../../../../models/usuario.model';

@Component({
  templateUrl: './get-datos-cliente.component.html',
  styleUrls: ['./get-datos-cliente.component.css']
})
export class GetDatosClienteComponent implements OnInit {

  Cliente: UsuarioModel
  clienteDato = new FormControl('', [Validators.required])

  constructor (
    private _dialog: MatDialogRef<GetDatosClienteComponent>,
    private fs: AngularFirestore,
    private _auth: AuthService
  ) {
    this._auth.user$.pipe().subscribe( user => {
      if ( user ) {
        this.Cliente = new UsuarioModel(user.uid, user.email, user.photoURL, user.displayName, '','','','')
      }
    })
   }

  ngOnInit() {
  }

  getErrorMsg() {
    if ( this.clienteDato.hasError( 'required' ) ) {
      return 'Necesitas llenar este dato'
    }
  }

  onSubmit() {
    this.fs.collection( 'usuarios' ).ref.doc( this.Cliente.uid ).update( {
      nombre: this.Cliente.nombre,
      ap_paterno: this.Cliente.ap_paterno,
      ap_materno: this.Cliente.ap_materno,
      telefono: this.Cliente.telefono,
    }).then(()=>{this._dialog.close()})
  }

}

interface datosCliente {
  nombre: string,
  ap_paterno: string,
  ap_materno: string,
  telefono: string
}
