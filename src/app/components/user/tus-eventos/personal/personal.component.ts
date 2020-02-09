import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PersonalModel } from '../../../../models/evento/personal.model';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from '../../../../services/eventos/evento.service';
import { ExtrasModel } from '../../../../models/evento/extras.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { CoEventoService } from '../../../../services/colaboradores/coeventos.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  @Input() id: any;
  public personal: PersonalModel;
  public extras: ExtrasModel;
  public keys:any;
  public values: any;
  @Output() isPostulado: EventEmitter<any> = new EventEmitter()
  @Output() isOwner: EventEmitter<any> = new EventEmitter()

  constructor(
    private ruta: ActivatedRoute,
    private _evento: EventoService,
    private fs: AngularFirestore,
    private _coEvento: CoEventoService
  ) { 
    this.personal = new PersonalModel('','');
    this.extras = new ExtrasModel(0,0,0,0,0,0)
    
  }

  async ngOnInit() {

    var eventoRef = this.fs.collection('eventos').ref.doc(this.id)
    var infoPeronal = await eventoRef.collection('personal').doc('personal').get()
    const personal = infoPeronal.data()

    this.personal = personal as PersonalModel
    // this.extras = this.personal as ExtrasModel

    this.checkOwner()
    this.checkPostulacion()
  }

  async checkPostulacion() {
    var user = JSON.parse(localStorage.getItem('needlog'))
    var postulado = await this._coEvento.checkPostulado(this.id, user.uid)
    if (postulado){ this.isPostulado.emit(true)}
  }

  async checkOwner() {
    this.ruta.parent.parent.url.subscribe(res => {
      var user = res[res.length -1].path
      if (user != 'colaborador') {
        this.isOwner.emit( false)
      }
    });
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
