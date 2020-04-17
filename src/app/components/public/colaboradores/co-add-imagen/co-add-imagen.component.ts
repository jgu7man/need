import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrarService } from 'src/app/services/colaboradores/registrar.service';

@Component({
  selector: 'app-co-add-imagen',
  templateUrl: './co-add-imagen.component.html',
  styleUrls: ['./co-add-imagen.component.css']
})
export class CoAddImagenComponent implements OnInit {

  public idColab: string
  public imgPerfil
  public imgWidth: number
  public imgHeight: number
  public isNOTEqual: boolean
  public isLoaded: boolean
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

  async imagen(fileInput: any){
    this.imgPerfil = <Array<File>>fileInput.target.files[0];
    
    var reader = new FileReader();
    var image: any = document.getElementById('imgColaborador');
    reader.onload =  function() {
      image.src = reader.result
    }

    image.onload = () => {
      this.imgWidth = image.naturalWidth
      this.imgHeight = image.naturalHeight
      if (this.imgWidth == this.imgHeight) {
        this._reg.saveImgPerfil(this.idColab, this.imgPerfil)
      } else {
        return this.isNOTEqual = true
      }
    }
    reader.readAsDataURL(fileInput.target.files[0]);

  }

}
