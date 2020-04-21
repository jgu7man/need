import { Component, OnInit } from '@angular/core';
import { DatosCoModel } from 'src/app/models/colaboradores/datosCo.model';
import { ActivatedRoute } from '@angular/router';
import { RegistrarService } from 'src/app/services/colaboradores/registrar.service';
import { ColaboradorService } from '../../../../../services/colaboradores/colaborador.service';

@Component({
  selector: 'app-co-datos',
  templateUrl: './co-datos.component.html',
  styleUrls: ['./co-datos.component.css']
})
export class CoDatosComponent implements OnInit {

  CoDatos: DatosCoModel
  public colabId: string
  constructor(
    private _reg: RegistrarService,
    private _ruta: ActivatedRoute,
    private _colab: ColaboradorService
  ) {
    this.CoDatos = new DatosCoModel('','','','','','','','')
    this._ruta.params.subscribe(params => {
      this.colabId = params['id']
    })
   }

  async ngOnInit() {
    console.log('obtendrá perfil')
    await this._colab.getCoPerfil()
    // this.colab = await this._colab.coPerfil.toPromise()
  }

  onSubmit() {
    this._reg.saveDatosColab(this.colabId, this.CoDatos)
  }

}
