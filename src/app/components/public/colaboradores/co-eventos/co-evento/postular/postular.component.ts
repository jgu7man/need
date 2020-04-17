import { Component, OnInit, Input } from '@angular/core';
import { CoEventoService } from 'src/app/services/colaboradores/coeventos.service';
import { Router } from '@angular/router';
import { AlertaService } from 'src/app/services/alerta.service';

@Component({
  selector: 'app-postular',
  templateUrl: './postular.component.html',
  styleUrls: ['./postular.component.css']
})
export class PostularComponent implements OnInit {

  @Input() idEvento
  public vacantes = []
  public puesto
  constructor(
    private _coEventos: CoEventoService,
    private router: Router,
    private _alerta: AlertaService
  ) { 
    this.puesto = ''
  }

  ngOnInit() {
    this._coEventos.getVacantes(this.idEvento).then(res => {
      Object.keys(res).forEach(vacante => {
        if (res[vacante] > 0) {
          this.vacantes.push(vacante)
        }
      })
    })
  }
  
  onClose() {
    $('app-postular').fadeToggle()
  }

  onPostular() {
    var user = JSON.parse(localStorage.getItem('needlog'))
    this._coEventos.postular(this.idEvento, user.uid, this.puesto).then(res => {
      if (res == false) {
        $('app-postular').fadeToggle()
        this._alerta.sendAlertaCont('No te puedes postular por que el horario choca con otro evento que ya tienes programado')
      } else {
        this.router.navigate(['/colaborador/postulacion_exitosa', this.idEvento])
      }
    })
  }

}
