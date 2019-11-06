import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { ColaboradorModel } from 'src/app/models/colaboradores/colaborador.model';
import { LocalStorageServiceEncrypt } from 'angular-2-local-storage-encrypt';
import { switchMap } from 'rxjs/operators';
import { DatosCoModel } from '../../models/colaboradores/datosCo.model';
import { ExpLaboralModel } from '../../models/colaboradores/expLaboral.model';
import { UsuarioInterface } from '../../models/usuario.interface';

@Injectable({ providedIn: 'root' })
export class ColaboradorService {
    
    // colab$: Observable<any>
    @Output() changeMenu = new EventEmitter()
    public colaborador: any
    constructor(
        private auth: AngularFireAuth,
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

    async getCoPerfil(idCo) {
        const coRef = this.fs.collection('colaboradores').ref.doc(idCo)
        var perfilData = await coRef.get()
        var perfil = perfilData.data()
        return perfil
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
    
    async onLogin(email, pwd) {

        var colRef = this.fs.collection('colaboradores').ref
        var colDoc = await colRef.doc(email).get()

        if (colDoc.exists) {
        
            this.auth.auth.signInWithEmailAndPassword(email, pwd)
                .then(async res => {
            
                    var colab: ColaboradorModel
                    colab.id = res.user.uid
                    var doc = await this.fs.collection('colaboradores').ref.doc(colab.id).get()
                    colab = doc.data() as ColaboradorModel
                
                    this._localStorage.set('colab', JSON.stringify({
                        id: colab.id,
                        email: colab.email,
                        nombre: colab.nombre,
                        apellido_paterno: colab.apellido_paterno,
                        apellido_materno: colab.apellido_materno
                    }));
                    // ruta redirección
                    console.log('usuario logeado');
            
                }).catch(error => {
                    console.log(error)
                    if (error.code.includes('not-found')) {
                        alert('No se encontró el email')
                    }
                    if (error.code.includes('invalid')) {
                        alert('Escribe una direccion de correo válida')
                    }
                    if (error.code.includes('wrong-password')) {
                        alert('Contraseña incorrecta')
                    }
                })
        } else {
            console.log('Este correo no está registrado como colaborador, favor de registrarse')
        }

    }


    logout() {
        this.auth.auth.signOut().then(res => {
            this.router.navigate(['/colaboradores/'])
        })
    }

    async googleSingIn() {
        $("app-loading").fadeToggle()
        const provider = new auth.GoogleAuthProvider();
        const credential = await this.auth.auth.signInWithPopup(provider);
        console.log(credential);
        return this.updateUserData(credential.user)
    }

    async facebookSingIn() {
        $("app-loading").fadeToggle()
        const provider = new auth.FacebookAuthProvider();
        const credential = await this.auth.auth.signInWithPopup(provider);
        console.log(credential);
        return this.updateUserData(credential.user)
    }

    private async updateUserData({ uid, email, displayName, photoURL }: UsuarioInterface) {
        const userRef: AngularFirestoreDocument<UsuarioInterface> = this.fs.doc(`usuarios/${uid}`);
        const data = { uid, email, displayName, photoURL }
        userRef.set(data, { merge: true })
        $("app-loading").fadeToggle()
        const userDoc = await this.fs.collection('usuarios').ref.doc(uid).get()
        localStorage.setItem('needlog', JSON.stringify(userDoc.data()))
          
        this.router.navigate(['/colaborador/perfil']);
    
    }

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
    
}