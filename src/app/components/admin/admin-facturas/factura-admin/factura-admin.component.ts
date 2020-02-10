import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FacturaService } from '../../../../services/finanzas/facturas.service';
import { FacturaModel } from '../../../../models/finanzas/factura.model';

@Component({
  selector: 'app-factura-admin',
  templateUrl: './factura-admin.component.html',
  styleUrls: ['./factura-admin.component.css']
})
export class FacturaAdminComponent implements OnInit {

  @Input() idFactura: string
  @Output() cerrar: EventEmitter<any> = new EventEmitter()
  public factura: FacturaModel
  constructor(private _facturas: FacturaService) { }

  async ngOnInit() {
    this.factura = await this._facturas.getOneFactura(this.idFactura) 
  }

  onClose() {
    this.cerrar.emit(true)
  }

}
