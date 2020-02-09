import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PlanesService } from '../../../services/directorio/planes.service';
import { NegocioService } from '../../../services/directorio/negocio.service';
import { PlanModel } from '../../../models/directorio/plan.model';
import { TransaccionModel } from '../../../models/finanzas/transaccion.model';
import { AlertaService } from '../../../services/alerta.service';
import { PagoModel } from '../../../models/evento/pago.model';
import { TransferenciasService } from '../../../pagos/services/transferencias.service';
import { FacturaService } from '../../../services/finanzas/facturas.service';
import { FacturaModel } from '../../../models/finanzas/factura.model';
import { AuthService } from '../../../services/usuarios/auth.service';
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
    this.transaccion.factura.mesFacturado = new Date(year, month, 30)
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

  

  sendSolicitud() {
    var user = JSON.parse(localStorage.getItem('needlog'))
    this._negocios.setSolicitud(user.uid, user.email).then(res => {
      this.router.navigate(['/usuario'])
    })
  }

}
