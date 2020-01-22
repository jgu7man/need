import { Injectable, EventEmitter, Output } from "@angular/core";
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertaService {
    
    @Output() getAlerta: EventEmitter<any> = new EventEmitter()
    @Output() alert: EventEmitter<any> = new EventEmitter()
    @Output() response: EventEmitter<any> = new EventEmitter()
    @Output() options: EventEmitter<any> = new EventEmitter()

    alertMsg$ = new Subject<string>()
    alertAsk$ = new Subject<string>()
    responseAlert$ = new Subject<boolean>()

    constructor() { }

    sendAlertaCont(msg: any): Observable<any> {
        console.log('Recibe mensaje')
        this.alertMsg$.next(msg)
        return this.responseAlert$
    }

    sendUserAlert(data: any) {
        this.alert.emit(data)
    }

    alertAsk(ask: string): Observable<any> {
        console.log('Recibe pregunta')
        this.alertAsk$.next(ask)
        return this.responseAlert$
    }

    sendUserOptions(consulta: any, sip, nop) {
        var opciones = {
            pregunta: consulta,
            sip: sip,
            nop: nop
        }
        this.options.emit(opciones)
    }

    getResponse(res) {
        this.response.emit(res)
    }
}