import { Component, OnInit, Input } from '@angular/core';
import { DatosModel } from 'src/app/models/evento/datosevento.model';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from 'src/app/services/eventos/evento.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  id: any;
  datos: DatosModel;

  constructor(
    private _evento: EventoService,
    private ruta: ActivatedRoute,
    private fs: AngularFirestore
  ) { 
    this.datos = new DatosModel(new Date,new Date,'','','','','',0,0);
  }

  async ngOnInit() {
    this.id = this.ruta.snapshot.params.id
    this.datos = await this._evento.getDatos(this.id)
  }

  

}
