import { Injectable, Output, EventEmitter } from '@angular/core';
import { ColaboradorModel } from 'src/app/models/colaboradores/colaborador.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DatosCoModel } from 'src/app/models/colaboradores/datosCo.model';
import { ExpLaboralModel } from 'src/app/models/colaboradores/expLaboral.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RegistrarService {
    
    public colaborador: any
    @Output() imgLoaded: EventEmitter<any> = new EventEmitter()
    constructor(
        private fs: AngularFirestore,
        private auth: AngularFireAuth,
        private router: Router,
        private storage: AngularFireStorage
    ){}
    
    async onRegistrar(colab: ColaboradorModel) {
        const colRef = this.fs.collection('colaboradores').ref
        const userRef = this.fs.collection('usuarios').ref
        
        colRef.doc(colab.uid).set({
                uid: colab.uid,
                email: colab.email,
                nombre: colab.nombre,
                apellido_paterno: colab.apellido_paterno,
                apellido_materno: colab.apellido_materno,
                estado: colab.estado
            })
        
        // ASIGNAR EN COLECCIÓN USUARIOS EL VALOR DE COLABORADOR
        userRef.doc(colab.uid).update({
            colaborador: true
        })
        // REDIRECCIÓN A DATOS
        this.router.navigate(['/colaborador/reg-datos', colab.uid])

    }

    
    saveDatosColab(idColab, datos: DatosCoModel) {
        this.fs.collection('colaboradores').ref.doc(idColab)
            .collection('info').doc('datos').set({
                telefono: datos.telefono,
                direccion: datos.direccion,
                colonia: datos.colonia,
                ciudad: datos.ciudad,
                estado: datos.estado,
                pais: datos.pais,
                CURP: datos.CURP,
                RFC: datos.RFC
            }).then(ref => {
                this.router.navigate(['/colaborador/exp_laboral', idColab])
            })
    }

    saveExpLaboral(idColab, datos: ExpLaboralModel) {
        this.fs.collection('colaboradores').ref.doc(idColab)
            .collection('info').doc('exp_laboral').set({
                lugares: datos.lugares,
                extracto: datos.extracto,
                mesero: datos.mesero,
                barman: datos.barman,
                hostess: datos.hostess,
                vigilante: datos.vigilante,
            }).then(ref => {
                this.router.navigate(['/colaborador/add_imagen', idColab])
            })
    }

    saveImgPerfil(idColab, file, document: string) {
        const id = new Date().getTime()
            const path = `colaboradores/${idColab}/${idColab}-${document}`
            const ref = this.storage.ref(path)
            
        if ( typeof file == 'string' ) {
           var task = ref.putString(file, 'data_url')
        } else {
            var task = this.storage.upload(path, file)
        }
        
            
            $("app-loading").fadeIn()
            // $("app-uploading").fadeToggle()

            // await task.percentageChanges().subscribe(res => {
            //   return this.setPorcentaje.emit(res)
            // })
    
            task.snapshotChanges().pipe(
                finalize(() => {
                    ref.getDownloadURL().subscribe(res => {
                        this.fs.collection('colaboradores').ref.doc(idColab).update({
                          [document]: res
                        }).then(() => {
                            
                            $("app-loading").fadeOut()
                      })
                    })
                })
            ).subscribe()
        
    }
}