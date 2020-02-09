import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NegocioModel } from '../../models/directorio/negocio.model';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { NegocioDatosModel } from 'src/app/models/directorio/negocio-datos.model';
import { NegocioExtrasModel } from 'src/app/models/directorio/negocio-extras.model';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class NegocioService {


    constructor(
        private fs: AngularFirestore,
        private ft: AngularFireStorage,
        private router: Router
    ){}

    @Output() setPorcentaje: EventEmitter<any> = new EventEmitter()

    async saveNegocio(negocio: NegocioModel) {
        var negocioSaved = await this.fs.collection('negocios').ref.add({
            idUsuario: negocio.idUsuario,
            nombre: negocio.nombre,
            categoria: negocio.categoria,
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

    async saveDatosNegocio(negId, datos: NegocioDatosModel) {
        this.fs.collection('negocios').ref.doc(negId)
            .collection('datos').doc('datos').set({
                telefono: datos.telefono,
                email: datos.email,
                sitioweb: datos.sitioweb,
                descripcion: datos.descripcion,
                direccion: datos.direccion,
                colonia: datos.colonia,
                ciudad: datos.ciudad
            })
        return 'Datos guardados'
    }

    async setSolicitud(uid, email) {
        var today = new Date(),
            getMes = today.getMonth(),
            getDia = today.getDate(),
            getYear = today.getFullYear(),
            setCorte = new Date(+getYear, +getMes + 1, +getDia)
        var negRef = await this.fs.collection('negocios').ref.add({
            idUsuario: uid,
            ownerEmail: email,
            estado: 'solicitud',
            suscripcion: today,
            corte: setCorte
        })
        this.fs.collection('negocios').ref.doc(negRef.id)
            .update({ idNegocio: negRef.id })
        
        
        this.fs.collection('usuarios').ref.doc(uid)
            .update({ negocio: true })
        
        return 'solicitud enviada'
    }

    async updateNegocio( negocio: NegocioModel) {
        await this.fs.collection('negocios').ref.doc(negocio.idNegocio).update({
            nombre: negocio.nombre,
            categoria: negocio.categoria
        })

        return {
            mensaje: 'negocio actualizado',
            idNegocio: negocio.idNegocio
        }
    }

    async updateNegocioDatos( negId, datos: NegocioDatosModel) {
        await this.fs.collection('negocios').ref.doc(negId).
            collection('datos').doc('datos').update({
            imgPerfil: datos.imgPerfil,
            telefono: datos.telefono,
            email: datos.email,
            sitioweb: datos.sitioweb,
            descripcion: datos.descripcion,
            direccion: datos.direccion,
            colonia: datos.colonia,
            ciudad: datos.ciudad
        })

        return {
            mensaje: 'negocio actualizado',
            idNegocio: negId
        }
    }

    async getNegocio( idNegocio: any) {
        var negocio = await this.fs.collection('negocios').ref
            .doc(idNegocio).get()
        
        return negocio.exists ?
            negocio.data() as NegocioModel : false
    }

    async getNegocioDatos(negId: string) {
        var negocioDatos = await this.fs.collection('negocios').ref
            .doc(negId).collection('datos').doc('datos').get()
        return negocioDatos.exists ? 
            negocioDatos.data() as NegocioDatosModel : false
    }

    async getNegocioExtras(negId: string) {
        var negocioExtras = await this.fs.collection('negocios').ref
            .doc(negId).collection('datos').doc('extras').get()
        return  negocioExtras.data() as NegocioExtrasModel
    }

    async subirImagen(idNegocio, file) {
        const id = new Date().getTime()
        const name = id + file.name
        const path = `negocios/${idNegocio}/perfil/${name}`
        const ref = this.ft.ref(path)
        const task = this.ft.upload(path, file)
        
        // $("app-loading").fadeToggle()
        await task.percentageChanges().subscribe(res => {
          return this.setPorcentaje.emit(res)
        })

    
        task.snapshotChanges().pipe(
            finalize(() => {
                ref.getDownloadURL().subscribe(res => {
                  this.fs.collection("negocios").doc(idNegocio).update({
                    imgPerfil: res
                  })
                })
            })
        ).subscribe()

        return 'Imagen agregada'
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
