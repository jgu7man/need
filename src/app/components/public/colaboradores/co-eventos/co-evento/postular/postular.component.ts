import { Component, OnInit, Input, Inject } from '@angular/core';
import { CoEventoService } from 'src/app/services/colaboradores/coeventos.service';
import { Router } from '@angular/router';
import { AlertaService } from 'src/app/services/alerta.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CoauthService } from '../../../../../../services/colaboradores/coauth.service';
import { ColaboradorModel } from '../../../../../../models/colaboradores/colaborador.model';

@Component({
  selector: 'app-postular',
  templateUrl: './postular.component.html',
  styleUrls: ['./postular.component.css']
})
export class PostularComponent implements OnInit {

  idEvento
  public vacantes = []
  public puesto
  colaborador: ColaboradorModel
  constructor(
    private _coEventos: CoEventoService,
    private router: Router,
    private _alerta: AlertaService,
    private _coAuth: CoauthService,
    public dialogRef: MatDialogRef<PostularComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { 
    this.idEvento = data
    this.puesto = ''
  }

  ngOnInit() {
    this._coAuth.colab$.pipe().subscribe( coo => {
      if (coo) this.colaborador = coo
    })
    this._coEventos.getVacantes( this.idEvento ).then( res => {
      delete res['vacantes_total']
      if (!this.colaborador.capitan) delete res['capitanMeseros']
      Object.keys(res).forEach(vacante => {
        if (res[vacante] > 0) {
          this.vacantes.push(vacante)
        }
      })
    })
  }
  
  onClose() {
    this.dialogRef.close()
  }

  onPostular() {
    this._coEventos.postular(this.idEvento, this.colaborador.uid, this.puesto).then(res => {
      if (res == false) {
        $('app-postular').fadeToggle()
        this._alerta.sendAlertaCont('No te puedes postular por que el horario choca con otro evento que ya tienes programado')
      } else {
        this.dialogRef.close()
        this.router.navigate( [ '/colaborador/contrato_evento', {
          idEvento: this.idEvento,
          idUsuario: this.colaborador.uid,
          puesto: this.puesto
        } ] )
      }
    })
  }

}
