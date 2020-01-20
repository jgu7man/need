import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AdminDataService {

    public promocionado = 120
    constructor(
        private fs: AngularFirestore
    ) {}

    async getPersonalPrecios() {
        const coll = this.fs.collection('personal').ref
        var personalRes = coll.get()
        var personal = {};
        (await personalRes).forEach(elemento => {
            Object.defineProperty(personal, elemento.id,
            { value: elemento.data().precio, enumerable: true, configurable: true, writable: false })
        })
        return personal
    }
}