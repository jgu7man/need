import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransaccionModel } from '../../models/finanzas/transaccion.model';
import { SuscripcionService } from '../../services/directorio/suscripcion.service';
import { PagosEventoService } from 'src/app/services/eventos/pagos_evento.service';

@Injectable({
  providedIn: 'root'
})
export class PagoTarjetaService {

  userId: string;
  pagoServiceApi: string

  constructor(
    private fs: AngularFirestore,
    private auth: AngularFireAuth,
    private _http: HttpClient,
    private _suscripcion: SuscripcionService,
    private _pagosEvento: PagosEventoService
  ) {
    this.auth.authState.subscribe((auth) => {
      if (auth) this.userId = auth.uid
    })

    this.pagoServiceApi = 'https://us-central1-need-f6bad.cloudfunctions.net/pagar_con_stripe'
  }

  pagarHttpRoute(source): Observable<any>{
    let body = JSON.stringify(source)
    var headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.post(this.pagoServiceApi, body, {headers: headers})
  }
  


  async setPago(transaccion: TransaccionModel) {
    
    var idToGo, resp;

    if (transaccion.concepto == 'suscripcion') {
      resp = await this._suscripcion.setPagoSuscripcion(transaccion)
      idToGo = '/negocio/' + resp
      
    } else if (transaccion.concepto == 'evento') {
      resp = await this._pagosEvento.setPagoEvento(transaccion)
      idToGo = '/usuario/evento/' + resp
    }

    return idToGo
    
  }


}
