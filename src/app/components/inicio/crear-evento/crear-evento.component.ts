import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatosModel } from '../../../models/evento/datosevento.model';
import { PersonalModel } from '../../../models/evento/personal.model';
import { EventoModel } from '../../../models/evento/evento.model';
import { EventoService } from '../../../services/evento.service';
import { HorarioModel } from 'src/app/models/evento/horario.model';
import { DateModel } from 'src/app/models/evento/date.model';
import { AlertaService } from '../../../services/alerta.service';
import { CostosModel } from '../../../models/evento/costos.model';
import { AdminDataService } from '../../../services/admin/admin.data.service';

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

  public Evento: string;
  public idEvento: any;
  public eventoStarts: HorarioModel
  public eventoEnds: HorarioModel
  public dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  public timeOptions = { hour: 'numeric', minute: 'numeric' }
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
    private _adminData: AdminDataService
    ) {
    this.datos = new DatosModel(new Date,new Date,'', '', '', '', '', 0, 0);
    this.personal = new PersonalModel( '', '');
    this.evento = new EventoModel('', '', '', 0, 0, false, 'normal', 'pendiente', 'espera', 'espera', new Date, '', '',0);
    this.costos = new CostosModel(0,0,0,0,0,false,[])
    this.inDate = new DateModel(0,0,0,0,0)
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
      this.personal = JSON.parse(sessionStorage.getItem(params.idEvento+'personal'));
      this.costos = JSON.parse(sessionStorage.getItem(params.idEvento+'costos'));
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
      day = splitDate[2]
    this.eventoStarts.date = new Date(year, month, day)
    
    var fechaDuplicada = await this._Evento.checkUserDisp(new Date(this.eventoStarts.date))
    if (fechaDuplicada) {
      this._alerta.sendAlertaCont('Ya cuentas con un evento creado para esa fecha, elige otra fecha o edita el que ya tienes creado')
    } else {
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
    this.inDate.year = this.eventoStarts.date.getFullYear(),
    this.inDate.month = this.eventoStarts.date.getMonth(),
    this.inDate.day = this.eventoStarts.date.getDate()

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

  async onSubmit() {

    // this.getTerminaDate()
    var log = JSON.parse(localStorage.getItem('needlog'))
    this.evento.usuario = log.uid
    this.evento.fecha = this.datos.inicia
    this.evento.lugar = `${this.datos.lugar}, ${this.datos.ciudad}, ${this.datos.estado}`
    this.evento.ciudad = this.datos.estado
    this.evento.estado = 'creado'
    this.evento.costo = this.costos.costo_servicio
    this.datos.lat = this.lat
    this.datos.lng = this.lng
    this.costos.horas_extras = this.setHorasExtras()
    this.costos.resto = this.costos.costo_servicio
    
    await sessionStorage.setItem(this.idEvento + 'datos', JSON.stringify(this.datos))
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


