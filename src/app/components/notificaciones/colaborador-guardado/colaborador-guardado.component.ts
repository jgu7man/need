import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-colaborador-guardado',
  templateUrl: './colaborador-guardado.component.html',
  styleUrls: ['./colaborador-guardado.component.css']
})
export class ColaboradorGuardadoComponent implements OnInit {

  public idColab
  constructor(
    private ruta: ActivatedRoute
  ) { }

  ngOnInit() {
    this.ruta.params.subscribe(params => {
      this.idColab = params['id']
    })
  }

}
