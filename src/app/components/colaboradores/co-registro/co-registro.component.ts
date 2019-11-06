import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ColaboradorModel } from '../../../models/colaboradores/colaborador.model';
import { RegistrarService } from 'src/app/services/colaboradores/registrar.service';

@Component({
  selector: 'app-co-registro',
  templateUrl: './co-registro.component.html',
  styleUrls: ['./co-registro.component.css']
})
export class CoRegistroComponent implements OnInit {

  public colab: ColaboradorModel
  constructor(
    public location: Location,
    public _reg: RegistrarService
  ) {
    this.colab = new ColaboradorModel('','','','','','','', 'solicitud')
   }

  ngOnInit() {
  }

  onSubmit() {
    this._reg.onRegistrar(this.colab)
  }

}
