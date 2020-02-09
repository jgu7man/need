import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calculos-facturacion',
  templateUrl: './calculos-facturacion.component.html',
  styleUrls: ['./calculos-facturacion.component.css']
})
export class CalculosFacturacionComponent implements OnInit {

  @Input() producto
  @Input() precio
  @Input() amount
  @Input() facturar
  @Input() sumarIVA: boolean = false
  @Output() sendCalculos: EventEmitter<any> = new EventEmitter()
  public datos: {}
  public SUBTOTAL
  public IVA
  public TOTAL
  constructor() { }

  ngOnInit() {
    this.sendCalculos.emit(this.calculo())
  }

  dataObtained() {
    return (
      this.producto &&
      this.precio &&
      this.amount &&
      this.facturar ?
        true : false
    )
  }

  calculo() {


    if (this.sumarIVA) {

      this.SUBTOTAL = this.amount

      this.facturar ?
        this.TOTAL = this.SUBTOTAL * 1.16 : 
        this.TOTAL = this.amount
      
      this.IVA = this.TOTAL - this.SUBTOTAL
      
    } else {
      this.TOTAL = this.amount
      this.SUBTOTAL = this.TOTAL / 1.16 
      this.IVA = this.TOTAL - this.SUBTOTAL
    }

    return {
      subtotal: this.SUBTOTAL.toFixed(2),
      iva: this.IVA.toFixed(2),
      total: this.TOTAL.toFixed(2)
    }
  }


  
}
