import { Component, OnInit } from '@angular/core';
import { EventoModel } from '../../../../models/evento/evento.model';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  public id: any;
  public evento: EventoModel
  constructor( 
    private fs: AngularFirestore,
    private ruta: ActivatedRoute,
    ) {
    this.evento = new EventoModel('','','','','','','',new Date);
    
   }

  async ngOnInit() {
    this.ruta.parent.url.subscribe( params => {
      this.id = params[params.length -1].path
    })
    
    var eventoRef = this.fs.collection('eventos').ref.doc(this.id)
    var evento = await eventoRef.get()
    const detalles = evento.data()
    detalles.fecha = evento.data().fecha.toDate()
    
    this.evento = detalles as EventoModel
  }

}
