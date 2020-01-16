import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  styleUrls: ['./datetimepicker.component.css']
})
export class DatetimepickerComponent implements OnInit {

  public datetime: DateTime
  @Output() dateGeted: EventEmitter<Date> = new EventEmitter()
  @Output() timeGeted: EventEmitter<Date> = new EventEmitter()
  @Output() dateTimeGeted: EventEmitter<Date> = new EventEmitter()
  @Input() dateLabel: string
  @Input() timeLabel: string
  @Input() dateInput: boolean = true
  @Input() timeInput: boolean = true
  @Input() row: boolean = true

  constructor() {
    this.datetime = new DateTime(0, 0, 0, 0, 0)
   }

  ngOnInit() {
    this.initDatePicker()
    this.initTimePicker()
  }

  getDate() {
    // Toma la fecha elegida
    var date = $('#Date').val(),
      splitDate = date.split(' '),
      year = splitDate[0],
      month = splitDate[1] - 1,
      day = splitDate[2];
      
      this.dateGeted.emit(new Date(+year, +month, +day))
      this.datetime.year = +year
      this.datetime.month = +month
      this.datetime.day = +day
  }

  getTime() {

    var today = new Date()
    var time = $('#iniciaTime').val(),
      hour = time.split(':')[0],
      min = time.split(':')[1];
    today.setHours(+hour,+min,0,0)

    this.timeGeted.emit(today)
    this.datetime.hour = +hour
    this.datetime.min = +min
  
  }

  getDateTime() {
    this.dateTimeGeted.emit(new Date(
      this.datetime.year,
      this.datetime.month,
      this.datetime.day,
      this.datetime.hour,
      this.datetime.min,
    ))
  }

  initDatePicker() {
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

    $('.datepicker').on('mousedown',
      function (event) {
      event.preventDefault();
    })
  }

  initTimePicker() {
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

}

export class DateTime {
  constructor(
    public year: number,
    public month: number,
    public day: number,
    public hour: number,
    public min: number,
  ){}
}