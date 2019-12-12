import { Component, OnInit } from '@angular/core';
import { AdminAlertaService } from '../../../services/admin/admin-alerta.service';

@Component({
  selector: 'app-admin-alerta',
  templateUrl: './admin-alerta.component.html',
  styleUrls: ['./admin-alerta.component.css']
})
export class AdminAlertaComponent implements OnInit {

  public alerta
  constructor(
    private _alerta: AdminAlertaService
  ) { }

  ngOnInit() {
    this._alerta.getAlerta.subscribe(data => {
        this.alerta = data
        console.log(this.alerta);
        $('app-admin-alerta').fadeToggle()
    })
  }

  onClose() {
    $('app-admin-alerta').fadeToggle()
  }

}
