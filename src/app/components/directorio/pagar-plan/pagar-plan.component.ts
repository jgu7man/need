import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PlanesService } from '../../../services/directorio/planes.service';
import { NegocioService } from '../../../services/directorio/negocio.service';
import { PlanModel } from '../../../models/direcorio/plan.model';
import { FacturaModel } from '../../../models/factura.model';
import { AlertaService } from '../../../services/alerta.service';
import { PagoModel } from '../../../models/evento/pago.model';
import { PagoService } from '../../../services/pagos.service';
declare var $: any;

@Component({
  selector: 'app-pagar-plan',
  templateUrl: './pagar-plan.component.html',
  styleUrls: ['./pagar-plan.component.css']
})
export class PagarPlanComponent implements OnInit {

  public plan:PlanModel
  public planName: string;
  public costo: number
  public amount: number
  public factura: FacturaModel
  public pagoTarjeta
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
    private _pagos: PagoService
  ) {
    this.factura = new FacturaModel(new Date, 'evento', '', '', '', '', 0, 0, 0, 0, false)
    this.pago = new PagoModel(new Date, 0,'','','')
   }

  async ngOnInit() {
    $('#pagarPlan').scrollTop(0)
    this._url.params.subscribe( (params: Params) => {
      this.planName = params.plan;
    })
    this.plan = await this._planes.getPlan(this.planName);
    
  }

  // OPCIONES

  needFactura(e) {
    if (!this.factura.requerida) {
      this._alerta.sendUserAlert('Al activar esta opción ACEPTAS que los costos de IVA correran por tu cuenta, aumentando el valor del servicio')
    }
    this.factura.requerida = e.target.checked
  }

  onTipoPago(tipo) {
    this.pagoTarjeta = tipo
    this.validarDatos()
  }





  // CÁLCULOS

  get sumPagos(): number {
    if (this.pagos != undefined) {
      var cantidades = [];
       this.pagos.forEach(pago => {
        cantidades.push(pago.cantidad)
      })
      var pagado = cantidades.reduce((a, b) => a + b, 0)
      console.log(pagado)
      return pagado
    } else {
      return 0
    }
    
  }

  
  

  get SUBTOTAL(): number {
    return this.plan.pago_inicial
  }

  get IVA(): number {
    return this.factura.requerida ? 
    this.SUBTOTAL * .16 : 0
  }

  get retencion(): number {
    return this.factura.requerida ? 
    this.SUBTOTAL * .06 : 0
  }

  get TOTAL(): number {
    return this.plan.pago_inicial + this.IVA
  }

  // ACCIONES

  validarDatos() {
    if (this.factura.requerida && this.factura.RFC == '') {
      this._alerta.sendAlertaCont('Si deseas factura, debes agregar un RFC y una Razón social válida')
    } else {
      this.onSaveFacturacion()
    }
  }

  onSaveFacturacion() {
    this.factura.subtotal = this.amount
    this.factura.iva = this.IVA
    this.factura.total = this.TOTAL
    this.factura.concepto = 'suscripcion'
  }

  ticket: any
  uploadTicket(file: any) {
    this.ticket = file.target.files[0]
  }

  onPagar(tipo_pago) {
    this.pago.cantidad = this.SUBTOTAL
    this.pago.tipo = tipo_pago
    if (this.ticket) {
      tipo_pago == 'transferencia' ?
      this._pagos.suscripcionTransferencia(this.factura, this.ticket) :
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
