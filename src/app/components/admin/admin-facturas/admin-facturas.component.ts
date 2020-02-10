import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../../services/finanzas/facturas.service';
import { TransaccionModel } from '../../../models/finanzas/transaccion.model';

@Component({
  selector: 'app-admin-facturas',
  templateUrl: './admin-facturas.component.html',
  styleUrls: ['./admin-facturas.component.css']
})
export class AdminFacturasComponent implements OnInit {

  public month 
  public filtro
  public facturas: any[]
  public facturaSelected
  public facturaDoc
  constructor(
    private _facturas: FacturaService
  ) {
    var month = new Date().getMonth()
    var year = new Date().getFullYear()
    this.month = new Date(year, month+1, 0, 23, 59)

    this.filtro = 'todas'
   }

  ngOnInit() {
    console.log(this.month)
    this._facturas.getFacturasByMes(this.month, this.filtro).then(res => {
      this.facturas = res
    })
    this.initDatePicker()
  }

  async getFacturas() {
    await this.setDate()
    this.facturas = []
    this._facturas.getFacturasByMes(this.month, this.filtro).then(res => {
      this.facturas = res
    })
  }

  async setDate() {
    // Toma la fecha elegida
    var fecha = $('#monthSelected').val();
    var splitDate = fecha.toString().split(' ')
    var year = +splitDate[0],
      month = await this.setMonth(splitDate[1])
    return this.month = new Date(year, month, 0, 23, 59)
  }

  async selectFactura(idFactura) {
    const waitFor = (ms) => new Promise(r => setTimeout(r, ms))
    this.facturaDoc = true
    this.facturaSelected = idFactura
    await waitFor(200)
    $('.doc_view').addClass('openData')
  }

  async cerrarFactura(e) {
    const waitFor = (ms) => new Promise(r => setTimeout(r, ms))
    $('.doc_view').remove('openData')
    await waitFor(200)
    this.facturaSelected = false

  }

  initDatePicker() {

    $('.datepicker').on('mousedown',function(event){
      event.preventDefault();
    })

    $('.datepicker').pickadate({
      selectMonths: true,
      format: 'yyyy mmmm',
      selectYears: 15,
      buttonImageOnly: false,
      disable: [true],
      closeOnSelect: false,
      monthsFull:["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
      today: 'Este mes',
      cancel: 'Cancelar',
      onOpen: function() {
        $(".picker__nav--prev, .picker__nav--next, .picker__table, .picker__weekday-display").remove();
        $(".picker__select--month.browser-default").css('display', 'inline')
        $("")
      },
      onSet:
      function (arg) {
        var selectedMonth = parseInt(arg.highlight[1]);
        var selectedYear = arg.highlight[0];
        var selectedDate = arg.highlight[2];
        this.close();
        return this.set('select', [selectedYear, selectedMonth, selectedDate, { format: 'yyyy/mm/dd' }]);
      }
    })
  }

  

  async setMonth(mes) {

    switch (mes) {
      case 'Enero':
        return 1
        break;
      case 'Febrero':
        return 2
        break;
      case 'Marzo':
        return 3
        break;
      case 'Abril':
        return 4
        break;
      case 'Mayo':
        return 5
        break;
      case 'Junio':
        return 6
        break;
      case 'Julio':
        return 7
        break;
      case 'Agosto':
        return 8
        break;
      case 'Septiembre':
        return 9
        break;
      case 'Octubre':
        return 10
        break;
      case 'Noviembre':
        return 11
        break;
      case 'Diciembre':
        return 12
        break;
    }
  }

  

}
