import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CoEventoService, DataPuesto } from '../../../../../../services/colaboradores/coeventos.service';



@Component({
  templateUrl: './des-postular.component.html',
  styleUrls: ['./des-postular.component.css']
})
export class DesPostularComponent implements OnInit {

  public explicacion: string
  constructor (
    private _coEventos: CoEventoService,
    public _dialog: MatDialogRef<DesPostularComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataPuesto
  ) { 
    this.explicacion = ''
  }

  ngOnInit() {
  }

  desPostular() {
    this._coEventos.desPostular(this.data,this.explicacion ).then( res => {
        if ( res ) {
          this._dialog.close()
        } else {
          
      }
    })
  }

}
