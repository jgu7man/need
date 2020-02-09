import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../../services/eventos/evento.service';
import { ActivatedRoute } from '@angular/router';
import { PersonalModel } from '../../../models/evento/personal.model';
import { CostosModel } from '../../../models/evento/costos.model';
import { EventoModel } from '../../../models/evento/evento.model';
import { DatosModel } from '../../../models/evento/datosevento.model';
import { UsuarioService } from '../../../services/usuarios/usuario.service';
import { UsuarioModel } from '../../../models/usuario.model';
import { AdminDataService } from 'src/app/services/admin/admin.data.service';
import { HorarioModel } from '../../../models/evento/horario.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { PagoModel } from '../../../models/evento/pago.model';
import { TransaccionModel } from '../../../models/finanzas/transaccion.model';
import { AlertaService } from '../../../services/alerta.service';
import { TransferenciasService } from "../../../pagos/services/transferencias.service";
import { FacturaService } from '../../../services/finanzas/facturas.service';
import { FacturaModel } from '../../../models/finanzas/factura.model';

@Component({
  selector: 'app-pagar-evento',
  templateUrl: './pagar-evento.component.html',
  styleUrls: ['./pagar-evento.component.css']
})
export class PagarEventoComponent implements OnInit {

  public idEvento
  public evento: EventoModel
  public personal: PersonalModel
  public costos: CostosModel
  public detalles: DatosModel
  public usuario: UsuarioModel
  public transaccion: TransaccionModel
  public factura: FacturaModel
  public pagos: PagoModel[]
  public precios
  public promocionar: boolean
  public amount: number
  public eventoStarts: HorarioModel
  public dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  public timeOptions = { hour: 'numeric', minute: 'numeric' }
  public pagoTarjeta: string
  public pago: PagoModel

  constructor(
    private _eventos: EventoService,
    private _route: ActivatedRoute,
    private _user: UsuarioService,
    private _adminData: AdminDataService,
    private _fs: AngularFirestore,
    private _alerta: AlertaService,
    private _pagos: TransferenciasService,
    private _facturas: FacturaService
  ) {
    this.pagos = []
    this.eventoStarts = new HorarioModel(new Date, '', '')
    this.factura = new FacturaModel('',new Date(), new Date(),'', 'evento','','','','',0,0,0,0,'publica')
    this.transaccion = new TransaccionModel('','','','evento',this.factura,'',false, 'transferencia')
    this.pago = new PagoModel(new Date, 0, '', '', '')
    this.costos = new CostosModel(0,0,0,0,0,false,[])
  }
  
  ngOnInit() {
    this.getData()
    this.getPagos()
    this.CostoTotal
  }





  // LLAMADOS

  async getData() {

    this._route.params.subscribe(ruta => {
      this.idEvento = ruta['id']
      console.log(this.idEvento)
    })

    this.evento = await this._eventos.getOneEvento(this.idEvento)
    this.costos = await (await this._eventos.getCostos(this.idEvento)).costos
    var factura = await this._facturas.getDatosFactura(this.idEvento, 'evento')
    this.transaccion.factura.RFC = factura.RFC
    this.transaccion.factura.razon = factura.razon
    this.transaccion.factura.email = factura.email
    this.transaccion.factura.telefono = factura.telefono
    this.transaccion.idServicio = this.idEvento


    this.costos.promocion > 0 ? 
      this.promocionar = true :
      this.promocionar = false
    this.eventoStarts.date = this.evento.fecha
    this.stringDates()
    
    var usuario = await this._user.getUserPerfil(this.evento.usuario)
    this.usuario = usuario

    this.precios = await this._adminData.getPersonalPreciosObject()
    this.amount = this.minAmount
  }

  async getPagos() {
    const pagosRes = await this._fs.collection('eventos').ref.doc(this.idEvento)
      .collection('pagos').orderBy('fecha', 'desc').get()
    if (pagosRes.size > 0) {
      (await pagosRes).forEach(pagoRes => {
        let pago = pagoRes.data() as PagoModel
        pago.fecha = pagoRes.data().fecha.toDate()
        this.pagos.push(pago)
      })
      console.log(this.pagos)
    } else {
      this.pagos = []
    }
  }

  stringDates() {
    this.eventoStarts.fecha = this.eventoStarts.date
      .toLocaleDateString('es-Es', this.dateOptions)
    this.eventoStarts.hora = this.eventoStarts.date
      .toLocaleTimeString('es-Es', this.timeOptions)
    console.log(this.eventoStarts)
  }




  // OPCIONES

  onTodo() {
    this.amount = this.CostoTotal
  }

  onPromocionar(e) {
    e.target.checked ?
      this.costos.promocion = this._adminData.promocionado :
      this.costos.promocion = 0
  }

  needFactura(e) {
    if (this.transaccion.factura.tipo_factura == 'publica') {
      this._alerta.sendUserAlert('Al activar esta opción ACEPTAS que los costos de IVA correran por tu cuenta, aumentando el valor del servicio')
    }
    e.target.checked ?
      this.transaccion.factura.tipo_factura = 'privada' :
      this.transaccion.factura.tipo_factura = 'publica';
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
      return pagado
    } else {
      return 0
    }
    
  }

  get costoHorasExtras(): number {
    var percent = this.costos.horas_extras * .20
    var costo_extras = this.costos.costo_servicio * percent
    return costo_extras
  }

  
  get CostoTotal(): number {
    return (
      this.costos.costo_servicio
      + this.costoHorasExtras
      - this.sumPagos
      )
    }
  
  get minAmount() {
    return this.CostoTotal * .5
  }
  
  get resto(): number {
    return this.CostoTotal - this.amount
  }

  get SUBTOTAL(): number {
    return this.amount + this.costos.promocion
  }

  get IVA(): number {
    return this.transaccion.factura.tipo_factura == 'privada' ? 
    this.amount * .16 : 0
  }

  get retencion(): number {
    return this.transaccion.factura.tipo_factura == 'privada' ? 
    this.amount * .06 : 0
  }

  get TOTAL(): number {
    return (
        (this.amount + this.costos.promocion
      + (this.costos.horas_extras * .20))
      + this.IVA
      - this.retencion
    )
  }




  // ACCIONES

  validarDatos() {
    if (this.transaccion.factura.tipo_factura == 'privada' && this.transaccion.factura.RFC == '') {
      this._alerta.sendAlertaCont('Si deseas factura, debes agregar un RFC y una Razón social válida')
    } else if (this.amount < this.minAmount) {
      this._alerta.sendAlertaCont('La cantidad mínima a pagar es del 50% del resto del servicio. Aumenta la cantidad a pagar')
    } else {
      this.onSaveFacturacion()
    }
  }

  onSaveFacturacion() {
    this.transaccion.factura.subtotal = this.amount
    this.transaccion.factura.iva = this.IVA
    this.transaccion.factura.total = this.TOTAL
    this.transaccion.concepto = 'evento'
    this.costos.resto = this.resto
    this._facturas.saveDatosFacturacion(this.idEvento, this.transaccion.factura)
  }

  ticket: any
  uploadTicket(file: any) {
    this.ticket = file.target.files[0]
  }

  onPagar(tipo_pago) {
    this.pago.cantidad = this.amount
    this.pago.tipo = tipo_pago
    this.transaccion.idServicio = this.idEvento
    if (this.ticket) {
      tipo_pago == 'transferencia' ?
      this._pagos.pagoTransferencia(this.transaccion, this.ticket) :
      this._pagos
    } else {
      this._alerta.sendAlertaCont('Debes agregar una imagen del ticket primero')
    }
  }

}
