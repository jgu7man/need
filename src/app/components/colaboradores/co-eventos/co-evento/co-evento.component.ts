import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CoEventoService } from '../../../../services/colaboradores/coeventos.service';

@Component({
  selector: 'app-co-evento',
  templateUrl: './co-evento.component.html',
  styleUrls: ['./co-evento.component.css']
})
export class CoEventoComponent implements OnInit {

  public idEvento
  public postulado: boolean = true
  constructor(
    public location: Location,
    private _ruta: ActivatedRoute,
    private _coEvento: CoEventoService
  ) {
    this._ruta.params.subscribe(params => {
      this.idEvento = params['id']
    })
   }

  ngOnInit() {
    this.checkPostulacion()
  }

  async checkPostulacion() {
    var user = JSON.parse(localStorage.getItem('needlog'))
    this.postulado = await this._coEvento.checkPostulado(this.idEvento, user.uid)
    console.log(this.postulado);
  }

  onPostular() {
    $('app-postular').fadeToggle()
  }

}
