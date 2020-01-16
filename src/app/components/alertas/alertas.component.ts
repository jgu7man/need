import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertaService } from '../../services/alerta.service';

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
    
    this._alerta.alert.subscribe(data => {
        this.alerta = data
        $('app-alertas').fadeToggle()
    })

    this._alerta.options.subscribe(data => {
      this.alerta = data.pregunta
      this.resSi = data.sip
      this.resNo = data.nop
      this.opcion = true
      $('app-alertas').fadeToggle()
    })
  }

  getResponse(res:boolean) {
    this._alerta.getResponse(res)
    this.opcion = false
    $('app-alertas').fadeToggle()
  }

  onClose() {
    $('app-alertas').fadeToggle()
    this.opcion = false
  }

}
