import { Component, OnInit, Input } from '@angular/core';
import { CategoriasDirectorioService } from '../../../services/directorio/categorias.service';
import { NegocioService } from '../../../services/directorio/negocio.service';
import { NegocioModel } from '../../../models/direcorio/negocio.model';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-form-negocio',
  templateUrl: './form-negocio.component.html',
  styleUrls: ['./form-negocio.component.css']
})
export class FormNegocioComponent implements OnInit {

  public categorias: any;
  public negocio: NegocioModel;
  public Usuario: any;
  public image: any;
  @Input() negocioId:any = false; //obtiene el id negocio de la ruta
  constructor(
    private _categorias: CategoriasDirectorioService,
    private _negocio: NegocioService,
    private router: Router
  ) { 
    this.negocio = new NegocioModel('','','','','','','','','','','','','',[],[]);
  }

  ngOnInit() {
    $(".formulario").scrollTop(0)
    this.categorias = this._categorias.getCategorias() //obtiene array de categorias de negocios
    this.Usuario = JSON.parse(localStorage.getItem('needlog')) //obtiene la información del usuario
    this.negocio.idUsuario = this.Usuario.uid //define id de usuario al negocio

    // obtiene los datos del negocio del servicio 
    if (this.negocioId){
      this._negocio.getNegocio(this.negocioId).then(
        res => {
          this.negocio = res.negocio as NegocioModel; 
          console.log(this.negocio);
        }, 
        err => {console.log(<any>err)}
        );
    }
  }

  //FRONTEND: pintar la imagen cargada en el contenedor y seleccionar el archivo a subir
  imagen(fileInput: any){
    this.image = <Array<File>>fileInput.target.files;

    var reader = new FileReader();
    reader.onload = function() {
      var image:any = document.querySelector('#imagenNegocio');
      image.src = reader.result
    }
    reader.readAsDataURL(fileInput.target.files[0]);
  }

  onSubmit(){
    this.negocio.idUsuario = this.Usuario.userId //Agrega id de usario al que pertenece el negocio
    
    if (this.image == undefined && this.negocio.imgPerfil == '') {
      alert('falta agregar una foto de perfil de tu empresa')

    } else if (this.negocioId){

      this._negocio.updateNegocio(this.negocio).then(
        res => { 
          console.log(res)
          this.negocio.idNegocio = res.idNegocio
          const negId = res.idNegocio
            //subir imagen de perfil
          this._negocio.subirImagen(negId, this.image)
          .then((result:any) => { console.log(result)
          })
          // redirigir al preview del negocio
          this.router.navigate(['/usuario/negocio/'+negId])
        },
        error => {console.log(<any>error)} )

    }
    else {

      this._negocio.saveNegocio(this.negocio).then(
        res => { this.negocio.idNegocio = res.id 
            const negId = res.id
            // subir imagen de perfil
            this._negocio.subirImagen(negId, this.image)
          .then((result:any) => { console.log(result)
          })
          // redirigir al preview del negocio
          this.router.navigate(['/usuario/negocio/'+negId])
        },
        error => {console.log(<any>error)} )
    }
    
  }

}
