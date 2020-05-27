import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CoEventoService } from 'src/app/services/colaboradores/coeventos.service';
import { PostularComponent } from './postular/postular.component';
import { DesPostularComponent } from './des-postular/des-postular.component';
import { DataPuesto } from '../../../../../services/colaboradores/coeventos.service';
import { ColaboradorModel } from '../../../../../models/colaboradores/colaborador.model';
import { CoauthService } from '../../../../../services/colaboradores/coauth.service';


@Component({
  selector: 'app-co-evento',
  templateUrl: './co-evento.component.html',
  styleUrls: ['./co-evento.component.css']
})
export class CoEventoComponent implements OnInit {

  public idEvento
  public postulado: boolean = false
  public puesto
  public encargado
  public colaborador: ColaboradorModel
  public onWork: boolean = false
  constructor(
    public location: Location,
    private router: Router,
    private _ruta: ActivatedRoute,
    private _coEvento: CoEventoService,
    private _dialog: MatDialog,
    private _coAuth: CoauthService
  ) {
    this._ruta.params.subscribe(params => {
      this.idEvento = params['id']
    })
   }

  ngOnInit() {
    this.checkPostulacion()
  }

  async checkPostulacion() {
    this._coAuth.colab$.pipe().subscribe( async coo => {
      if(coo) this.colaborador = coo
      var check = await this._coEvento.checkPostulado( this.idEvento, this.colaborador.uid )
      this.postulado = check.postulado
      if ( check.postulado ) {
        this.puesto = check.puesto
        if ( check.encargado) this.encargado = check.encargado
      }
      
      console.log(this.postulado);
    })
  }

  onPostular() {
    this._dialog.open( PostularComponent, {
      minWidth: '350px',
      data:this.idEvento
    })
    // $('app-postular').fadeToggle()
  }

  desPostular() {
    var dataPuesto: DataPuesto = {
      puesto: this.puesto,
      idEvento: this.idEvento,
      idColaborador: this.colaborador.uid
    }
    var dialogRef = this._dialog.open( DesPostularComponent, {
      minWidth: '350px',
      data: dataPuesto
    } )
    dialogRef.afterClosed().subscribe( () => {
      this.router.navigateByUrl( '/' ).then( () => {
        this.router.navigate(['/colaborador/evento', this.idEvento])
      })
    })
  }

  

}
