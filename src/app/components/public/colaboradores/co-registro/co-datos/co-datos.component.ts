import { Component, OnInit } from '@angular/core';
import { DatosCoModel } from 'src/app/models/colaboradores/datosCo.model';
import { ActivatedRoute } from '@angular/router';
import { RegistrarService } from 'src/app/services/colaboradores/registrar.service';
import { FormDatosServices } from '../../../../../services/admin/forms.service';


@Component({
  selector: 'app-co-datos',
  templateUrl: './co-datos.component.html',
  styleUrls: ['./co-datos.component.css']
})
export class CoDatosComponent implements OnInit {

  CoDatos: DatosCoModel
  public colabId: string
  
  public customPatterns = {
    '0': {
      pattern: new RegExp( '\[0-9\]' ),
      optional: true
    }
  };  

  constructor(
    private _reg: RegistrarService,
    private _ruta: ActivatedRoute,
    public _formDatos: FormDatosServices
  ) {
    this.CoDatos = new DatosCoModel('','','','','','México','','')
    this._ruta.params.subscribe(params => {
      this.colabId = params['id']
    })
   }

  ngOnInit() {
  }

  onSubmit() {
    this._reg.saveDatosColab(this.colabId, this.CoDatos)
  }

}
