import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrarService } from 'src/app/services/colaboradores/registrar.service';
import Cropper from 'cropperjs';
import { ColaboradorService } from '../../../../services/colaboradores/colaborador.service';
import { ColaboradorModel } from '../../../../models/colaboradores/colaborador.model';

@Component({
  selector: 'app-co-add-imagen',
  templateUrl: './co-add-imagen.component.html',
  styleUrls: ['./co-add-imagen.component.css']
})
export class CoAddImagenComponent implements OnInit {

  idColab: string
  colab: ColaboradorModel
  @ViewChild( 'coPerfil', { static: false } ) coPerfil: ElementRef;
  
  imgLoaded
  cropper: Cropper
  isLoaded: boolean
  perfilLoaded: boolean 

  /**
   * * INIT ARCHIVOS AGREGADOS
   *   Si el arreglo contiene todos los archivos agregados,
   *   permite continuar
   */
  uploadedFiles: string[] = []

  constructor(
    private _ruta: ActivatedRoute,
    private _reg: RegistrarService,
    private router: Router,
    private _colab: ColaboradorService
  ) {

    // Id del colaborador
    this._ruta.params.subscribe(ruta => {
      this.idColab = ruta[ 'id' ];
    } )

    this.colab = new ColaboradorModel( '', '', '', '', '','/assets/img/co_blank_purple.png','solicitud',false,false)

   }

  async ngOnInit() {
    await this._colab.getCoPerfil()
    this._colab.coPerfil.subscribe( colab => {
      this.colab = colab

      this.colab.imgPerfil ? this.fileUploaded( 'imgPerfil' ) :
        this.colab.imgPerfil = '/assets/img/co_blank_purple.png'
      if ( this.colab.identFront ) this.fileUploaded( 'identFront' )
      if ( this.colab.identBack ) this.fileUploaded( 'identBack' )

    })
  }

  fileUploaded( file: string ) {
    var fileToLoad = this.uploadedFiles.find( string => string === file )
    if ( !fileToLoad ) this.uploadedFiles.push( file );
  }

  async addDocumentImg(fileInput: any, doc: string){
    this.imgLoaded = <Array<File>>fileInput.target.files[0];

    
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
      await waitFor( 1000 )

    
      if ( doc == 'imgPerfil' ) {
        this.perfilLoaded = true
        this.crop()
      } else {
        this._reg.saveImgPerfil( this.idColab, this.imgLoaded, doc )
        this.fileUploaded(doc)
      }
    
      await waitFor( 1000 )
      $( 'app-loading-inset' ).toggle()
    }
  }


  crop() {
    this.cropper = new Cropper( this.coPerfil.nativeElement, {
      aspectRatio: 1,
      dragMode: 'move',
      // viewMode: 3,
      autoCropArea: 1,
      movable: true,
      cropBoxMovable: false,
      crop: () => {
        const canvas = this.cropper.getCroppedCanvas();
        this.imgLoaded = canvas.toDataURL( 'image/jpg' );
      }
    } )
  }
  
  saveImgPerfil() {
    this._reg.saveImgPerfil( this.idColab, this.imgLoaded, 'imgPerfil' );
    this.fileUploaded('imgPerfil')
  }


  next() {
    this.router.navigate(['/colaborador-registrado', this.idColab])
  }
  

}
