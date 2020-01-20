import { Component, OnInit, Input } from '@angular/core';
import { DatosModel } from '../../../../models/evento/datosevento.model';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from '../../../../services/evento.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  @Input() id: any;
  @Input() datos: DatosModel;

  constructor(
    private _evento: EventoService,
    private ruta: ActivatedRoute,
    private fs: AngularFirestore
  ) { 
    this.datos = new DatosModel(new Date,new Date,'','','','','',0,0);
  }

  async ngOnInit() {
    
  }

  

}
