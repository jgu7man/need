import { Component, OnInit, Input } from '@angular/core';
import { CategoriasDirectorioService } from '../../../services/directorio/categorias.service';
import { NegocioService } from '../../../services/directorio/negocio.service';
import { NegocioModel } from '../../../models/directorio/negocio.model';
import { Router, ActivatedRoute } from '@angular/router';
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
    private router: Router,
    private _ruta: ActivatedRoute,
  ) { 
    this.negocio = new NegocioModel('','','','','',new Date, new Date,  new Date, '','','solicitud');
    _ruta.params.subscribe( params => {this.negocioId = params['id']})
  }

  async ngOnInit() {
    $(".formulario").scrollTop(0)
    this.categorias = await this._categorias.getCategorias() //obtiene array de categorias de negocios
    this.Usuario = JSON.parse(localStorage.getItem('needlog')) //obtiene la información del usuario
    this.negocio.idUsuario = this.Usuario.uid //define id de usuario al negocio

    // obtiene los datos del negocio del servicio 
    if (this.negocioId){
      this._negocio.getNegocio(this.negocioId).then(
        res => {
          if(res) this.negocio = res as NegocioModel
        }, 
        err => {console.log(<any>err)}
        );
    }
  }

  

  onSubmit(){
    this.negocio.idUsuario = this.Usuario.userId //Agrega id de usario al que pertenece el negocio
    
    if (this.negocioId){

      this._negocio.updateNegocio(this.negocio).then(
        res => { 
          console.log(res)
          this.negocio.idNegocio = res.idNegocio
          const negId = res.idNegocio
          // redirigir al preview del negocio
          this.router.navigate(['/directorio/suscripcion/datos', negId])
        },
        error => {console.log(<any>error)} )

    }
    else {

      this._negocio.saveNegocio(this.negocio).then(
        res => { this.negocio.idNegocio = res.id 
            const negId = res.id
            
          // redirigir al preview del negocio
          this.router.navigate(['/directorio/suscripcion/datos', negId])
        },
        error => {console.log(<any>error)} )
    }
    
  }

}
