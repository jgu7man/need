import { Component, OnInit } from '@angular/core';
import { CategoriasDirectorioService } from 'src/app/services/directorio/categorias.service'

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  public categorias:any;
  constructor(
    private _categorias: CategoriasDirectorioService,
  ) { }

  async ngOnInit() {
    this.categorias = await this._categorias.getCategorias()
  }

}
