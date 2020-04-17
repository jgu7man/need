import { Component, OnInit } from '@angular/core';
import { PersonalModel } from 'src/app/models/evento/personal.model';
import { ListaDePrecios } from 'src/app/models/finanzas/precios.personal';
import { EventoModel } from 'src/app/models/evento/evento.model';
import { ExtrasModel } from 'src/app/models/evento/extras.model';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-heroform',
  templateUrl: './heroform.component.html',
  styleUrls: ['./heroform.component.css']
})

export class HeroformComponent implements OnInit  {
  
  public personal: PersonalModel;
  public evento: EventoModel
  public extrasArray: any;
  public extras: any
  public extra: string
  public puestos: any[]

  constructor( 
    private Router: Router,
    private fs: AngularFirestore,
  ) { 
    this.personal = new PersonalModel( 0, 0);
    this.evento = new EventoModel('', '',0, 0, 1, false, 'normal', 'pendiente', 'espera', 'espera', new Date, '', '', 0);
    this.extrasArray = []
    this.extras = {}
  }
  
  ngOnInit() {
    this.getPuestos()
  }

  async getPuestos() {
    const colRef = this.fs.collection('personal').ref
    const colRes = await colRef.get()
    var puestos = []
    colRes.forEach(puesto => {
      if (puesto.id != 'mesero' && puesto.id != 'capitanMesero') {
        puestos.push({
          id: puesto.id,
          nombre: puesto.data().nombre,
          precio: puesto.data().precio
        })
      }
    })
    this.puestos = puestos
  }

  addExtras() {
    if (!this.extrasArray.includes(this.extra)) {
      this.extrasArray.push(this.extra)
    }
    this.extra = ''
  }

  delExtra(i) {
    this.extrasArray.splice(i)
  }
  
  public popup() {
    $(".popup").slideToggle();
  }

  calcular() {
    var tipo:number = +this.evento.tipoEvento;
    var calidad:number = +this.evento.calidad;
    var cant:number = this.evento.personas;
    var cantidad:number;
    
    if(tipo < 4) {
      switch(calidad) {
        case 1: 
        cantidad = cant/20;
        break;
        case 2: 
        cantidad = cant/30;
        break;
        case 3: 
        cantidad = cant/40;
        break;
        default: "none";
      }
      var jefe = cant/200;
  
    }else if(tipo > 3) {
        switch(calidad) {
          case 1: 
          cantidad = cant/30;
          break;
          case 2: 
          cantidad = cant/40;
          break;
          case 3: 
          cantidad = cant/50;
          break;
          default: "none;"
        }
        var jefe = 0;
      }else { };

    var m = Math.ceil(cantidad);
    this.personal.meseros = m;
    
    var j = Math.ceil(jefe);
    this.personal.capitanMeseros = j;

    this.evento.tipoEvento = tipo;
    this.evento.calidad = calidad;
    
  }

  calcular2() {

    var tipo:number = +this.evento.tipoEvento;
    var calidad:number = +this.evento.calidad;
    var cant:number = this.evento.personas;
    var cantidad:number;

    
      switch(calidad) {
        case 2: 
        cantidad = cant/20;
        break;
        case 3: 
        cantidad = cant/30;
        break;
        case 4: 
        cantidad = cant/40;
        break;
        case 5: 
        cantidad = cant/50;
        break;
        default: "none;"
      }

    var m = Math.ceil(cantidad);
    this.personal.meseros = m;
    this.personal.capitanMeseros = +this.personal.capitanMeseros;

    this.evento.tipoEvento = tipo;
    this.evento.calidad = calidad;
    
    
  }

  string(){
    // STRING TIPO DE EVENTO
    if ( this.evento.tipoEvento === 1 ) {
      this.evento.tipoEvento = 'Boda';
    } else if ( this.evento.tipoEvento === 2 ) {
      this.evento.tipoEvento = 'XV años';
    } else if ( this.evento.tipoEvento === 3 ) {
      this.evento.tipoEvento = 'Graduación';
    } else if ( this.evento.tipoEvento === 4 ) {
      this.evento.tipoEvento = 'Cumpleaños';
    } else if ( this.evento.tipoEvento === 5 ) {
      this.evento.tipoEvento = 'Convivio';
    } else if ( this.evento.tipoEvento === 6 ) {
      this.evento.tipoEvento = 'Posada';
    } else {
      this.evento.tipoEvento = 'Otro tipo';
    }

    // STRING CALIDAD
    if ( this.evento.calidad === 1 ) {
      this.evento.calidad = 'Óptima';
    } else if ( this.evento.calidad === 2 ) {
      this.evento.calidad = 'Regular';
    } else if ( this.evento.calidad === 3 ) {
      this.evento.calidad = 'Deficiente';
    } else {
      // do nothing
    }

  }

  

  


  onSubmit() {
    this.string();
    if(this.evento.tipoEvento == 7 ) {
      this.calcular2();
    }

    // this.extrasArray.forEach(ext => {
    //   Object.defineProperty(this.extras, ext, {
    //     value: 0, enumerable: true, configurable: true, writable: true
    //   })
    // })

    var id:any = new Date();
    var idEvento:any = +id.getTime();
    this.evento.id = idEvento;

    sessionStorage.setItem(idEvento+'personal', JSON.stringify(this.personal));
    sessionStorage.setItem(idEvento+'evento', JSON.stringify(this.evento));
    sessionStorage.setItem(idEvento+'extras', JSON.stringify(this.extrasArray));
    this.Router.navigate(['/cotizacion/'+idEvento]);
    // window.location.href = "/cotizacion/"+idEvento; 

  }
}
