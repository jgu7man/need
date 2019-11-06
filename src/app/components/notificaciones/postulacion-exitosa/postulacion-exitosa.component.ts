import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-postulacion-exitosa',
  templateUrl: './postulacion-exitosa.component.html',
  styleUrls: ['./postulacion-exitosa.component.css']
})
export class PostulacionExitosaComponent implements OnInit {

  idEvento: string
  constructor(
    private _ruta: ActivatedRoute
  ) {
    this._ruta.params.subscribe(params => {
      this.idEvento = params['id']
    })
   }

  ngOnInit() {
  }

}
