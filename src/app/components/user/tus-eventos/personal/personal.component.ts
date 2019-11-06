import { Component, OnInit, Input } from '@angular/core';
import { PersonalModel } from '../../../../models/evento/personal.model';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from '../../../../services/evento.service';
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
  public postulado: boolean = false
  public owner: boolean = false

  constructor(
    private ruta: ActivatedRoute,
    private _evento: EventoService,
    private fs: AngularFirestore,
    private _coEvento: CoEventoService
  ) { 
    this.personal = new PersonalModel('','','',{});
    this.extras = new ExtrasModel(0,0,0,0,0)
    
  }

  async ngOnInit() {
    if (!this.id) {
      this.ruta.parent.url.subscribe( params => {
        this.id = params[params.length -1].path
      })
    }

    var eventoRef = this.fs.collection('eventos').ref.doc(this.id)
    var infoPeronal = await eventoRef.collection('info').doc('personal').get()
    const personal = infoPeronal.data()

    this.personal = personal as PersonalModel
    this.extras = this.personal.extras as ExtrasModel

    this.checkOwner()
    this.checkPostulacion()
  }

  async checkPostulacion() {
    var user = JSON.parse(localStorage.getItem('needlog'))
    this.postulado = await this._coEvento.checkPostulado(this.id, user.uid)
  }

  async checkOwner() {
    this.ruta.parent.parent.url.subscribe(res => {
      var user = res[res.length -1].path
      if (user == 'colaborador') {
        this.owner = false
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
