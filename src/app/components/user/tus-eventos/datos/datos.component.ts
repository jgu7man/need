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
  public datos: DatosModel;

  constructor(
    private _evento: EventoService,
    private ruta: ActivatedRoute,
    private fs: AngularFirestore
  ) { 
    this.datos = new DatosModel(new Date,new Date,'','','','','',0,0);
  }

  async ngOnInit() {
    if (!this.id) {
      this.ruta.parent.url.subscribe( params => {
        this.id = params[params.length -1].path
      })
    }

    var eventoRef = this.fs.collection('eventos').ref.doc(this.id)
    var infoDatos = await eventoRef.collection('info').doc('datos').get()
    const datos = infoDatos.data()
    datos.inicia = infoDatos.data().inicia.toDate()
    datos.termina = infoDatos.data().termina.toDate()

    this.datos = datos as DatosModel
  }

  

}
