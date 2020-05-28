import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatosModel } from 'src/app/models/evento/datosevento.model';
import { PersonalModel } from 'src/app/models/evento/personal.model';
import { EventoModel } from 'src/app/models/evento/evento.model';
import { EventoService } from 'src/app/services/eventos/evento.service';
import { HorarioModel } from 'src/app/models/evento/horario.model';
import { DateModel } from 'src/app/models/evento/date.model';
import { AlertaService } from 'src/app/services/alerta.service';
import { CostosModel } from 'src/app/models/evento/costos.model';
import { AdminDataService } from 'src/app/services/admin/admin.data.service';
import { UsuarioModel } from '../../../../models/usuario.model';
import { AuthService } from '../../../../services/usuarios/auth.service';
import { GetDatosClienteComponent } from './get-datos-cliente/get-datos-cliente.component';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent implements OnInit {

  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: true,
    defaultOpen: false,
    closeOnSelect: true
  }

  public personal: PersonalModel;
  public datos: DatosModel;
  public evento: EventoModel
  public costos: CostosModel

  public usuario: UsuarioModel
  public Evento: string;
  public idEvento: any;
  public eventoStarts: HorarioModel
  public eventoEnds: HorarioModel
  public dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  public timeOptions = { hour: 'numeric', minute: 'numeric' }
  public horasExtras: number
  public queDia: string
  public ends = false
  public editEnds = false
  public duracion
  public inDate: DateModel
  public lat: any;
  public lng: any;

  constructor(
    private _Route: ActivatedRoute,
    private _Router: Router,
    private _Evento: EventoService,
    private _alerta: AlertaService,
    private _adminData: AdminDataService,
    private _auth: AuthService,
    private _dialog: MatDialog
    ) {
    this.datos = new DatosModel(new Date,new Date,'', '', '', '', '', 0, 0);
    this.personal = new PersonalModel( '', '');
    this.evento = new EventoModel('', '', '', 0, 0, false, 'normal', 'pendiente', 'espera', 'espera', new Date, '', '',0);
    this.costos = new CostosModel(0,0,0,0,0,false,[])
    this.inDate = new DateModel(0,0,0,-1,0)
    this.eventoStarts = new HorarioModel(new Date, '', '')
    this.eventoEnds = new HorarioModel(new Date, '', '')
    this.duracion = 5
  }

  ngOnInit() {
    this._Route.params.subscribe((params: Params) => {
      this.idEvento = params.idEvento;
      console.log(params.idEvento)
      this.evento = JSON.parse(sessionStorage.getItem(params.idEvento + 'evento'));
      console.log(this.evento)
      this.personal = JSON.parse( sessionStorage.getItem( params.idEvento + 'personal' ) );
      console.log(this.personal);
      this.costos = JSON.parse( sessionStorage.getItem( params.idEvento + 'costos' ) );
      console.log(this.costos);
    });
    this.initPickers()
    this.currentLocation()
    this._alerta.response.subscribe(res => {
      res ? 
      this.costos.promocion = this._adminData.promocionado :
      this.costos.promocion = 0
    })
  }

  currentLocation() {
    navigator.geolocation.getCurrentPosition(geo => {
      this.lat = geo.coords.latitude;
      this.lng = geo.coords.longitude;
    });
  }

  getDireccion(e) {
      this.lat = e.coords.lat;
      this.lng = e.coords.lng;
  }

  async getIniciaDate() {
    // Definir fecha rango para eventos urgentes
    let today = new Date(),
      thisyear = today.getFullYear(),
      thismonth = today.getMonth(),
      thisday = today.getDate(),
      oneweek = new Date(thisyear, thismonth, thisday + 7)
    
      // Toma la fecha elegida
      var date = $('#iniciaDate').val(),
      splitDate = date.split(' '),
      year = splitDate[0],
      month = splitDate[1] -1,
      day = splitDate[ 2 ]
    this.inDate.year = +year
    this.inDate.month = +month
    this.inDate.day = +day
    this.eventoStarts.date = new Date(year, month, day)
    
    var fechaDiponible = await this._Evento.checkUserDisp(new Date(this.eventoStarts.date))
    if (!fechaDiponible) {
      this._alerta.sendAlertaCont('Ya cuentas con un evento creado para esa fecha, elige otra fecha o edita el que ya tienes creado')
    } else {
      console.log(this.inDate.hour);
      if ( this.inDate.hour > -1 ) this.setDates();
      $("#hora").fadeIn()
      if (this.eventoStarts.date <= oneweek) {
        this._alerta.sendUserOptions('El evento que eliges es muy pronto y no garantizamos que el equipo se junte pronto. Te recomendamos promocionarlo para que tener tu equipo a tiempo. ¿Deseas promocionarlo?', 'Promocionar', 'No promocionar')
      }
    }

  }  

  getIniciaTime() {
    var time = $('#iniciaTime').val(),
      hour = time.split(':')[0],
      min = time.split(':')[1];

    this.inDate.hour = +hour
    this.inDate.min = +min

    this.setDates()
    
  }

  setDates() {
    this.datos.inicia = new Date(
      this.inDate.year,
      this.inDate.month,
      this.inDate.day,
      this.inDate.hour,
      this.inDate.min
    )

    this.eventoStarts.date = new Date(
      this.inDate.year,
      this.inDate.month,
      this.inDate.day,
      this.inDate.hour - 2,
      this.inDate.min
    )

    this.datos.termina = new Date(
      this.inDate.year,
      this.inDate.month,
      this.inDate.day,
      this.inDate.hour + this.duracion,
      this.inDate.min
    )

    this.eventoEnds.date = this.datos.termina
    this.stringDates()
    this.setHorasExtras()
    console.log(this.datos);
  }

  setHorasExtras() {
    return this.duracion > 5 ?
      this.duracion - 5 :
      0
  }

  stringDates() {
    this.eventoStarts.fecha = this.eventoStarts.date
      .toLocaleDateString('es-Es', this.dateOptions)
    this.eventoStarts.hora = this.eventoStarts.date
      .toLocaleTimeString('es-Es', this.timeOptions)

    this.eventoEnds.fecha = this.eventoEnds.date
      .toLocaleDateString('es-Es', this.dateOptions)
    this.eventoEnds.hora = this.eventoEnds.date
      .toLocaleTimeString('es-Es', this.timeOptions)

    if (this.eventoStarts.date.getDate() == this.eventoEnds.date.getDate()) {
      this.queDia = 'del mismo día'
    } else {
      this.queDia = 'del siguiente día'
    }

    this.ends = true
    // this._alerta.sendUserAlert('Los eventos que contratas en NEED constan de 5 horas, más 2 horas previas para el acomodo del evento')
  }

  changeEnds(e) {
    this.editEnds = e.target.checked
  }

  getTerminaDate() {
    var date = $('#terminaDate').val()

    var splitDate = date.split(' ')
    var year = splitDate[0]
    var month = splitDate[1] -1
    var day = splitDate[2]

    var time = $('#terminaTime').val()
    var hour = time.split(':')[0]
    var min = time.split(':')[1]
    this.datos.termina = new Date(+year, +month, +day, +hour, +min)
  } 

  get listo() {
    if (this.lat != 0 || this.lng != 0) {
      return true
    } else {
      return false
    }
  }

  get costo_horas_extras() {
    return this.setHorasExtras() * 100
  }

  get TOTAL() {
    function sum( obj ) {
      var sum = 0;
      for ( var el in obj ) {
        if ( obj.hasOwnProperty( el ) ) {
          sum += parseFloat( obj[ el ] );
        }
      }
      return sum;
    }
    var equipoSize = sum(this.personal)
    return this.costos.costo_servicio + (equipoSize * this.costo_horas_extras)
  }

  async onSubmit() {

    this._auth.user$.pipe().subscribe( user => {
      if ( user ) {
        this.evento.usuario = user.uid
        if ( user.nombre ) {
          this.postEvent()
        } else {
          var dialogRef = this._dialog.open( GetDatosClienteComponent, {
            minWidth:'400px'
          } )
          dialogRef.afterClosed().subscribe( () => {
            this.postEvent()
          })
        }
      }
    })
    
    
  }
  
  async postEvent() {
    this.evento.fecha = this.datos.inicia
    this.evento.lugar = `${this.datos.lugar}, ${this.datos.ciudad}, ${this.datos.estado}`
    this.evento.area = this.datos.estado
    this.evento.estado = 'creado'
    this.evento.costo = this.costos.costo_servicio
    this.datos.lat = this.lat
    this.datos.lng = this.lng
    this.costos.horas_extras = this.setHorasExtras()
    this.costos.resto = this.costos.costo_servicio
    
    await sessionStorage.setItem( this.idEvento + 'datos', JSON.stringify( this.datos ) )
    this.costos.costo_servicio = this.TOTAL
    console.log(this.evento, this.datos, this.personal, this.costos)
    this.idEvento = await this._Evento.postEvento(this.idEvento, this.evento, this.datos, this.personal, this.costos)
      .then(res => {
        this.idEvento = res
        this._Router.navigate(['evento-creado/'+this.idEvento])
      })
    
  }



  initPickers() {

    $('.datepicker').datepicker({
      selectMonths: false,
      i18n: {
        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
        weekdays: ["Domingo","Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        weekdaysShort: ["Dom","Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
        weekdaysAbbrev: ["D", "L", "M", "M", "J", "V", "S"],
            },
      today: 'Hoy',
      // clear: 'Limpiar',
      // close: 'Ok',
      closeOnSelect: true,
      format: 'yyyy mm dd',
      container: '.pickerPosition',
    })

    $('.datepicker').on('mousedown',function(event){
      event.preventDefault();
    })

    $('.timepicker').timepicker({
      sdefault: '9:00PM', // Set default time: 'now', '1:30AM', '16:30'
      fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
      twelveHour: false, // Use AM/PM or 24-hour format
      donetext: 'OK', // text for done-button
      cleartext: 'Limpiar', // text for clear-button
      canceltext: 'Cancelar', // Text for cancel-button,
      container: '.contenido', // ex. 'body' will append picker to body
      autoclose: false, // automatic close timepicker
      aftershow: function () {
        }, //Function for after opening timepicker
      
    });

    
    $('.timepicker').on('mousedown',function(event){
      event.preventDefault();
    })
  }

  public estados = [
			'Aguascalientes',
			'Baja California',
			'Baja California Sur',
			'Campeche',
			'Chiapas',
			'Chihuahua',
			'Coahuila',
			'Colima',
			'Ciudad de México',
			'Durango',
			'Guanajuato',
			'Guerrero',
			'Hidalgo',
			'Jalisco',
			'Mexico',
			'Michoacan',
			'Morelos',
			'Nayarit',
			'Nuevo Leon',
			'Oaxaca',
			'Puebla',
			'Queretaro',
			'Quintana Roo',
			'San Luis Potosi',
			'Sinaloa',
			'Sonora',
			'Tabasco',
			'Tamaulipas',
			'Tlaxcala',
			'Veracruz',
			'Yucatan',
			'Zacatecas',
  ]

}


