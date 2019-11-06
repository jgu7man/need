import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrarService } from '../../../services/colaboradores/registrar.service';

@Component({
  selector: 'app-co-add-imagen',
  templateUrl: './co-add-imagen.component.html',
  styleUrls: ['./co-add-imagen.component.css']
})
export class CoAddImagenComponent implements OnInit {

  public idColab: string
  public imgPerfil
  constructor(
    private _ruta: ActivatedRoute,
    private _reg: RegistrarService
  ) {
    this._ruta.params.subscribe(ruta => {
      this.idColab = ruta['id']
    })
   }

  ngOnInit() {
  }

  imagen(fileInput: any){
    this.imgPerfil = <Array<File>>fileInput.target.files[0];

    var reader = new FileReader();
    reader.onload = function() {
      var image:any = document.getElementById('imgColaborador');
      image.src = reader.result
    }
    reader.readAsDataURL(fileInput.target.files[0]);

    this._reg.saveImgPerfil(this.idColab, this.imgPerfil)
  }

}
