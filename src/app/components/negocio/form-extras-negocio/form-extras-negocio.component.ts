import { Component, OnInit } from '@angular/core';
import { NegocioExtrasModel } from 'src/app/models/directorio/negocio-extras.model';

@Component({
  selector: 'app-form-extras-negocio',
  templateUrl: './form-extras-negocio.component.html',
  styleUrls: ['./form-extras-negocio.component.css']
})
export class FormExtrasNegocioComponent implements OnInit {

  public negocioExtras: NegocioExtrasModel
  public image: any
  constructor() {
    this.negocioExtras = new NegocioExtrasModel('',[],[])
   }

  ngOnInit() {
  }

  
  onSubmit() {
    
  }

}
