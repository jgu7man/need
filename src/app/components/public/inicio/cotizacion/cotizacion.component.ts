import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatosModel } from 'src/app/models/evento/datosevento.model';
import { PersonalModel } from 'src/app/models/evento/personal.model';
import { PreciosPersonalModel } from "src/app/models/finanzas/precios.personal.model";
import { PreciosPersonal } from 'src/app/models/finanzas/precios.personal';
import { EventoModel } from 'src/app/models/evento/evento.model';
import { ExtrasModel } from 'src/app/models/evento/extras.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertaService } from 'src/app/services/alerta.service';
import { CostosModel } from 'src/app/models/evento/costos.model';
import { EventoService } from 'src/app/services/eventos/evento.service';
declare var $

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {

  public personal: PersonalModel;
  public evento: EventoModel;
  public extras: ExtrasModel;
  public costos: CostosModel
  public extrasArray: any;
  public usuario: UsuarioModel;
  public precios;
  public idEvento: any;
  public idTemp: number;
  public puestos
  public error: boolean
  public dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  public timeOptions = { hour: 'numeric', minute: 'numeric' }
  

  constructor(
    private _Route: ActivatedRoute,
    private _Router: Router,
    private fs: AngularFirestore,
    private _eventos: EventoService,
    private _alerta: AlertaService
  ) {
    this.personal = new PersonalModel( 0, 0);
    this.evento = new EventoModel('', '','', 0, 0, false, 'normal', 'pendiente', 'espera', 'espera', new Date, '', '', 0);
    this.extras = new ExtrasModel(0, 0, 0, 0, 0, 0);
    this.costos = new CostosModel(0, 0, 0,0,0, false, [])  
    this.usuario = new UsuarioModel('', '', '', '');
    this.precios = {}
   }

  ngOnInit() {
    this.getpuestos()
    this._Route.params.subscribe((params: Params) => {
      this.idEvento = params.idEvento
      this.idTemp = params.idEvento
      sessionStorage.setItem(this.idTemp+'costos', JSON.stringify(this.costos));
      this.preSave(this.idTemp)
    });
    this.restoreEvent()
  }

  async preSave(idTemp) {
    var log = JSON.parse(localStorage.getItem('needlog'));
    this.evento = JSON.parse(sessionStorage.getItem(idTemp + 'evento'))
    this.extrasArray = JSON.parse(sessionStorage.getItem(idTemp+'extras'))
    this.personal = JSON.parse(sessionStorage.getItem(idTemp + 'personal'))
    
    if (log) {
      this.usuario = log
      let evento = await this._eventos.getTodayPrevento(log.uid)
      if (evento != null) {
        this.idEvento = evento.id
        let dia = evento.fecha.toLocaleDateString('es-Es', this.dateOptions)
        this._alerta.sendUserOptions(`Tienes un evento que dejaste pendiente el día ${dia} ¿Quieres recuperarlo o contunuar con este?`, 'Restaurar', 'No restaurar')
        
      } else {
        await this.defineTotal()
        console.log('guarda evento')
        this._eventos.savePreEvento(log.uid, this.idTemp)
      }
    }
    
  }

  async restoreEvent() {
    this._alerta.response.subscribe(async data => {
      if (data) {
        let evento = await this._eventos.getOneEvento(this.idEvento)
        this.evento = evento
        let personal = await this._eventos.getPersonal(this.idEvento)
        this.personal = personal.personal
        this.extrasArray = personal.extras
        this.costos = await (await this._eventos.getCostos(this.idEvento)).costos
        this.getpuestos()
      } else {
        await this._eventos.deleteEvento(this.idEvento)
        await this.defineTotal()
        this._eventos.savePreEvento(this.usuario.uid, this.idTemp)
      }
    })
  }

  needFactura(e) {
    if (!this.costos.factura) {
      this._alerta.sendUserAlert('Al activar esta opción ACEPTAS que los costos de IVA correran por tu cuenta, aumentando el valor del servicio')
    }
    this.costos.factura = e.target.checked
  }

  

  get subtotal(): number {
    return (this.precios.mesero * this.personal.meseros) +
    (this.precios.capitanMesero * this.personal.capitanMeseros) +
    (this.precios.barman * this.extras.barman) +
    (this.precios.escamoche * this.extras.escamoche) +
    (this.precios.valet * this.extras.valet) +
    (this.precios.hostess * this.extras.hostess) +
    (this.precios.vigilante * this.extras.vigilante) 
  }

  get iva(): number {
    return this.subtotal * .16
  }

  get retenciones(): number {
    return this.subtotal * .06
  }

  get total(): number {
    return this.subtotal + (this.iva - this.retenciones)
  }

  validarCapitanes() {
    if ((
      this.evento.tipoEvento == 'Boda' ||
      this.evento.tipoEvento == 'Graduacion' ||
      this.evento.tipoEvento == 'XV años') && 
      this.personal.capitanMeseros == 0
    ) { return true }
    else { return false }
  }

  async defineTotal() {
    return !this.total ?
      this.costos.costo_servicio = this.subtotal :
      this.costos.costo_servicio = this.total
  }

  async getpuestos() {
    var res = await this.fs.collection('personal').ref.get()
    this.puestos = []
    await res.forEach(puesto => {
      if (puesto.id != 'mesero') {
        this.puestos.push({id: puesto.id, nombre: puesto.data().nombre})
      }
      Object.defineProperty(this.precios, puesto.id, {
        value: puesto.data().precio, enumerable: true, configurable: true, writable: true
      })
    })
    this.getExtras()
  }

  public puestoExtra
  addPuesto() {
    this.extrasArray.push(this.puestoExtra)
    Object.defineProperty(this.extras, this.puestoExtra, {
        value: 1, enumerable: true, configurable: true, writable: true
      })
  }

  delPuesto(puesto) {
    this.extrasArray = this.extrasArray.filter(item => item !== puesto)
    delete this.extras[puesto]
  }
    
  getExtras() {
    this.extrasArray.forEach(extra => {
      Object.defineProperty(this.extras, extra, 
      {value:1,enumerable: true,configurable: true,writable: true});
    })
  }

  async fillExtras() {
    this.extrasArray.forEach(extra => {
      this.personal[extra]
      Object.defineProperty(this.personal, extra, 
        {value:this.extras[extra],
        enumerable: true,configurable: true,writable: true});
    })
    return
  }
  
  async validar() {
    await this.fillExtras()
    var error

     if ((
      this.evento.tipoEvento == 'Boda' ||
      this.evento.tipoEvento == 'Graduacion' ||
      this.evento.tipoEvento == 'XV años') && 
      this.personal.capitanMeseros == 0
    ) { delete this.personal.capitanMeseros }
    else if (this.personal.meseros > 0 && this.personal.capitanMeseros > 0) {

      var values = Object.values(this.personal)
      values.indexOf(0) == -1 ?
        error = false :
        error = true
      
    } else {
      error == true
    }
    return error
  }

  async contratar() {
    this.error = await this.validar()
    if (!this.error) {
      
      await this.getExtras();
      await this.defineTotal()
      console.log(this.costos)
    
      sessionStorage.setItem(this.idTemp+'evento', JSON.stringify(this.evento));
      sessionStorage.setItem(this.idTemp+'personal', JSON.stringify(this.personal));
      sessionStorage.setItem(this.idTemp+'extras', JSON.stringify(this.extras));
      sessionStorage.setItem(this.idTemp+'costos', JSON.stringify(this.costos));
      
      var log = JSON.parse(localStorage.getItem('needlog'));
      
      if (!log) {
        this._Router.navigate(['login/'+this.idTemp]);
      } else {
        this._Router.navigate(['crear-evento/'+this.idTemp]);
      }  
    } 

  }

}
