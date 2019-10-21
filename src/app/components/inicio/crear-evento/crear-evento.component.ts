import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatosModel } from '../../../models/evento/datosevento.model';
import { PersonalModel } from '../../../models/evento/personal.model';
import { EventoModel } from '../../../models/evento/evento.model';
import { EventoService } from '../../../services/evento.service';

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


  constructor(
    private _Route: ActivatedRoute,
    private _Router: Router,
    private _Evento: EventoService,
    ) {
    this.datos = new DatosModel(new Date,new Date,'', '', '', '', '');
    this.personal = new PersonalModel( '', '', '', {});
    this.evento = new EventoModel('', '', '', '', '', '', '',new Date);
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
    
    var time = $('#iniciaTime').val()
    var hour = time.split(':')[0]
    var min = time.split(':')[1]
    this.datos.inicia = new Date(+year, +month, +day, +hour, +min)
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
    
    this.getIniciaDate()
    this.getTerminaDate()

    this.evento.fecha = this.datos.inicia
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
    $('.datepicker').pickadate({
      selectMonths: false, // Creates a dropdown to control month
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
      closeOnSelect: true, // Close upon selecting a date,
      container: '.contenido', // ex. 'body' will append picker to body
      onSelect: () => {
        
      }
    });

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
      format: 'yyyy mm dd'
    })

    $('.datepicker').on('mousedown',function(event){
      event.preventDefault();
    })

    $('.timepicker').pickatime({
      sdefault: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Clear', // text for clear-button
    canceltext: 'Cancel', // Text for cancel-button,
    container: '.contenido', // ex. 'body' will append picker to body
    autoclose: true, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
      aftershow: function () {
        console.log('hola');
       }, //Function for after opening timepicker
    });

    
    $('.timepicker').on('mousedown',function(event){
      event.preventDefault();
    })
  }

}


