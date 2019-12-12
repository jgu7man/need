import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    constructor(private fs: AngularFirestore) { }
    
    async getUserPerfil(uid) {
        const userRef = this.fs.collection('usuarios').ref.doc(uid)
        var userDoc = await userRef.get()
        var usuario = userDoc.data()
        return usuario
    }

    async getUserRating(uid) {
        const userRef = this.fs.collection('usuarios').ref.doc(uid)
        var ratePositivo = await userRef.collection('ratings').where('rate', '==', 'positivo').get()
        var rateNegativo = await userRef.collection('ratings').where('rate', '==', 'negativo').get()

        var rating = {positivo: ratePositivo.size, negativo: rateNegativo.size}
        
        return rating
    }

    async getEventosCompletados(uid) {
        const eventosRef = this.fs.collection('eventos').ref
            .where('usuario', '==', uid)
            .where('estado', '==', 'completado')
        var eventos = await eventosRef.get()
        return eventos.size
    }

    async getUserRateOfCo(uid, idCo) {
        const userRef = this.fs.collection('usuarios').ref.doc(uid)
        var userRate = await userRef.collection('ratings').doc(idCo).get()
        if (userRate.exists) {
            var coRate = userRate.data().rate
            return coRate
        } else {
            return false
        }
    }

    async rateUser(uid, idCo, rate) {
        if (idCo == uid) { return false }
        else {
            const userRef = this.fs.collection('usuarios').ref.doc(uid)
            await userRef.collection('ratings').doc(idCo).set({
                rate: rate
            })
            return rate
        }
    }

    async comentarUser(uid, idCo, coment) {
        if (uid == idCo) { return false } else {
            const userRef = this.fs.collection('usuarios').ref.doc(uid)
            const coDoc = userRef.collection('ratings').doc(idCo)
            var comentario = await coDoc.update({comentario: coment})
        }
    }

    async getComentarios(uid) {
        const userRef = this.fs.collection('colaboradores').ref.doc(uid)
        var comentariosData = await userRef.collection('ratings').get()
        var comentarios = []
        comentariosData.forEach(doc => {
            if (doc.data().comentario) {
                var coment = doc.data().comentario
                comentarios.push(coment)
            }
        })
        return comentarios
    }

  async getNegocioUser(idUsuario) {
        var resNegocios = await this.fs.collection('negocios').ref
            .where('idUsuario', '==', idUsuario).get()
        
        var negocios = []
        resNegocios.forEach(negocio => {
           negocios.push(negocio.data()) 
        })

        return negocios
    }

    async getEventosUserNum(idUsuario) {
        var resEventos = await this.fs.collection('eventos').ref
            .where('usuario', '==', idUsuario).get()
        return resEventos.size
    }

    async userSearch(email) {
        const coRef = this.fs.collection('usuarios').ref
        var result = await coRef.where('email', '==', email).get()
        return result.size == 0 ? 0 : result.docs[0].id
    }
}
