import { Injectable, EventEmitter, Output } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AlertaService {
    
    @Output() getAlerta: EventEmitter<any> = new EventEmitter()

    constructor() { }

    sendAlertaCont(data: any) {
        console.log('alerta: ', data);
        this.getAlerta.emit(data)
    }
}