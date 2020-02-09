import { Component, OnInit } from '@angular/core';
import { NegocioModel } from '../../../models/directorio/negocio.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { MailService } from '../../../services/mail.service'
import { NegocioService } from '../../../services/directorio/negocio.service';
import { AlertaService } from '../../../services/alerta.service';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-admin-negocios',
  templateUrl: './admin-negocios.component.html',
  styleUrls: ['./admin-negocios.component.css']
})
export class AdminNegociosComponent implements OnInit {

  public emailToSearch
  public fechaPago
  public negocios: NegocioModel[]
  public negocio: NegocioModel
  constructor(
    private fs: AngularFirestore,
    private _mails: MailService,
    private _negocios: NegocioService,
    private _alerta: AlertaService,
  ) {
    this.negocios = []
    this.negocio = new NegocioModel('','','','','', new Date, new Date, new Date, '','', 'solicitud')
   }

  ngOnInit() {
    this.getNegocios()
    this.initPickers()
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

  getIniciaDate() {
    var date = $('#fechaPago').val()

    var splitDate = date.split(' ')
    var year = splitDate[0]
    var month = splitDate[1] -1
    var day = splitDate[2]
    console.log(+year, +month, +day);
    this.negocio.fechaPago = new Date(year, month, day)
    $("#hora").fadeIn()
  } 

  changeEstado() {
    
  }

  delNegocio(nid) {
    this.fs.collection('negocios').ref.doc(nid).delete().then(res => {
      this._alerta.sendAlertaCont('Negocio eliminado')
      this.negocios = []
      this.getNegocios()
    })
  }

  async onSearch() {
    var usersCol = this.fs.collection('usuarios').ref
    var userRes = await usersCol.doc(this.emailToSearch).get()
    if (userRes.exists) {
      this._negocios.setSolicitud(userRes.id, this.emailToSearch)
    } else {
      this._alerta.sendAlertaCont('El email que buscas no se encuentra en la base de datos. Debe registrarse primero para agregarle cuenta de negocios en NEED Business')
    }
  }

  initPickers() {

    $('.datepicker').datepicker({
      selectMonths: false,
      i18n: {
        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
        weekdays: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        weekdaysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
        weekdaysAbbrev: ["D", "L", "M", "M", "J", "V", "S"],
      },
      today: 'Hoy',
      clear: 'Limpiar',
      close: 'Ok',
      closeOnSelect: true,
      format: 'yyyy mm dd',
      container: '.pickerPosition',
    })

    $('.datepicker').on('mousedown', function (event) {
      event.preventDefault();
    })
  }

}
