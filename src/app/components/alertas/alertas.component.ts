import { Component, OnInit } from '@angular/core';
import { AlertaService } from '../../services/alerta.service';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {

  public alerta
  constructor(
    private _alerta: AlertaService
  ) { }

  ngOnInit() {
    this._alerta.getAlerta.subscribe(data => {
        this.alerta = data
        console.log(this.alerta);
        $('app-alertas').fadeToggle()
    })
  }

  onClose() {
    $('app-alertas').fadeToggle()
  }

}
