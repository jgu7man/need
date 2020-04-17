import { Component, OnInit, Input } from '@angular/core';
import { CoEventoService } from 'src/app/services/colaboradores/coeventos.service';
import { VacantesModel } from 'src/app/models/colaboradores/vacantes.model';

@Component({
  selector: 'app-ver-vacantes',
  templateUrl: './ver-vacantes.component.html',
  styleUrls: ['./ver-vacantes.component.css']
})
export class VerVacantesComponent implements OnInit {

  public vacantes: VacantesModel
  @Input() idEvento
  public postulado: boolean
  constructor(
    private _coEventos: CoEventoService
  ) {
    this.vacantes = new VacantesModel(0,0,0,0,0,0,0,0)
   }

  async ngOnInit() {
    var user = JSON.parse(localStorage.getItem('needlog'))
    this.postulado = await this._coEventos.checkPostulado(this.idEvento, user.uid)
    console.log(this.postulado);
    if (!this.postulado) {
      this.vacantes = await this._coEventos.getVacantes(this.idEvento) as VacantesModel
    } 
  }

}
