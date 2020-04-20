import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrarService } from 'src/app/services/colaboradores/registrar.service';
import Cropper from 'cropperjs';

@Component({
  selector: 'app-co-add-imagen',
  templateUrl: './co-add-imagen.component.html',
  styleUrls: ['./co-add-imagen.component.css']
})
export class CoAddImagenComponent implements OnInit {

  public idColab: string
  @ViewChild( 'coPerfil', { static: false } ) coPerfil: ElementRef;
  
  public imgLoaded
  public cropper: Cropper
  
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

  async addDocumentImg(fileInput: any, doc: string){
    this.imgLoaded = <Array<File>>fileInput.target.files[0];

    console.log( doc, fileInput.target.files[ 0 ] )
    
    if ( this.imgLoaded.size > 2000000 ) {
      alert( 'La imagen supera el límite de peso permitido, intenta con otra imagen' )
    } else {
    
      var reader = new FileReader();
      var image: any = document.getElementById( doc );
      reader.onload = function () {
        image.src = reader.result
      }
      reader.readAsDataURL( fileInput.target.files[ 0 ] );
      $( 'app-loading-inset' ).toggle()
      var waitFor = ( ms ) => new Promise( r => setTimeout( r, ms ) );
      await waitFor( 100 )

    
      if ( doc == 'perfil' ) {
        this.crop()
      }
    
      await waitFor( 5000 )
      $( 'app-loading-inset' ).toggle()
    }
  }


  crop() {
    this.cropper = new Cropper( this.coPerfil.nativeElement, {
      aspectRatio: 1,
      dragMode: 'none',
      viewMode: 3,
      autoCropArea: 1,
      movable: true,
      cropBoxMovable: false,
      // crop: () => {
      //   const canvas = this.cropper.getCroppedCanvas();
      //   this.imgLoaded = canvas.toDataURL( 'image/jpg' );
      // }
    } )
  }
  
  saveImgPerfil() {
    this._reg.saveImgPerfil(this.idColab, this.imgLoaded)
  }
  

}
