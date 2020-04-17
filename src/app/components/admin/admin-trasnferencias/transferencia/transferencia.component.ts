import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransferenciasService } from '../../../../pagos/services/transferencias.service';
import { TransferenciaModel } from 'src/app/models/finanzas/transferencia.model';
import { Location } from '@angular/common';
import { EventoModel } from 'src/app/models/evento/evento.model';
import { TransaccionModel } from 'src/app/models/finanzas/transaccion.model';
import { FacturaModel } from 'src/app/models/finanzas/factura.model';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {

  public transferencia: TransaccionModel
  public evento: EventoModel
  public cantidadConfirmada:number
  public factura: FacturaModel

  constructor(
    private _route: ActivatedRoute,
    private _pagos: TransferenciasService,
    public location: Location
  ) {
    this.factura = new FacturaModel('',new Date(), new Date(), '','evento','','','','',0,0,0,0,'publica')
    this.transferencia = new TransaccionModel('','','','evento',this.factura,'',false, 'transferencia')
   }

  

  ngOnInit() {
    this._route.params.subscribe(async ruta => {
      this.transferencia = await this._pagos.getOneTransferencia(ruta.id)
    })
  }




  onAdjudicar() {
    $('#adjudicar_btn').attr('disabled')

    // Revisa que la cantidad del ticket corresponde con la que el cliente marcó
    if (this.transferencia.factura.total == this.cantidadConfirmada) {
      
      // Revisa el tipo de concepto al que refiere la transaccion
      if (this.transferencia.concepto == 'evento') {
        this._pagos.adjudicarTransferEvento(this.transferencia)
      } else {
        // this._pagos.adjudicarTransferenciaSuscripcion(this.transferencia)
      }

    } else {
      
      // Si la cantidad declarada por el cliente y la del ticket no corresponde, 
      // cuadra las cantidades dependiendo si la factura es privada o publica
      if (this.transferencia.factura.tipo_factura == 'privada') {
        this.transferencia.factura.total = +this.cantidadConfirmada.toFixed(2)
        this.transferencia.factura.subtotal = +(this.cantidadConfirmada / 1.16).toFixed(2)
        this.transferencia.factura.iva = +(this.transferencia.factura.total - this.transferencia.factura.subtotal).toFixed(2)
      } else {
        this.transferencia.factura.total = +this.cantidadConfirmada.toFixed(2)
      }



      // Revisa el tipo de concepto al que refiere la transaccion
      if (this.transferencia.concepto == 'evento') {
        this._pagos.adjudicarTransferEvento(this.transferencia)
      } else {
        // this._pagos.adjudicarTransferenciaSuscripcion(this.transferencia)
      }
    }
    
  }

}
