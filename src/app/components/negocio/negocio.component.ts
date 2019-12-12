import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NegocioService } from '../../services/directorio/negocio.service';
import { NegocioModel } from '../../models/direcorio/negocio.model';
import { NegocioDatosModel } from 'src/app/models/direcorio/negocio-datos.model';
import { NegocioExtrasModel } from 'src/app/models/direcorio/negocio-extras.model';
declare var $: any;

@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.component.html',
  styleUrls: ['./negocio.component.css']
})
export class NegocioComponent implements OnInit {

  public Usuario: any; //variable de la información del usuario
  public negocioId: string //
  public negocio: NegocioModel;
  public negocioDatos: NegocioDatosModel
  public negocioExtras: NegocioExtrasModel
  public negocioRating: number
  public images: any;
  public rater: boolean;
  public comentario: string;
  constructor(
    private _negocio: NegocioService,
    private href: ActivatedRoute,
    private _ruta: Router,
  ) { 
    this.negocio = new NegocioModel('','','','','',new Date, new Date, '','solicitud')
    this.negocioDatos = new NegocioDatosModel('', '', '', '', '', '', '', '')
    this.negocioExtras = new NegocioExtrasModel('',[],[])
  }

  async ngOnInit() {
    // activa loading
    // this.negocio = false;
    // tomar información del usuario
    this.Usuario = JSON.parse(localStorage.getItem('needlog'))

    // tomar id del negocio
    await this.href.params.subscribe( (params: Params) => {
      return this.negocioId = params.neg
    })
      
      // tomar la información del negocio
    this.negocio = await this._negocio.getNegocio(this.negocioId)
    this.negocioDatos = await this._negocio.getNegocioDatos(this.negocioId)
    this.negocioExtras = await this._negocio.getNegocioExtras(this.negocioId)
      
      setTimeout(()=> {this.content();}, 1000)
  }

  content(){
    if (this.Usuario) {
      // Revisar si el usuario recomienda el negocio
      this._negocio.rater(this.negocioId, this.Usuario.uid).then(
        res => {
          this.rater = res.isRater;
          if(this.rater){
            $("#star").addClass('fas')
          } else {
            $("#star").removeClass('fas')
          }
        }
      )
    }

    // Cuantas recomendaciones tiene el negoioc
    this._negocio.getRating(this.negocioId).then(
      res => {
        this.negocioRating = res;
        
      }
    )
    
    // si no hay imágenes, invita al dueño a ingresar
    if ( this.negocioExtras.images == undefined ){
      $("#slides").css('display', 'none');
      $("#textAdd").css('display', 'inline-block');
    }
  }

  public zoomed: string
  // abre las imágenes
  zoom(zoom){
    this.zoomed = zoom
    $("#zoomdiv").toggle()
  }

  // cierra las imágenes
  closeZoom(){
    $("#zoomdiv").toggle()
  }

  
  async agregarImagenes(fileInput: any){
    $("app-loading").fadeToggle()
    this.images = <Array<File>>fileInput.target.files;
    // sube imágenes
    this.images.forEach(file => {
      this._negocio.subirImagen(this.negocioId, file)
    })
    

    // AJAX: regresa las imágenes
    await this._negocio.getNegocioExtras(this.negocioId).then(
      res => { 
        console.log('se actualizó documento');
        this.negocioExtras = res;
        $("app-loading").fadeToggle()
      }, err=> {console.log(<any>err);}
    )
    
  }

  // ir a editar el negocio
  editNegocio(){
    this._ruta.navigate(['/usuario/edit-negocio/'+this.negocioId])
  }

  // recomendar negocio: true || false
  async rate(){
    if (this.Usuario) {
      var rater = this.Usuario.uid
      var neg = this.negocioId
      $("#star").toggleClass('fas')
      var res = await this._negocio.rate(neg, rater)
      console.log(res);
      this._negocio.getRating(neg).then(
          res  => { this.negocioRating = res });
    } else {
      alert('Necesitas inicar sesión para calificar este negocio')
    }
  }

  async comentar(){
    await this._negocio.comentar(this.negocioId, this.comentario).then(
      res => { console.log(res); });
    setTimeout(()=> {
      this._negocio.getComentarios(this.negocioId).then(
        res => {this.negocioExtras.comentarios = res.comentarios})
    }, 1000);
    await $("#comentario").val('')
  }

  
    
}
