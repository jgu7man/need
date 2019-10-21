import { Component, OnInit } from '@angular/core';
import { PersonalModel } from '../../../../models/evento/personal.model';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from '../../../../services/evento.service';
import { ExtrasModel } from '../../../../models/evento/extras.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  public id: any;
  public personal: PersonalModel;
  public extras: ExtrasModel;
  public keys:any;
  public values:any;

  constructor(
    private ruta: ActivatedRoute,
    private _evento: EventoService,
    private fs: AngularFirestore
  ) { 
    this.personal = new PersonalModel('','','',{});
    this.extras = new ExtrasModel(0,0,0,0,0)
    
  }

  async ngOnInit() {
    this.ruta.parent.url.subscribe( params => {
      this.id = params[params.length -1].path
    })

    var eventoRef = this.fs.collection('eventos').ref.doc(this.id)
    var infoPeronal = await eventoRef.collection('info').doc('personal').get()
    const personal = infoPeronal.data()

    this.personal = personal as PersonalModel
    this.extras = this.personal.extras as ExtrasModel
  }

  // getServicio(){
  //   this._evento.getServicioEvento(this.id).subscribe(
  //     res => { this.servicio = res; 
  //       (Object.entries(this.servicio.extras)).forEach(([key, value]) => {
  //         Object.defineProperty(this.extras,key,
  //           {value: value, enumerable: true,configurable: true,writable: true});
  //         })
  //       console.log(this.extras);
  //      },
  //     err => {console.log(<any>err);}
  //   )
  // }

}
