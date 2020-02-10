import { Component, OnInit } from '@angular/core';
import { TransaccionModel } from '../../../models/finanzas/transaccion.model';
import { TransferenciasService } from '../../services/transferencias.service';
import { AlertaService } from '../../../services/alerta.service';

@Component({
  selector: 'app-pago-transferencia',
  templateUrl: './pago-transferencia.component.html',
  styleUrls: ['./pago-transferencia.component.css']
})
export class PagoTransferenciaComponent implements OnInit {

  transaccion: TransaccionModel
  constructor(
    private _transfer: TransferenciasService,
    private _alerta: AlertaService
  ) { }

  ngOnInit() {
  }

  ticket: any
  uploadTicket(file: any) {
    this.ticket = file.target.files[0]
  }

  onPagar() {

    if (this.ticket) {
      this._transfer.pagoTransferencia(this.transaccion, this.ticket)
    } else {
      this._alerta.sendAlertaCont('Debes agregar una imagen del ticket primero')
    }
  }

}