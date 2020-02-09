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
  constructor(
    private _facturas: FacturaService
  ) {
    var month = new Date().getMonth()
    var year = new Date().getFullYear()
    this.month = new Date(year, month)
    console.log(this.month)
    this.filtro = 'todas'
   }

  ngOnInit() {
    this._facturas.getFacturasByMes(this.month, this.filtro).then(res => {
      this.facturas = res
    })

  }

}
