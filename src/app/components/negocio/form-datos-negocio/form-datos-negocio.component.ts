import { Component, OnInit } from '@angular/core';
import { NegocioDatosModel } from 'src/app/models/directorio/negocio-datos.model';
import { NegocioService } from '../../../services/directorio/negocio.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-datos-negocio',
  templateUrl: './form-datos-negocio.component.html',
  styleUrls: ['./form-datos-negocio.component.css']
})
export class FormDatosNegocioComponent implements OnInit {

  public negocioDatos: NegocioDatosModel
  public negId: string
  public image: any
  public percent
  constructor(
    private _negocio: NegocioService,
    private _ruta: ActivatedRoute,
    private router: Router
  ) {
    this.negocioDatos = new NegocioDatosModel('', '', '', '', '', '', '', '')
    _ruta.params.subscribe( params => {this.negId = params['id']})
   }

  ngOnInit() {
    this._negocio.setPorcentaje.subscribe( percent => {
      this.percent = percent
    })
  }

  imagen(fileInput: any){
    this.image = <Array<File>>fileInput.target.files[0];

    var reader = new FileReader();
    reader.onload = function() {
      var image:any = document.querySelector('#imagenNegocio');
      image.src = reader.result
    }
    reader.readAsDataURL(fileInput.target.files[0]);
    this._negocio.subirImagen(this.negId, this.image)
  }


  async onSubmit() {
    await this._negocio.saveDatosNegocio(this.negId, this.negocioDatos)
    this.router.navigate(['/negocio/', this.negId])
  }

}
