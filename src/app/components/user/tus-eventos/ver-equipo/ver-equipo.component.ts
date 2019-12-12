import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoEventoService } from '../../../../services/colaboradores/coeventos.service';

@Component({
  selector: 'app-ver-equipo',
  templateUrl: './ver-equipo.component.html',
  styleUrls: ['./ver-equipo.component.css']
})
export class VerEquipoComponent implements OnInit {

  @Input() id: string
  public equipo: any[]
  public user
  constructor(
    private ruta: ActivatedRoute,
    private _coEvento: CoEventoService,
  ) {
    
   }

  ngOnInit() {
    if (!this.id) {
      this.ruta.parent.url.subscribe( params => {
        this.id = params[params.length - 1].path
      })
    }
    this.user = JSON.parse(localStorage.getItem('needlog'))
    this.getEquipo();

    (function(){
      $('.collapsible').collapsible({
        accordion: false
      });
    });
  }

  getEquipo() {
    this._coEvento.getEquipo(this.id, this.user.uid).then(res => {
      this.equipo = res
      console.log(this.equipo);
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
