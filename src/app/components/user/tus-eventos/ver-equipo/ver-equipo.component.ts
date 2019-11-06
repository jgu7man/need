import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoEventoService } from '../../../../services/colaboradores/coeventos.service';

@Component({
  selector: 'app-ver-equipo',
  templateUrl: './ver-equipo.component.html',
  styleUrls: ['./ver-equipo.component.css']
})
export class VerEquipoComponent implements OnInit {

  public idEvento: string
  public equipo: any[]
  public user
  constructor(
    private ruta: ActivatedRoute,
    private _coEvento: CoEventoService,
  ) {
    this.ruta.parent.url.subscribe( params => {
      this.idEvento = params[params.length -1].path
    })
   }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('needlog'))
    this.getEquipo()
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });
  }

  getEquipo() {
    this._coEvento.getEquipo(this.idEvento, this.user.uid).then(res => {
      this.equipo = res
    })
  }

  trackId(id: number) {
    return id
  }

  async rateColaborador(idColaborador, rate) {
    this._coEvento.rateColaborador(idColaborador, this.user.uid, rate)
    this.getEquipo()
  }

}
