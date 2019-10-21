import { Component, OnInit} from '@angular/core';
import { EventoModel } from '../../../../models/evento/evento.model';
import { DatosModel } from '../../../../models/evento/datosevento.model';
import { PersonalModel } from '../../../../models/evento/personal.model';
declare var $;

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  public id: any;
  public evento: EventoModel;
  public datos: DatosModel;
  public servicio: PersonalModel;


  constructor( ) { 
    
  }
  
  ngOnInit() {
    
  }

  

}
