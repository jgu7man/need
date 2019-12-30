import { Component, OnInit, Inject } from '@angular/core';
import { NegocioModel } from 'src/app/models/direcorio/negocio.model';
import { CategoriasDirectorioService } from 'src/app/services/directorio/categorias.service';
import { NegocioService } from 'src/app/services/directorio/negocio.service';


@Component({
  selector: 'app-suscribir',
  templateUrl: './suscribir.component.html',
  styleUrls: ['./suscribir.component.css']
})
export class SuscribirComponent implements OnInit {

  public categorias: any;
  public negocio: NegocioModel;
  public Usuario: any;
  public image: any;
  constructor(
      private _categorias: CategoriasDirectorioService,
      private _negocio: NegocioService,
      
  ) { 
    this.negocio = new NegocioModel('','','','','',new Date, new Date, new Date,'','solicitud');
    
   }

  ngOnInit() {
    
  }

  

  


}
