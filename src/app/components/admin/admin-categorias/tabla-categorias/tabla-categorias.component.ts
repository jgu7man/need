import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tabla-categorias',
  templateUrl: './tabla-categorias.component.html',
  styleUrls: ['./tabla-categorias.component.css']
})
export class TablaCategoriasComponent implements OnInit {

  public categorias: any
  public subcategorias
  constructor(
    private fs: AngularFirestore
  ) { }

  ngOnInit() {
    this.getCategorias()
  }


  async getCategorias() {
    var colRef = this.fs.collection('categorias').ref
    var res = await colRef.get()
    this.categorias = []
    res.forEach(cat => {
      this.categorias.push({
        name: cat.data().name,
        imagen: cat.data().imagen,
        id: cat.id,
        subCategorias: cat.data().subCategorias
      })
    })
  }


  delCategoria(id) {
    
  }

}
