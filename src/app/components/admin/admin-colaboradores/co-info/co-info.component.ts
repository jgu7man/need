import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ItemExpLaboral } from '../../../../models/colaboradores/item.expLaboral.model';

@Component({
  selector: 'app-co-info',
  templateUrl: './co-info.component.html',
  styleUrls: ['./co-info.component.css']
})
export class CoInfoComponent implements OnInit {

  public coId
  public co
  public datos
  public exp_laboral
  public experiencia = []
  public empleos: ItemExpLaboral[] = []
  public ratingPositivo: number = 0
  public ratingNegativo: number = 0
  public comentarios = []
  public eventosCant
  public eventos = []
  constructor(
    private ruta: ActivatedRoute,
    private fs: AngularFirestore
  ) {
    ruta.params.subscribe(params => {
      this.coId = params['id']
    })
   }

  async ngOnInit() {
    const userRef = this.fs.collection('colaboradores').ref.doc(this.coId)
    var coDoc = await userRef.get()
    var datosDoc = await userRef.collection('info').doc('datos').get()
    var expLaboralDoc = await userRef.collection('info').doc('exp_laboral').get()
    var ratingCol = await userRef.collection('ratings').get()
    var eventosCol = await userRef.collection('eventos').orderBy('inicia', 'asc').get()
    
    this.co = coDoc.data()
    this.datos = datosDoc.data()
    this.exp_laboral = expLaboralDoc.data()
    this.sortExp()

    ratingCol.forEach(rate => {
      console.log(rate.data());
      this.comentarios.push({ uid: rate.id, coment: rate.data().comentario })
      console.log(rate.data().rate);
      if (rate.data().rate == 'positivo') { this.ratingPositivo++ }
      else { this.ratingNegativo++ }
    })

    this.eventosCant = eventosCol.size
    eventosCol.forEach(evento => {
      console.log(evento.data());
      this.eventos.push({eid: evento.id, fecha: evento.data().inicia.toDate()})
    })
  }

  sortExp() {
    if (this.exp_laboral.jefeMeseros) { this.experiencia.push({name:'Jefe de meseros', exp:this.exp_laboral.jefeMeseros}) }
    if (this.exp_laboral.mesero) { this.experiencia.push({name:'Mesero', exp: this.exp_laboral.mesero}) }
    if (this.exp_laboral.barman) { this.experiencia.push({name:'Barman', exp:this.exp_laboral.barman}) }
    if (this.exp_laboral.hostess) { this.experiencia.push({name:'Hostess', exp:this.exp_laboral.hostess}) }
    if (this.exp_laboral.valet) { this.experiencia.push({name:'Valet parking', exp:this.exp_laboral.valet}) }
    if (this.exp_laboral.seguridad) { this.experiencia.push({name:'Personal de seguridad', exp:this.exp_laboral.seguridad}) }
  }

  setLugares() {
    this.empleos = this.exp_laboral.lugares
    
  }

  onChangeEstado(id: string, estado) {
    console.log(estado);
    this.fs.collection('colaboradores').ref.doc(id)
      .update({ estado: estado})
  }

  onChangeCapitan() {
    const coRef = this.fs.collection('colaboradores').ref.doc(this.coId)
    if (this.co.capitan) {
      this.co.capitan = !this.co.capitan
      coRef.update({ capitan: this.co.capitan })
    } else {
      this.co.capitan = true
      coRef.update({ capitan: true })
    }
  }

  public estados = [
    'pendiente',
    'activo',
    'inactivo'
  ]

}
