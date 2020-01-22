import { Component, OnInit } from '@angular/core';
import { PagoService } from '../../../services/pagos.service';
import { TransferenciaModel } from 'src/app/models/transferencia.model';

@Component({
  selector: 'app-admin-trasnferencias',
  templateUrl: './admin-trasnferencias.component.html',
  styleUrls: ['./admin-trasnferencias.component.css']
})
export class AdminTrasnferenciasComponent implements OnInit {

  constructor(
    private _pagos: PagoService
  ) { }

  public transferencias: TransferenciaModel[]

  async ngOnInit() {
    this.transferencias = await this._pagos.getTrasnferencias()
  }

}
