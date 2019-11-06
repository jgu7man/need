import { Component, OnInit} from '@angular/core';
import { EventoModel } from '../../../../models/evento/evento.model';
import { DatosModel } from '../../../../models/evento/datosevento.model';
import { PersonalModel } from '../../../../models/evento/personal.model';
import { ActivatedRoute } from '@angular/router';
declare var $;

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  public idEvento: any;
  public evento: EventoModel;
  public datos: DatosModel;
  public servicio: PersonalModel;


  constructor(
    private _ruta: ActivatedRoute
   ) { 
    this._ruta.params.subscribe(params => {
      this.idEvento = params['id']
    })
  }
  
  ngOnInit() {
    
  }

  

}
