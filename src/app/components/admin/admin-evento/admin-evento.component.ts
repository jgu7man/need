import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-evento',
  templateUrl: './admin-evento.component.html',
  styleUrls: ['./admin-evento.component.css']
})
export class AdminEventoComponent implements OnInit {

  idEvento
  constructor(
    public location: Location,
    private ruta: ActivatedRoute
  ) {
    ruta.params.subscribe(params => {
      this.idEvento = params['id']
    })
   }

  ngOnInit() {
  }

}
