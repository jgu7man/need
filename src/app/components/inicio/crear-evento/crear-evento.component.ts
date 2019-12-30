import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatosModel } from '../../../models/evento/datosevento.model';
import { PersonalModel } from '../../../models/evento/personal.model';
import { EventoModel } from '../../../models/evento/evento.model';
import { EventoService } from '../../../services/evento.service';
import { HorarioModel } from 'src/app/models/evento/horario.model';

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
  public Evento: string;
  public idEvento: any;
  public eventoStarts: HorarioModel
  public eventoEnds: HorarioModel
  public dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  public timeOptions = { hour: 'numeric', minute: 'numeric' }
  public queDia: string
  public ends = false

  constructor(
    private _Route: ActivatedRoute,
    private _Router: Router,
    private _Evento: EventoService,
    ) {
    this.datos = new DatosModel(new Date,new Date,'', '', '', '', '');
    this.personal = new PersonalModel( '', '', '', {});
    this.evento = new EventoModel('', '', '', '', '', '', 'pendiente', new Date, '');
    this.eventoStarts = new HorarioModel(new Date, '', '')
    this.eventoEnds = new HorarioModel(new Date, '','')
  }

  ngOnInit() {
    $(".contenido").scrollTop(0);
    this._Route.params.subscribe((params: Params) => {
      this.idEvento = params.idEvento;
      var evento = params.idEvento+'evento';
      var personal = params.idEvento+'personal';
      this.evento = JSON.parse(sessionStorage.getItem(evento));
      this.personal = JSON.parse(sessionStorage.getItem(personal));
    });
    this.initPickers()
    
  }

  getIniciaDate() {
    var date = $('#iniciaDate').val()

    var splitDate = date.split(' ')
    var year = splitDate[0]
    var month = splitDate[1] -1
    var day = splitDate[2]
    this.eventoStarts.date = new Date(year, month, day)
    $("#hora").fadeIn()
  }  

  getIniciaTime() {
    var time = $('#iniciaTime').val(),
      hour = time.split(':')[0],
      min = time.split(':')[1],

      year = this.eventoStarts.date.getFullYear(),
      month = this.eventoStarts.date.getMonth(),
      day = this.eventoStarts.date.getDate()


    this.datos.inicia = new Date(year, month, day, +hour, +min)
    this.eventoStarts.date = new Date(year, month, day, +hour - 2, +min)
    this.eventoEnds.date = new Date(year, month, day, +hour + 5, +min)
    this.datos.termina = new Date(year, month, day, +hour + 5, +min)
    this.stringDates()
  }

  stringDates() {
    this.eventoStarts.fecha = this.eventoStarts.date.toLocaleDateString('es-Es', this.dateOptions)
    this.eventoStarts.hora = this.eventoStarts.date.toLocaleTimeString('es-Es', this.timeOptions)

    this.eventoEnds.fecha = this.eventoEnds.date.toLocaleDateString('es-Es', this.dateOptions)
    this.eventoEnds.hora = this.eventoEnds.date.toLocaleTimeString('es-Es', this.timeOptions)

    if (this.eventoStarts.date.getDate() == this.eventoEnds.date.getDate()) {
      this.queDia = 'del mismo día'
    } else {
      this.queDia = 'del siguiente día'
    }

    this.ends = true
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

  async onSubmit() {
    
    this.getTerminaDate()

    this.evento.fecha = this.datos.inicia
    this.evento.lugar = `${this.datos.lugar}, ${this.datos.ciudad}, ${this.datos.estado}`
    var log = JSON.parse(localStorage.getItem('needlog'))
    this.evento.usuario = log.uid

    var evento = this.idEvento+'evento';
    var personal = this.idEvento+'personal';
    sessionStorage.removeItem(evento)
    sessionStorage.removeItem(personal)

    this.idEvento = await this._Evento.postEvento(this.evento, this.datos, this.personal)
    this._Router.navigate(['evento-creado/'+this.idEvento])
    

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
      clear: 'Limpiar',
      close: 'Ok',
      closeOnSelect: true,
      format: 'yyyy mm dd',
      container: '.pickerPosition',
    })

    $('.datepicker').on('mousedown',function(event){
      event.preventDefault();
    })

    $('.timepicker').timepicker({
      sdefault: 'now', // Set default time: 'now', '1:30AM', '16:30'
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

}


