import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IndexService } from '../../../services/indexar.service';

@Component({
  selector: 'app-admin-colaboradores',
  templateUrl: './admin-colaboradores.component.html',
  styleUrls: ['./admin-colaboradores.component.css']
})
export class AdminColaboradoresComponent implements OnInit {

  public colabs = []
  public first = 1
  public last = this.first + 9
  public coCant
  public pageAnclas = []
  public fieldSort
  constructor(private fs: AngularFirestore, public _index: IndexService) { }

  async ngOnInit() {
    $('app-loading').fadeIn()
    this._index.initIndex('colaboradores', 'email', 10)
    this._index.dataIndexed.subscribe(data => {
      $('app-loading').fadeOut()
      this.colabs = data.pageContent
      this.first = data.firstIndex
      this.last = data.lastIndex
      this.coCant = data.collectionSize
    })
    
    
  }


  onChangeEstado(id: string, estado) {
    this.fs.collection('colaboradores').ref.doc(id)
      .update({ estado: estado})
  }
  
  estados = [
    'pendiente',
    'activo',
    'inactivo'
  ]


}
