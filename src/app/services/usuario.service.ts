import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private fs: AngularFirestore) { }

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
}
