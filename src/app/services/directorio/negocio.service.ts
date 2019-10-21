import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NegocioModel } from '../../models/direcorio/negocio.model';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class NegocioService {


    constructor(
        private fs: AngularFirestore,
        private ft: AngularFireStorage
    ){}

    async saveNegocio(negocio: NegocioModel) {
        var negocioSaved = await this.fs.collection('negocios').ref.add({
            idUsuario: negocio.idUsuario,
            nombre: negocio.nombre,
            imgPerfil: negocio.imgPerfil,
            categoria: negocio.categoria,
            telefono: negocio.telefono,
            email: negocio.email,
            sitioweb: negocio.sitioweb,
            descripcion: negocio.descripcion,
            direccion: negocio.direccion,
            colonia: negocio.colonia,
            ciudad: negocio.ciudad
        })

        await this.fs.collection('negocios').ref.doc(negocioSaved.id)
            .update({ idNegocio: negocioSaved.id })
        
        await this.fs.collection('usuarios').ref.doc(negocio.idUsuario)
            .update({ negocio: true })
        
        return {
            mensaje: 'negocio guardado',
            id: negocioSaved.id
        }
    }

    async updateNegocio( negocio: NegocioModel) {
        await this.fs.collection('negocios').ref.doc(negocio.idNegocio).update({
            idUsuario: negocio.idUsuario,
            nombre: negocio.nombre,
            imgPerfil: negocio.imgPerfil,
            categoria: negocio.categoria,
            telefono: negocio.telefono,
            email: negocio.email,
            sitioweb: negocio.sitioweb,
            descripcion: negocio.descripcion,
            direccion: negocio.direccion,
            colonia: negocio.colonia,
            ciudad: negocio.ciudad
        })

        return {
            mensaje: 'negocio actualizado',
            idNegocio: negocio.idNegocio
        }
    }

    async getNegocio( idNegocio: any) {
        var negocio = await this.fs.collection('negocios').ref
            .doc(idNegocio).get()
        return {negocio: negocio.data()}
    }

    async subirImagen(idNegocio, file) {
        const id = new Date().getTime()
        const name = id + file.name
        const path = `imgNegocios/${name}`
        const ref = this.ft.ref(path)
        const task = this.ft.upload(path, file)
        
        await task.percentageChanges().subscribe(res => {
        //   return this.setPorcentaje.emit(res)
        })
    
        task.snapshotChanges().pipe(
            finalize(() => {
              ref.getDownloadURL().subscribe(res => {
                  this.fs.collection("negocios").doc(idNegocio).update({
                    nAvatar: res
                  })
                })
            })
        ).subscribe()
    }

    async rate(id: string, rater: string) {
        var collectionRef = this.fs.collection('negocios').ref
        var rateDoc = await collectionRef.doc(id).collection('ratings').doc(rater)
        var Doc = await rateDoc.get()
        if (!Doc.exists) {
            rateDoc.set({ rate: true })
        } else {
            rateDoc.delete();
        }

        return !Doc.exists ? {rated: true} : {rated: false}
    }

    async getRating(id: string) {
        var dbRef = this.fs.collection('negocios').ref
        var docRef = dbRef.doc(id).collection('ratings')
        var rating = await docRef.get()

        return rating.size
    }

    async rater(id: string, rater: string) {
        var dbRef = this.fs.collection('negocios').ref
        var docRef = dbRef.doc(id).collection('ratings')
        var theRater = await docRef.doc(rater).get()
        
        return theRater.exists ? {isRater: true} : {isRater: false}
    }

    async comentar(id: string, comentario: string) {
        var dbRef = this.fs.collection('negocios').ref
        var docRef = dbRef.doc(id)
        var doc = await docRef.get()
        
        docRef.set({ comentarios: [comentario]}, {merge: true})
        
    }

    async getComentarios(id: string) {
        var dbRef = this.fs.collection('negocios').ref
        var docRef = await dbRef.doc(id).get()
        var comentarios = docRef.data().comentarios
        return comentarios
    }
}
