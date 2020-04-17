import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { Actividad } from 'src/app/models/evento/actividad.model';

@Injectable({ providedIn: 'root' })
export class HistorialService {

    constructor(
        private fs: AngularFirestore
    ) {
        
    }

    async setActividad(coll, doc, userColl, act, tipo ) {
        
        var actividad = {
            date:new Date(),
            actividad:act,
            tipo:tipo
        }

        var user = JSON.parse(localStorage.getItem('needlog'))
        
        this.fs.collection(coll).ref.doc(doc)
            .collection('historial').add(actividad).then(sucsses => {
                this.fs.collection(userColl).ref.doc(user.uid)
                    .collection('historial').add(actividad)
        })
        
    }
}