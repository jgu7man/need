import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LocalStorageServiceEncrypt } from 'angular-2-local-storage-encrypt';
import { ColaboradorModel } from '../../models/colaboradores/colaborador.model';
import { AuthService } from '../usuarios/auth.service';
import { CoauthService } from './coauth.service';

@Injectable({ providedIn: 'root' })
export class ColaboradorService {
    
    // colab$: Observable<any>
    @Output() changeMenu = new EventEmitter()
    public colaborador: any
    constructor(
        private auth: AngularFireAuth,
        private _auth: CoauthService,
        private fs: AngularFirestore,
        private router: Router,
        private _localStorage: LocalStorageServiceEncrypt
    ) {
        // this.colab$ = this.auth.authState.pipe(
        //   switchMap( colab => {
        //     if (colab) {
        //         return this.fs
        //             .doc<ColaboradorModel>(`colaboradores/${colab.uid}`)
        //             .valueChanges()
        //     } else {
        //       return of(null);
        //     }
        //   })
        // )
    }


    public coPerfil: Subject<any> = new Subject<ColaboradorModel>()
    async getCoPerfil() {

        // Activate Load animation
        $( 'app-loading' ).toggle()


        // Check if is authenticated
        this._auth.colab$.pipe().subscribe( async colab => {
            
        

        if ( colab ) {

            // If get Authenticated check if is registreded

            const coRef = this.fs.collection( 'colaboradores' ).ref.doc( colab.uid )
            var perfilData = await coRef.get()
            if ( perfilData.exists ) {

                // If is registred get the data

                var perfil = perfilData.data() as ColaboradorModel;
                this.coPerfil.next( perfil )

                console.log(perfil);
                if (perfil.estado == 'solicitud') {
                    if ( !perfil.nombre || !perfil.apellido_materno || !perfil.apellido_paterno )
                        return this.router.navigate( [ '/colaborador/registro' ] ),
                            $( 'app-loading' ).fadeOut();

                    var datosDoc = await coRef.collection( 'info' ).doc( 'datos' ).get()
                    if ( !datosDoc.exists ) return this.router.navigate( [ '/colaborador/reg-datos', colab.uid ] ),
                        $( 'app-loading' ).fadeOut();

                    var expLaboralDoc = await coRef.collection( 'info' ).doc( 'exp_laboral' ).get()
                    if ( !expLaboralDoc.exists ) return this.router.navigate( [ '/colaborador/exp_laboral', colab.uid ] ),
                        $( 'app-loading' ).fadeOut();

                    if ( !perfil.imgPerfil || !perfil.identFront || !perfil.identBack )
                        return this.router.navigate( [ '/colaborador/add_imagen', colab.uid ] ),
                            $( 'app-loading' ).fadeOut();

                    return this.router.navigate( [ '/colaborador/login/estado/solicitud' ] ), $( 'app-loading' ).fadeOut(), this._auth.logout()
                
                } else if ( perfil.estado == 'inactivo' ) {
                
                    this.router.navigate( [ '/colaborador/login/estado/inactivo' ] )
                    $( 'app-loading' ).fadeOut()
                    this._auth.logout()

                } else {
                    this.router.navigate( [ '/colaborador' ] )
                    $( 'app-loading' ).fadeOut()
                }
            } else {

                $( 'app-loading' ).fadeOut()
                alert('Necesitas registrarte de nuevo')
                this.router.navigate( [ '/colaborador/registro' ] )
            }
        } 
    } )
    



    }

    async switchMenu(menu) {
        var user = JSON.parse(localStorage.getItem('needlog'))
        if (user) {
            if (user.colaborador) {
                // 'si es colaborador'
                if (menu == 'colaborador') {
                    // se activa el menu co y se cambian links a usuario'
                    this.changeMenu.emit(this.coMenu)
                    return this.userMenu
                } else {
                    // 'se activa el menu usuario y se cambian links a colab'
                    this.changeMenu.emit(this.userMenu)
                    return this.coMenu
                }
            } else {
                return this.userMenu
            }
        }
    }

    userMenu = { perfil: 'usuario', legend: 'Cuenta de usuario' }
    coMenu = { perfil: 'colaborador', legend: 'Equipo NEED' }
    
    // async onLogin(email, pwd) {

    //     var colRef = this.fs.collection('colaboradores').ref
    //     var colDoc = await colRef.doc(email).get()

    //     if (colDoc.exists) {
        
    //         this.auth.auth.signInWithEmailAndPassword(email, pwd)
    //             .then(async res => {
            
    //                 var colab: ColaboradorModel
    //                 colab.uid = res.user.uid
    //                 var doc = await this.fs.collection('colaboradores').ref.doc(colab.uid).get()
    //                 colab = doc.data() as ColaboradorModel
                
    //                 this._localStorage.set('colab', JSON.stringify({
    //                     id: colab.uid,
    //                     email: colab.email,
    //                     nombre: colab.nombre,
    //                     apellido_paterno: colab.apellido_paterno,
    //                     apellido_materno: colab.apellido_materno
    //                 }));
    //                 // ruta redirección
    //                 console.log('usuario logeado');
            
    //             }).catch(error => {
    //                 console.log(error)
    //                 if (error.code.includes('not-found')) {
    //                     alert('No se encontró el email')
    //                 }
    //                 if (error.code.includes('invalid')) {
    //                     alert('Escribe una direccion de correo válida')
    //                 }
    //                 if (error.code.includes('wrong-password')) {
    //                     alert('Contraseña incorrecta')
    //                 }
    //             })
    //     } else {
    //         console.log('Este correo no está registrado como colaborador, favor de registrarse')
    //     }

    // }

    async getCoRating(idCo) {
        const coRef = this.fs.collection('colaboradores').ref.doc(idCo)
        var ratePositivo = await coRef.collection('ratings').where('rate', '==', 'positivo').get()
        var rateNegativo = await coRef.collection('ratings').where('rate', '==', 'negativo').get()

        var rating = {positivo: ratePositivo.size, negativo: rateNegativo.size}
        
        return rating
    }

    async getEventosCompletados(idCo) {
        const coRef = this.fs.collection('colaboradores').ref.doc(idCo)
        var eventosData = await coRef.collection('eventos').where('estado', '==', 'completado').get()
        return eventosData.size
    }

    async comentarCo(idCo, idUser, coment) {
        if (idCo == idUser) { return false }
        else {
            const coRef = this.fs.collection('colaboradores').ref.doc(idCo)
            const userDoc = coRef.collection('ratings').doc(idUser)
            var comentario = await userDoc.update({ comentario: coment })
        }
    }

    async getComentarios(idCo) {
        const coRef = this.fs.collection('colaboradores').ref.doc(idCo)
        var comentariosData = await coRef.collection('ratings').get()
        var comentarios = []
        comentariosData.forEach(doc => {
            if (doc.data().comentario) {
                var coment = doc.data().comentario
                comentarios.push(coment)
            }
        })
        return comentarios
    }

    async coSearch(email) {
        const coRef = this.fs.collection('colaboradores').ref
        var result = await coRef.where('email', '==', email).get()
        return result.size == 0 ? 0 : result.docs[0].id
    }

    async setCapitan(id) {
        return this.fs.collection('colaboradores').ref.doc(id).update({
          capitan: true
        })
    }
    
}