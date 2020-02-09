import { Component, OnInit } from '@angular/core';
import { HelpMessageModel } from '../../../../models/help-message.model';
import { ContactoService } from '../../../../services/usuarios/contacto.service';
import { AuthService } from '../../../../services/usuarios/auth.service';
import { UsuarioModel } from '../../../../models/usuario.model';

@Component({
  selector: 'app-whatsapp-form',
  templateUrl: './whatsapp-form.component.html',
  styleUrls: ['./whatsapp-form.component.css']
})
export class WhatsappFormComponent implements OnInit {

  public contacto: HelpMessageModel
  constructor(
    public _contacto: ContactoService,
    private _auth: AuthService
  ) {
    this.contacto = new HelpMessageModel('','','','','', new Date())
   }

  ngOnInit() {
    this._auth.user$.pipe().subscribe((user: UsuarioModel) => {
      console.log(user)
      if (user) {
        this.contacto.nombre = user.displayName
        this.contacto.email = user.email
      }
    })
  }

}
