import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { UsuarioInterface } from '../../models/usuario.interface';

@Injectable({providedIn: 'root'})
export class CoauthService {
    constructor(
        private fs: AngularFirestore,
        private auth: AngularFireAuth,
        private router: Router,
    ) {
        
    }

    logout() {
        this.auth.auth.signOut().then(res => {
            this.router.navigate(['/colaboradores/'])
        })
    }

    async googleSingIn() {
        $("app-loading").fadeIn()
        const provider = new auth.GoogleAuthProvider();
        const credential = await this.auth.auth.signInWithPopup(provider);
        
        return this.updateCoData(credential.user)
    }

    async googleSingUp() {
        $("app-loading").fadeIn()
        const provider = new auth.GoogleAuthProvider();
        const credential = await this.auth.auth.signInWithPopup(provider);
        
        return credential.user
    }

    private async updateCoData({ uid, email, displayName, photoURL }: UsuarioInterface) {
        const coRef = this.fs.collection('colaboradores').ref.doc(uid);
        var coData = await coRef.get()
        if (!coData.exists) {
            this.fs.collection('colaboradores').ref.doc(uid).set({uid, email})
            this.auth.auth.signOut()
            this.router.navigate(['/colaborador/registro']);
        } else {
            const userDoc = await this.fs.collection('usuarios').ref.doc(uid).get()
            localStorage.setItem('needlog', JSON.stringify(userDoc.data()))
            this.router.navigate(['/colaborador/perfil']);
        }
        $("app-loading").fadeOut()
          
    
    }
}