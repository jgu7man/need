import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ItemExpLaboral } from 'src/app/models/colaboradores/item.expLaboral.model';
declare var $:any;

@Component({
  selector: 'app-co-exp-lugares',
  templateUrl: './co-exp-lugares.component.html',
  styleUrls: ['./co-exp-lugares.component.css']
})
export class CoExpLugaresComponent implements OnInit {

  public itemExp: ItemExpLaboral
  public objExp: {}
  @Output() sendLugarAgregar = new EventEmitter()
  constructor() {
    this.itemExp = new ItemExpLaboral(new Date, new Date, '','','','','')
   }

  ngOnInit() {
    this.initPickers()
  }

  addLugar() {
    this.getDesdeDate()
    this.getHastaDate()
    this.objExp = {
      desde: this.itemExp.desde,
      hasta: this.itemExp.hasta,
      lugar: this.itemExp.lugar,
      descripcion: this.itemExp.descripcion,
      puesto: this.itemExp.puesto,
      numReferencia: this.itemExp.numReferencia,
      nameReferencia: this.itemExp.nameReferencia
    }
    this.sendLugarAgregar.emit(this.objExp)
    this.itemExp = new ItemExpLaboral(new Date, new Date, '','','','','')
  }

  getDesdeDate() {
    var date = $('#desde').val()
    var splitDate = date.split(' ')
    var year = splitDate[0]
    var month = splitDate[1] -1
    var day = splitDate[2]
    
    this.itemExp.desde = new Date(+year, +month, +day)
  } 

  getHastaDate() {
    var date = $('#hasta').val()

    var splitDate = date.split(' ')
    var year = splitDate[0]
    var month = splitDate[1] -1
    var day = splitDate[2]
    
    this.itemExp.hasta = new Date(+year, +month, +day)
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

  }

}
