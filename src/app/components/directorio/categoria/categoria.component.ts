import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriasDirectorioService } from '../../../services/directorio/categorias.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  public catego: any;
  public negocios: any;
  constructor(
    private _ruta: ActivatedRoute,
    private _direcorio: CategoriasDirectorioService,
    public location: Location
  ) { }

  ngOnInit() {
    this._ruta.params.subscribe( params => {
      this.catego = params['name']
    })
    this.getNegocios(this.catego);
  }

  getNegocios(catego: string){
    this._direcorio.getNegociosByCategoria(catego).then(
      res => {
        this.negocios = res
      })
  }

}
