import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UsuarioInterface } from '../models/usuario.interface';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap( user => {
        if (user) {
          return this.afs.doc<UsuarioInterface>(`usuarios/${user.uid}`).valueChanges()
        } else {
          return of(null);
        }
      })
    )
  }
  
  async googleSingIn(link){
      const provider = new auth.GoogleAuthProvider();
       const credential = await this.afAuth.auth.signInWithPopup(provider);
       console.log(credential);
     return this.updateUserData(link, credential.user)
  }

  async facebookSingIn(link){
        const provider = new auth.FacebookAuthProvider();
       const credential = await this.afAuth.auth.signInWithPopup(provider);
       console.log(credential);
        return this.updateUserData(link, credential.user)
  }
  
  async singOut(){
     await this.afAuth.auth.signOut();
     localStorage.removeItem('needlog')
     return this.router.navigate(['/']);
  }
  
  private async updateUserData(link, { uid, email, displayName, photoURL }: UsuarioInterface) {
    const userRef: AngularFirestoreDocument<UsuarioInterface> = this.afs.doc(`usuarios/${uid}`);
    const data = { uid, email, displayName, photoURL }
    userRef.set(data, { merge: true })
    $("app-loading").fadeToggle()
    const userDoc = await this.afs.collection('usuarios').ref.doc(uid).get()
      localStorage.setItem('needlog', JSON.stringify(userDoc.data()))
      
    this.router.navigate([link]);
    
  }
  
}
