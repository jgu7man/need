import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FacturaModel } from '../../../models/finanzas/factura.model';
import { FacturaService } from '../../../services/finanzas/facturas.service';

@Component({
  selector: 'app-datos-facturacion',
  templateUrl: './datos-facturacion.component.html',
  styleUrls: ['./datos-facturacion.component.css']
})
export class DatosFacturacionComponent implements OnInit {

  @Input() uid: string
  @Input() factura: FacturaModel
  @Output() datos_factura: EventEmitter<any> = new EventEmitter()
  constructor(
    private _factura: FacturaService
  ) {}

  ngOnInit() {
    this.datos_factura.emit(this.factura)
    console.log(this.uid)
    this.getData()
  }

  async getData() {
    console.log(this.uid)
    var facturaData = await this._factura.getFacturaUserData(this.uid)
      if (facturaData) {
        this.factura.RFC = facturaData.RFC
        this.factura.razon = facturaData.razon
        this.factura.email = facturaData.email
        this.factura.telefono = facturaData.telefono
      }
  }

}
