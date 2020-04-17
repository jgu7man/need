import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoEventoService } from 'src/app/services/colaboradores/coeventos.service';

@Component({
  selector: 'app-ver-equipo',
  templateUrl: './ver-equipo.component.html',
  styleUrls: ['./ver-equipo.component.css']
})
export class VerEquipoComponent implements OnInit {

  @Input() id: string
  @Input() equipo: any
  @Input() estado
  public personal
  public user
  constructor(
    private ruta: ActivatedRoute,
    private _coEvento: CoEventoService,
  ) {
    
   }

  ngOnInit() {

    $(document).ready(function(){
      $('.collapsible').collapsible();
    });

    (function(){
      $('.collapsible').collapsible({
        accordion: true
      });
    });
  }

  



  async rateColaborador(idColaborador, rate) {
    this._coEvento.rateColaborador(idColaborador, this.user.uid, rate)
  }

}
