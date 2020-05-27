import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoauthService } from '../../../../services/colaboradores/coauth.service';
import { ColaboradorModel } from '../../../../models/colaboradores/colaborador.model';
import { EventoService } from '../../../../services/eventos/evento.service';
import { EventoModel } from '../../../../models/evento/evento.model';
import { UsuarioService } from '../../../../services/usuarios/usuario.service';
import { DatosModel } from '../../../../models/evento/datosevento.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatCheckboxChange } from '@angular/material';

@Component( {
  selector: 'co-contrato-evento',
  templateUrl: './co-contrato-evento.component.html',
  styleUrls: ['./co-contrato-evento.component.css']
})
export class CoContratoEventoComponent implements OnInit {

  public colaborador: ColaboradorModel
  public idEvento: string
  public evento: EventoModel
  public infoEvento: DatosModel
  public infoPuesto
  public cliente: any
  public puesto: string
  public acept

  constructor (
    private url: ActivatedRoute,
    private fs: AngularFirestore,
    private _coAuth: CoauthService,
    private _evento: EventoService,
    private _usuario: UsuarioService,
    private router: Router
  ) {
    this.idEvento = this.url.snapshot.paramMap.get( 'idEvento' )
    this.puesto = this.url.snapshot.paramMap.get('puesto')
   }

  async ngOnInit() {
    await this.lodaCoInfo()
    await this.getEventoInfo()
    await this.getInfoPuestos()
    await this.setDates()
  }


  lodaCoInfo() {
    this._coAuth.colab$.pipe().subscribe( co => {
      if ( co ) {
        this.colaborador = co
      }
    })
  }

  getEventoInfo() {
    
    this._evento.getOneEvento( this.idEvento ).then( res => { 
      this.evento = res
      this.getClientInfo(res.usuario)
    } );
    
    this._evento.getDatos( this.idEvento ).then( res => {
      this.infoEvento = res as DatosModel
    } )
  }

  async getInfoPuestos() {
    try {
      console.log(this.puesto);
      var infoPuest = await this.fs.collection( 'personal' ).ref.doc( this.puesto ).get()
      this.infoPuesto = infoPuest.data()
      console.log( this.infoPuesto );
    } catch (error) {
      console.error(error);
    }
  }

  getClientInfo(idClient) {
    this.cliente = this._usuario.getUserPerfil(idClient)
  }

  atencion() {
    switch (this.evento.calidad) {
      case 'Optima':
        return 2;
      case 'Regular':
        return 3;
      case 'Deficiente':
        return 4
    }
  }


  iniciaContratoFecha
  iniciaContratoHora
  terminaContratoFecha
  terminaContratoHora
  setDates() {
    const DATEoptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const TIMEoptions = { hour: '2-digit', minute: '2-digit'}
    var Evento = this.evento.fecha,
      dia = Evento.getDate(),
      mes = Evento.getMonth(),
      year = Evento.getFullYear(),
      hora = Evento.getHours(),
      min = Evento.getMinutes(),
      inicia = new Date( year, mes, dia, hora - this.infoPuesto.horas_previas, min ),
      termina = new Date( year, mes, dia, hora + this.infoPuesto.jornada, min )



    this.iniciaContratoFecha = inicia.toLocaleDateString('es-MX', DATEoptions)
    this.iniciaContratoHora = inicia.toLocaleTimeString('es-MX', TIMEoptions)
    this.terminaContratoFecha = termina.toLocaleDateString('es-MX', DATEoptions)
    this.terminaContratoHora = termina.toLocaleTimeString('es-MX', TIMEoptions)
  }


  nextMartes
  getNextMartes() {
    var Evento = this.evento.fecha,
      dia = Evento.getDate() + 1,
      mes = Evento.getMonth(),
      year = Evento.getFullYear(),
      nextMartes
      
      
      do {
        nextMartes = new Date( year, mes, dia + 1 )
        console.log( nextMartes.getDay() == 2 );
        if ( nextMartes.getDay() == 2) {
          this.nextMartes = Evento
        }
      } while(nextMartes == 2)
    
    
    return
  }

  get FullName() {
    return `${ this.colaborador.nombre} ${this.colaborador.apellido_paterno} ${this.colaborador.apellido_materno}`
  }

  onAcept(acept: MatCheckboxChange) {
    this.acept = acept.checked
  }

  onConfirm() {
    this.fs.collection( 'colaboradores' ).ref.doc( this.colaborador.uid )
      .collection( 'eventos' ).doc( this.idEvento ).update( { contrato: this.acept } )
    .then(()=> {this.router.navigate(['/colaborador/tus_eventos'])})
  }

}
