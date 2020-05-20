import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UsuarioInterface } from 'src/app/models/usuario.interface';
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
        return user ? this.afs.doc<UsuarioInterface>( `usuarios/${ user.uid }` ).valueChanges()
        : of(null);
      }))
  }
  
  async googleSingIn(link){
    try {
      const provider = new auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup( provider );
      return this.updateUserData( link, credential.user )
    } catch (error) {
      $( "app-loading" ).fadeOut()
    }
  }

  async facebookSingIn(link){
    try {
      const provider = new auth.FacebookAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup( provider );
      return this.updateUserData( link, credential.user )
    } catch ( error ) {
      $( "app-loading" ).fadeOut()
    }
  }
  
  async singOut(){
     await this.afAuth.auth.signOut();
     localStorage.removeItem('needlog')
     return this.router.navigate(['/']);
  }
  
  private async updateUserData(link, { uid, email, displayName, photoURL }: UsuarioInterface) {
    const userRef: AngularFirestoreDocument<UsuarioInterface> = this.afs.doc(`usuarios/${uid}`);
    const userDoc = await this.afs.collection('usuarios').ref.doc(uid).get()
    const dateRegist = new Date()
    
    if (userDoc.exists) {
      var data = { uid, email, displayName, photoURL }
      userRef.set(data, { merge: true })
    } else {
      var newData = { uid, email, displayName, photoURL, dateRegist }
      userRef.set(newData, { merge: true })
    }

    $("app-loading").fadeOut()
    localStorage.setItem('needlog', JSON.stringify(userDoc.data()))
      
    this.router.navigate([link]);
    
  }
  
}
