import { Injectable, EventEmitter, Output } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AlertaService {
    
    @Output() getAlerta: EventEmitter<any> = new EventEmitter()
    @Output() alert: EventEmitter<any> = new EventEmitter()
    @Output() options: EventEmitter<any> = new EventEmitter()
    @Output() response: EventEmitter<any> = new EventEmitter()

    constructor() { }

    sendAlertaCont(data: any) {
        console.log('alerta: ', data);
        this.getAlerta.emit(data)
    }

    sendUserAlert(data: any) {
        this.alert.emit(data)
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