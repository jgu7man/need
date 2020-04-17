import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertaService } from 'src/app/services/alerta.service';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {

  public alerta
  public opcion
  public resSi
  public resNo
  
  constructor(
    private _alerta: AlertaService
  ) { }

  ngOnInit() {
    
    this._alerta.alertMsg$.subscribe(msg => {
        this.alerta = msg
        $('app-alertas').fadeToggle()
    })

    this._alerta.alertAsk$.subscribe(ask => {
      this.alerta = ask
      this.opcion = true
      $('app-alertas').fadeToggle()
    })

  }

  getResponse(res:any) {
    this._alerta.responseAlert$.next(res)
    this.opcion = false
    $('app-alertas').fadeToggle()
  }

  onClose() {
    $('app-alertas').fadeToggle()
    this.opcion = false
  }

}
