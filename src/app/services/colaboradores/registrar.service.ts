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
            nombre: colab.nombre.toLowerCase(),
            apellido_paterno: colab.apellido_paterno.toLowerCase(),
            apellido_materno: colab.apellido_materno.toLowerCase(),
            estado: colab.estado.toLowerCase()
            })
        
        // ASIGNAR EN COLECCIÓN USUARIOS EL VALOR DE COLABORADOR
        userRef.doc(colab.uid).update({
            colaborador: true
        })
        // REDIRECCIÓN A DATOS
        this.router.navigate(['/colaborador/reg-datos', colab.uid])
        console.log('usuario registrado');

    }

    
    saveDatosColab(idColab, datos: DatosCoModel) {
        this.fs.collection('colaboradores').ref.doc(idColab)
            .collection('info').doc('datos').set({
                telefono: datos.telefono,
                direccion: datos.direccion.toLowerCase(),
                colonia: datos.colonia.toLowerCase(),
                ciudad: datos.ciudad.toLowerCase(),
                estado: datos.estado.toLowerCase(),
                pais: datos.pais.toLowerCase(),
                CURP: datos.CURP.toUpperCase(),
                RFC: datos.RFC.toUpperCase()
            }).then(() => {
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
            }).then(() => {
                this.router.navigate(['/colaborador/add_imagen', idColab])
            })
    }

    saveImgDoc(idColab:string, file, doc: 'perfil' | 'identFront' | 'identBack') {
        const id = new Date().getTime()
            const path = `colaboradores/${idColab}/${doc}-${idColab}`
            const ref = this.storage.ref(path)
            const task = this.storage.upload(path, file)
            
            // $("app-loading").fadeIn()
            // $("app-uploading").fadeToggle()

            // await task.percentageChanges().subscribe(res => {
            //   return this.setPorcentaje.emit(res)
            // })
    
            task.snapshotChanges().pipe(
                finalize(() => {
                    ref.getDownloadURL().subscribe(res => {
                        this.fs.collection('colaboradores').ref.doc(idColab).update({
                          [doc]: res
                        } )
                            .then( res => {
                                console.log(doc, 'agregada')
                                // this.router.navigate(['/colaborador-registrado', idColab])
                                // $("app-loading").fadeOut()
                            })
                    })
                })
            ).subscribe()
        
    }
}