import { Component, OnInit } from '@angular/core';
import { ExpLaboralModel } from 'src/app/models/colaboradores/expLaboral.model';
import { TiempoExp } from 'src/app/models/colaboradores/tiempoExp.model';
import { ActivatedRoute } from '@angular/router';
import { RegistrarService } from 'src/app/services/colaboradores/registrar.service';


@Component({
  selector: 'app-co-exp-laboral',
  templateUrl: './co-exp-laboral.component.html',
  styleUrls: ['./co-exp-laboral.component.css']
})
export class CoExpLaboralComponent implements OnInit {

  public exp: ExpLaboralModel
  public mesero: TiempoExp
  public barman: TiempoExp
  public hostess: TiempoExp
  public seguridad: TiempoExp
  public colabId: string
  
  constructor(
    private _reg: RegistrarService,
    private _ruta: ActivatedRoute
  ) {
    this.mesero = new TiempoExp(0, 0)
    this.barman = new TiempoExp(0, 0)
    this.hostess = new TiempoExp(0, 0)
    this.seguridad = new TiempoExp(0, 0)
    this.exp = new ExpLaboralModel([], '', this.mesero, this.barman, this.hostess, this.seguridad)
   }

  ngOnInit() {
    this._ruta.params.subscribe(params => {
      this.colabId = params['id']
    })
  }

  addLugar(lugar) {
    this.exp.lugares.push(lugar)
  }

  onSubmit() {
    this.exp.mesero = { meses: this.mesero.meses, years: this.mesero.years }
    this.exp.barman = { meses: this.barman.meses, years: this.barman.years }
    this.exp.hostess = { meses: this.hostess.meses, years: this.hostess.years }
    this.exp.seguridad = { meses: this.seguridad.meses, years: this.seguridad.years }
    
    this._reg.saveExpLaboral(this.colabId, this.exp)
  }

  }
