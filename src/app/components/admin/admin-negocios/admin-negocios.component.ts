import { Component, OnInit } from '@angular/core';
import { NegocioModel } from '../../../models/direcorio/negocio.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { MailService } from '../../../services/mail.service'

@Component({
  selector: 'app-admin-negocios',
  templateUrl: './admin-negocios.component.html',
  styleUrls: ['./admin-negocios.component.css']
})
export class AdminNegociosComponent implements OnInit {

  public emailToSearch
  public negocios: NegocioModel[]
  constructor(
    private fs: AngularFirestore,
    private _mails: MailService,
  ) {
    this.negocios = []
   }

  ngOnInit() {
    this.getNegocios()
  }

  async getNegocios() {
    const negRef = this.fs.collection('negocios').ref
    var negociosQuery = await negRef.get()
    negociosQuery.forEach((neg) => {
      var negocio = neg.data() as NegocioModel
      this.negocios.push(negocio)
    })
  }

  sendMail(nombre, email, negId) {
    var body = {
      nombre: nombre,
      email: email,
      asunto: '¡Listo! Tu negocio está activo y listo para usarse',
      mensaje: `Ahora ya puedes usar tu negocio en NEED Business. Ingresa al siguiente link para llenar la información de tu negocio. "https://need.mx/suscripcion/add/${negId}`
    }

    this._mails.notificarActivacionNegocio(body).subscribe(res => {
      console.log(res);
    })
    
  }

  changeEstado() {
    
  }

  onSearch() {
    
  }

}
