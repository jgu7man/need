import { Injectable } from "@angular/core";
import { HelpMessageModel } from '../models/help-message.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertaService } from './alerta.service';

@Injectable({ providedIn: 'root' })
export class ContactoService {
    constructor(
        private fs: AngularFirestore,
        private _alerta: AlertaService
    ) {
        
    }

    async requestHelp(msj: HelpMessageModel) {
        var mensaje = {}
        await Object.keys(msj).forEach(key => { mensaje[key] = msj[key] })
        await this.fs.collection('helpMessages').add(mensaje)
        await this._alerta.sendAlertaCont('Tu mensaje fue envidao, pronto obtendrás una respuesta')
    }
}