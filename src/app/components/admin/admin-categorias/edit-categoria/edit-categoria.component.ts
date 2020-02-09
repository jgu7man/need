import { Component, OnInit } from '@angular/core';
import { CategoriasDirectorioService } from '../../../../services/directorio/categorias.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Location } from '@angular/common';
import { CategoriaModel } from '../../../../models/directorio/categoria.model';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-categoria',
  templateUrl: './edit-categoria.component.html',
  styleUrls: ['./edit-categoria.component.css']
})
export class EditCategoriaComponent implements OnInit {

  public categoria: CategoriaModel
  public subcategoria: string
  public catPadre: string
  public categorias: any
  public imgToLoad: any
  public percent
  public catId: string
  constructor(
    private _categorias: CategoriasDirectorioService,
    private fs: AngularFirestore,
    private ft: AngularFireStorage,
    private location: Location,
    private ruta: ActivatedRoute
  ) {
    this.categoria = new CategoriaModel('', '', [], '')
    this.subcategoria = ''
    this.ruta.params.subscribe(param => { this.catId = param['id'] })
   }

  async ngOnInit() {
    var colRef = this.fs.collection('categorias').ref.doc(this.catId)
    var res = await colRef.get()
    if (res.exists) {
      this.categoria = {
        name: res.data().name,
        subCategorias: res.data().subCategorias,
        imagen: res.data().imagen,
        id: res.id
      }
    }
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

  onEditCategoria() {
    console.log(this.categoria);
    const colRef = this.fs.collection('categorias').ref
    
      colRef.doc(this.categoria.id).update({
        name: this.categoria.name,
        imagen: this.categoria.imagen,
        subCategorias: this.categorias.subCategorias
      }).then(res => {
        this.location.back()
      })
    


  }

}
