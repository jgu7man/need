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

  public imgFront
  public imgBack
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

  async imagenPerfil(fileInput: any){
    this.imgPerfil = <Array<File>>fileInput.target.files[0];
    
    var reader = new FileReader();
    var image: any = document.getElementById('imgColaborador');
    reader.onload =  function() {
      image.src = reader.result
    }

    this._reg.saveImgDoc(this.idColab, this.imgPerfil, 'perfil')
    reader.readAsDataURL(fileInput.target.files[0]);

  }

  async imagenFront( fileInput: any ) {
    this.imgFront = <Array<File>> fileInput.target.files[ 0 ];

    var reader = new FileReader();
    var image: any = document.getElementById( 'identFront' );
    reader.onload = function () {
      image.src = reader.result
    }
    
    this._reg.saveImgDoc( this.idColab, this.imgFront, 'identFront' )
    reader.readAsDataURL( fileInput.target.files[ 0 ] );

  }

  async imagenBack( fileInput: any ) {
    this.imgBack = <Array<File>> fileInput.target.files[ 0 ];

    var reader = new FileReader();
    var image: any = document.getElementById( 'identBack' );
    reader.onload = function () {
      image.src = reader.result
    }
    
    this._reg.saveImgDoc( this.idColab, this.imgBack, 'identBack' )
    reader.readAsDataURL( fileInput.target.files[ 0 ] );

  }

}
