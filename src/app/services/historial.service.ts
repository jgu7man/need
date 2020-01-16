import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { ActividadModel } from '../models/evento/actividad.model';

@Injectable({ providedIn: 'root' })
export class HistorialService {

    constructor(
        private fs: AngularFirestore
    ) {
        
    }

    async setActividad(actividad: ActividadModel) {
        var doc = {
            collection:actividad.collection,
            document:actividad.document,
        }
        
        this.fs.collection(doc.collection).ref.doc(doc.document)
            .collection('historial').add({
            activador:actividad.activador,
            date:actividad.date,
            actividad:actividad.actividad,
            tipo:actividad.tipo
        })
        
    }
}