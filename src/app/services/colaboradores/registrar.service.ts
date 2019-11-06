import { Injectable } from "@angular/core";
import { ColaboradorModel } from '../../models/colaboradores/colaborador.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DatosCoModel } from '../../models/colaboradores/datosCo.model';
import { ExpLaboralModel } from '../../models/colaboradores/expLaboral.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RegistrarService {
    
    public colaborador: any
    constructor(
        private fs: AngularFirestore,
        private auth: AngularFireAuth,
        private router: Router,
        private storage: AngularFireStorage
    ){}
    
    async onRegistrar(colab: ColaboradorModel) {
        //  REVISAR SI EXISTE EL EMAIL REGISTRADO EN COLABORADORES
        const colRef = this.fs.collection('colaboradores').ref
        const colDocs = await colRef.where('email', '==', colab.email).get()
        const colDoc = colDocs.docs[0]
        //  REVISAR SI EXISTE EL EMAIL REGISTRADO EN USUARIOS
        const userRef = this.fs.collection('usuarios').ref
        const userDocs = await userRef.where('email', '==', colab.email).get()
        const userDoc = userDocs.docs[0]
        
        if (colDocs.size == 0 && userDocs.size == 0) {
            // SI NO EXISTE CREAR CUENTA
            this.auth.auth
                .createUserWithEmailAndPassword(colab.email, colab.password)
                .then(colaborador => {

                    this.colaborador = colaborador.user.uid
                    // SI NO EXISTE CORREO REGISTRADO COMO USUARIO => GUARDAR
                    colRef.doc(this.colaborador)
                        .set({
                            id: this.colaborador,
                            email: colab.email,
                            nombre: colab.nombre,
                            apellido_paterno: colab.apellido_paterno,
                            apellido_materno: colab.apellido_materno,
                            estado: colab.estado
                        })
                    // ASIGNAR EN COLECCIÓN USUARIOS EL VALOR DE COLABORADOR
                    userRef.doc(userDoc.id).update({
                        colaborador: true
                    })
                    // REDIRECCIÓN A DATOS
                    this.router.navigate(['/colaboradores/reg-datos', userDoc.id])
                    console.log('usuario registrado');
                }).catch(error => {
                    console.log(error);
                    if (error.code.includes('invalid')) {
                        alert('Escribe una direccion de correo válida')
                    }
                })

        } else if (colDocs.size == 0 && userDocs.size > 0) {
            // SI EXISTE EL CORREO COMO USUARIO SÓLO GUARDAR EN LA COLECCIÓN
            colRef.doc(userDoc.id).set({
                id: userDoc.id,
                email: colab.email,
                nombre: colab.nombre,
                apellido_paterno: colab.apellido_paterno,
                apellido_materno: colab.apellido_materno
            })
            // ASIGNAR EN COLECCIÓN USUARIOS EL VALOR DE COLABORADOR
            userRef.doc(userDoc.id).update({
                colaborador: true
            })
            // REDIRECCIÓN A DATOS
            this.router.navigate(['/colaboradores/reg-datos', userDoc.id])
        } else {
            console.log('Este email ya está registrado, por favor usa otro');
        }
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
                this.router.navigate(['/colaboradores/exp_laboral', idColab])
            })
    }

    saveExpLaboral(idColab, datos: ExpLaboralModel) {
        console.log(datos);
        this.fs.collection('colaboradores').ref.doc(idColab)
            .collection('info').doc('exp_laboral').set({
                lugares: datos.lugares,
                extracto: datos.extracto,
                mesero: datos.mesero,
                barman: datos.barman,
                hostess: datos.hostess,
                seguridad: datos.seguridad,
            }).then(ref => {
                this.router.navigate(['/colaboradores/add_imagen', idColab])
            })
    }

    saveImgPerfil(idColab, file) {
        const id = new Date().getTime()
            const name = id + file.name
            const path = `imgPerfilCo/${name}`
            const ref = this.storage.ref(path)
            const task = this.storage.upload(path, file)
            
            $("app-loading").fadeToggle()
            // $("app-uploading").fadeToggle()

            // await task.percentageChanges().subscribe(res => {
            //   return this.setPorcentaje.emit(res)
            // })
    
            task.snapshotChanges().pipe(
                finalize(() => {
                    ref.getDownloadURL().subscribe(res => {
                        this.fs.collection('colaboradores').ref.doc(idColab).update({
                          imgPerfil: res
                        }).then(res => {
                          this.router.navigate(['/colaborador-registrado', idColab])
                      })
                    })
                })
            ).subscribe()
        
    }
}