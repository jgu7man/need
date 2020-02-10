import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/usuarios/auth.service';
import { FacturaService } from '../../services/finanzas/facturas.service';
import { AlertaService } from '../../services/alerta.service';
import { HistorialService } from '../../services/historial.service';
import { TransaccionModel } from '../../models/finanzas/transaccion.model';
import { TransferenciaModel } from '../../models/finanzas/transferencia.model';
import { PagoModel } from '../../models/evento/pago.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UsuarioModel } from '../../models/usuario.model';
import { PagosEventoService } from '../../services/eventos/pagos_evento.service';
import { SuscripcionService } from '../../services/directorio/suscripcion.service';


@Injectable({ providedIn: 'root' })
export class TransferenciasService {
    porcentaje = new Subject<number>()
    constructor(
        private fs: AngularFirestore,
        private st: AngularFireStorage,
        private auth: AuthService,
        private _router: Router,
        private _alerta: AlertaService,
        private _pagoEvento: PagosEventoService,
        private _suscripciones: SuscripcionService,
        private _historial: HistorialService,
        private _facturas: FacturaService
    ) {
        
    }

    

    async pagoTransferencia( transferData: TransaccionModel, file: any) {
        // Abre animación de cargado
        $("app-loading").fadeIn()

        // Fijar fechas
        const today = new Date(),
            fecha = today.toLocaleDateString(),
            hora = today.toLocaleTimeString(),
            month = today.getMonth(),
            year = today.getFullYear(),


            // Define constantes
            transferColl = this.fs.collection('transferencias').ref,
            user = await this.auth.user$.pipe().toPromise() as UsuarioModel
            // const user = JSON.parse(localStorage.getItem('needlog'))
        console.log(user)
        
        

        // Rellenar campos faltantes
        transferData.idUsuario = user.uid
        transferData.factura.mesFacturado = new Date(year, month, 0, 23, 59)
        transferData.factura.idServicio = transferData.idServicio

        // Ordenar objeto
        var transferencia = {}
        await Object.keys(transferData).forEach(key => { transferencia[key] = transferData[key] })
        

        // Carga a firebase y define el nuevo documento
        var transfer = await transferColl.add(transferencia)
        var transferDoc = transferColl.doc(transfer.id)
            transferDoc.update({idTransaccion: transfer.id})
        


        // Define data de archivo
        const fileName = fecha+hora
        const path = `tickets_de_pago/${transferData.idServicio}/${fileName}`
        const ref = this.st.ref(path)
        const task = this.st.upload(path, file)
        
        
        // Notifica el proceso de carga del archivo
        // $("app-uploading").fadeToggle()
        await task.percentageChanges().subscribe(res => {
            return this.porcentaje.next(res)
        })


        // Obtiene el link del archivo cargado y notifica
        task.snapshotChanges().pipe(
            finalize(() => {
                ref.getDownloadURL().subscribe(res => {
                    transferDoc.update({ imgTicket: res }).then(res => {
                        this._alerta.sendAlertaCont('Se agregó la información de tu pago, la revisión puede tardar 24 horas, hasta entonces debes esperar para ver reflejado el pago').subscribe(res => {
                            this._router.navigate(['/usuario/evento/', transferData.idServicio])
                            $("app-loading").fadeOut()
                        })
                    })
                })
            })
        ).subscribe()

    }









    async getTrasnferencias() {
        // Define constantes
        const
            coll = this.fs.collection('transferencias').ref.orderBy('fecha', 'desc'),
            collRes = await coll.get(),
            transferencias: any[] = [];
        


        // Obtiene el resultado y las ingresa al arreglo
        collRes.forEach(trans => {
            var transferencia = trans.data()
            transferencia.fecha = trans.data().fecha.toDate()
            transferencias.push(transferencia)
        })


        return transferencias as TransaccionModel[]
    }





    async getOneTransferencia(id) {
        const coll = this.fs.collection('transferencias').ref
        var transDoc = await coll.doc(id).get()
        var transferencia = transDoc.data()
        transferencia.fecha = transDoc.data().fecha.toDate()
        return transferencia as TransaccionModel
    }







    async adjudicarTransferEvento(transferencia: TransaccionModel) {
        $("app-loading").fadeIn()

        // Busca la transferencia y valida que no haya sido adjudicada antes
        const transferDoc = await this.fs.collection('transferencias').ref.doc(transferencia.idTransaccion)
        var adjudicada = (await transferDoc.get()).get('adjudicada')
        if (!adjudicada) {

            if (transferencia.concepto == 'evento') {

                this._pagoEvento.setPagoEvento(transferencia).then(ok => {
                
                    // Notifica al administrador que el pago se adjudicó
                    this._alerta.sendAlertaCont('Se adjudicó el pago').subscribe(res => {
                        this._router.navigateByUrl('/admin', { skipLocationChange: true })
                            .then(() => {
                                this._router.navigate(['/admin/transferencias'])
                                $("app-loading").fadeOut()
                            })
                    })
    
                })

            } else if (transferencia.concepto == 'suscripcion') {
                
                this._suscripciones.setPagoSuscripcion(transferencia).then(ok => {
                
                    // Notifica al administrador que el pago se adjudicó
                    this._alerta.sendAlertaCont('Se adjudicó el pago').subscribe(res => {
                        this._router.navigateByUrl('/admin', { skipLocationChange: true })
                            .then(() => {
                                this._router.navigate(['/admin/transferencias'])
                                $("app-loading").fadeOut()
                            })
                    })
    
                })

            }
            
        } else {
            this._alerta.sendAlertaCont('Este ticket ya se adjudicó')
        }
    }







    async adjudicarTransferSuscripcion() {
        
    }

    
}