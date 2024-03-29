import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PlanesService } from 'src/app/services/directorio/planes.service';
import { NegocioService } from 'src/app/services/directorio/negocio.service';
import { PlanModel } from 'src/app/models/directorio/plan.model';
import { TransaccionModel } from 'src/app/models/finanzas/transaccion.model';
import { AlertaService } from 'src/app/services/alerta.service';
import { PagoModel } from 'src/app/models/evento/pago.model';
import { TransferenciasService } from 'src/app/pagos/services/transferencias.service';
import { FacturaService } from 'src/app/services/finanzas/facturas.service';
import { FacturaModel } from 'src/app/models/finanzas/factura.model';
import { AuthService } from 'src/app/services/usuarios/auth.service';
declare var $: any;


@Component({
  selector: 'app-pagar-plan',
  templateUrl: './pagar-plan.component.html',
  styleUrls: ['./pagar-plan.component.css']
})
export class PagarPlanPagosComponent implements OnInit {

  public plan:PlanModel
  public planName: string;
  public costo: number
  public amount: number
  public transaccion: TransaccionModel
  public factura: FacturaModel
  public tipoPago
  public pagos: PagoModel[]
  public pago: PagoModel
  public dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  public timeOptions = { hour: 'numeric', minute: 'numeric' }
  
  constructor(
    private _url: ActivatedRoute,
    private router: Router,
    private _planes: PlanesService,
    private _negocios: NegocioService,
    private _alerta: AlertaService,
    private _pagos: TransferenciasService,
    private _factura: FacturaService,
    private _auth: AuthService
  ) {
    this.factura = new FacturaModel('',new Date,new Date,'','suscripcion','', '','','',0,0,0,0,'publica')
    this.transaccion = new TransaccionModel('','','','suscripcion',this.factura, '',false,'en linea')
    this.pago = new PagoModel(new Date, 0,'','','')
   }

  async ngOnInit() {
    this.getData()
  }



  // GET DATA
  async getData() {
    $('#pagarPlan').scrollTop(0)
    this._url.params.subscribe( (params: Params) => {
      this.planName = params.plan;
    })
    
    this.plan = await this._planes.getPlan(this.planName);
    this.factura.descripcion = this.planName
    
    this._auth.user$.pipe().subscribe(async user => {
      this.transaccion.idUsuario = user.uid
      if(user.idNegocio) this.transaccion.idServicio = user.idNegocio
    })

    var month = new Date().getMonth()
    var year = new Date().getFullYear()
    this.transaccion.factura.mesFacturado = new Date(year, month, 0, 23, 59)
  }

  getDatosFactura(factura) {
    this.transaccion.factura = factura
  }

  getCostos(costos) {
    console.log(costos)
    this.transaccion.factura.subtotal = costos.subtotal
    this.transaccion.factura.iva = costos.iva
    this.transaccion.factura.total = costos.total
  }






  // OPCIONES

  onFacturar() {
    return this.transaccion.factura.tipo_factura == 'privada' ? true : false
  }

  needFactura(e) {
    if (this.transaccion.factura.tipo_factura == 'publica') {
      this._alerta.sendUserAlert('Al activar esta opción ACEPTAS que los costos de IVA correran por tu cuenta, aumentando el valor del servicio')
    }

    if (e.target.checked) {
      this.transaccion.factura.tipo_factura = 'privada'
    } else {
      this.transaccion.factura.tipo_factura = 'publica'
    }
  }

  onTipoPago(tipo) {
    this.tipoPago = tipo
    this.validarDatos()
  }





  




  // ACCIONES

  async validarDatos() {
    if (this.factura.tipo_factura == 'privada' && this.transaccion.factura.RFC == '') {
      this._alerta.sendAlertaCont('Si deseas factura, debes agregar un RFC y una Razón social válida')
      
    } else {
      this.onSaveFacturacion()
    }
  }

  onSaveFacturacion() {
    
    this._factura.saveDatosFacturacion(this.transaccion.idUsuario, this.transaccion.factura)
  }

  ticket: any
  uploadTicket(file: any) {
    this.ticket = file.target.files[0]
  }

  onPagar(tipo_pago) {
    this.pago.cantidad = this.transaccion.factura.subtotal
    this.pago.tipo = tipo_pago
    if (this.ticket) {
      tipo_pago == 'transferencia' ?
      this._pagos.pagoTransferencia(this.transaccion, this.ticket) :
      this._pagos
    } else {
      this._alerta.sendAlertaCont('Debes agregar una imagen del ticket primero')
    }
  }

  sendSolicitud() {
    var user = JSON.parse(localStorage.getItem('needlog'))
    this._negocios.setSolicitud(user.uid, user.email).then(res => {
      this.router.navigate(['/usuario'])
    })
  }

}
