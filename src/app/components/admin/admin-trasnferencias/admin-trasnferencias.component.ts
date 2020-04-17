import { Component, OnInit } from '@angular/core';
import { TransferenciasService } from '../../../pagos/services/transferencias.service';
import { TransferenciaModel } from 'src/app/models/finanzas/transferencia.model';
import { TransaccionModel } from 'src/app/models/finanzas/transaccion.model';

@Component({
  selector: 'app-admin-trasnferencias',
  templateUrl: './admin-trasnferencias.component.html',
  styleUrls: ['./admin-trasnferencias.component.css']
})
export class AdminTrasnferenciasComponent implements OnInit {

  constructor(
    private _pagos: TransferenciasService
  ) { }

  public transferencias: TransaccionModel[]

  async ngOnInit() {
    this.transferencias = await this._pagos.getTrasnferencias()
  }

}
