import { Injectable } from "@angular/core";
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class FileService {
    constructor(
        private st: AngularFireStorage,
        private fs: AngularFirestore,
        private router: Router,
    ) { }

    porcentaje = new Subject<number>()
    
    async saveTicketPago(idServicio, file) {
        const id = new Date().getTime()
            const name = id + file.name
            const path = `tickets_de_pago/${name}`
            const ref = this.st.ref(path)
            const task = this.st.upload(path, file)
            
            $("app-loading").fadeIn()
            // $("app-uploading").fadeToggle()

            await task.percentageChanges().subscribe(res => {
              return this.porcentaje.next(res)
            })
    
            task.snapshotChanges().pipe(
                finalize(() => {
                    ref.getDownloadURL().subscribe(res => {
                        this.fs.collection('transferencias').ref.doc(idServicio).update({
                          imgPerfil: res
                        }).then(res => {
                          this.router.navigate(['/usuario', idServicio])
                          $("app-loading").fadeOut()
                      })
                    })
                })
            ).subscribe()
        
    }
}