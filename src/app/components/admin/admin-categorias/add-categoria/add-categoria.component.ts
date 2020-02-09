import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from '../../../../models/directorio/categoria.model';
import { CategoriasDirectorioService } from '../../../../services/directorio/categorias.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css']
})
export class AddCategoriaComponent implements OnInit {

  public categoria: CategoriaModel
  public subcategoria: string
  public catPadre: string
  public categorias: any
  public imgToLoad: any
  public percent
  constructor(
    private _categorias: CategoriasDirectorioService,
    private fs: AngularFirestore,
    private ft: AngularFireStorage,
    private location: Location
  ) {
    this.categoria = new CategoriaModel('', '', [], '')
    this.subcategoria = ''
   }

  async ngOnInit() {
    this.categorias = await this._categorias.getCategorias()
    console.log(this.categorias);
  }

  addSubCategoria() {
    this.categoria.subCategorias.push(this.subcategoria)
    this.subcategoria = ''
  }

  delSubCategoria(i) {
    this.categoria.subCategorias.splice(i)
  }

  onLoadImg(file) {
    this.imgToLoad = file.target.files[0]
    var reader = new FileReader()
    reader.onload = () => {
      var img: any;
      img = document.getElementById('catImagen')
      img.src = reader.result
    }
    reader.readAsDataURL(file.target.files[0])
    this.loadImg()
  }

  async loadImg() {
    const
      path = `directorio_categorias/${this.imgToLoad.name}`,
      ref = this.ft.ref(path),
      task = this.ft.upload(path, this.imgToLoad)
      
    await task.percentageChanges().subscribe(res => {
      return this.percent = res
    })

    await task.snapshotChanges().pipe(
      finalize(async () => {
          await ref.getDownloadURL().subscribe(res => { this.categoria.imagen = res })
          return
      })
    ).subscribe()
  }

  onAddCategoria() {
    console.log(this.categoria);
    const colRef = this.fs.collection('categorias').ref
    
      colRef.doc(this.categoria.id).set({
        name: this.categoria.name,
        imagen: this.categoria.imagen,
        subCategorias: this.categoria.subCategorias
      }).then(res => {
        this.location.back()
      })
    


  }

  

}
