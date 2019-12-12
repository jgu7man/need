import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-colaboradores',
  templateUrl: './admin-colaboradores.component.html',
  styleUrls: ['./admin-colaboradores.component.css']
})
export class AdminColaboradoresComponent implements OnInit {

  constructor(private fs: AngularFirestore) { }
  public colabs = []

  ngOnInit() {
    this.getColabs()
  }

  async getColabs() {
    var colabsCol = await this.fs.collection('colaboradores').ref.get()
    colabsCol.forEach(co => {
      this.colabs.push(co.data())
    })
    console.log(this.colabs);
  }
  
  onChangeEstado(id: string, estado) {
    console.log(estado);
    this.fs.collection('colaboradores').ref.doc(id)
      .update({ estado: estado})
  }
  
  estados = [
    'pendiente',
    'activo',
    'inactivo'
  ]


}
