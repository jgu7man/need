import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PersonalModel } from 'src/app/models/evento/personal.model';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from 'src/app/services/eventos/evento.service';
import { ExtrasModel } from 'src/app/models/evento/extras.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { CoEventoService } from 'src/app/services/colaboradores/coeventos.service';
import { VacantesModel } from '../../../../../models/colaboradores/vacantes.model';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  @Input() id: any;
  public personal: VacantesModel;
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
    this.personal = new VacantesModel(0,0,0,0,0,0,0,0);
    this.extras = new ExtrasModel(0,0,0,0,0,0)
    
  }

  async ngOnInit() {

    var eventoRef = this.fs.collection('eventos').ref.doc(this.id)
    var infoPeronal = await eventoRef.collection('personal').doc('personal').get()
    const personal = infoPeronal.data()

    this.personal = personal as VacantesModel
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
    var userType = this.ruta.snapshot.paramMap.get('userType')
      if (userType != 'colaborador') {
        this.isOwner.emit( false)
      }
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
