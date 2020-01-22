import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagoService } from '../../../../services/pagos.service';
import { TransferenciaModel } from 'src/app/models/transferencia.model';
import { Location } from '@angular/common';
import { EventoModel } from '../../../../models/evento/evento.model';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {

  public transferencia: TransferenciaModel
  public evento: EventoModel

  constructor(
    private _route: ActivatedRoute,
    private _pagos: PagoService,
    public location: Location
  ) {
    this.transferencia = new TransferenciaModel('', new Date, 'evento', '', '', '', 0, 0, 0, 0, false, '', '','')
   }

  

  ngOnInit() {
    this._route.params.subscribe(async ruta => {
      this.transferencia = await this._pagos.getOneTransferencia(ruta.id)
    })
  }

  onAdjudicar() {
    console.log('Se adjudicó')
    this._pagos.adjudicarTransferencia(this.transferencia)
  }

}
