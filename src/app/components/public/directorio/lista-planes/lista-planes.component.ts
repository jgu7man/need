import { Component, OnInit } from '@angular/core';
import { PlanesService } from 'src/app/services/directorio/planes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-planes',
  templateUrl: './lista-planes.component.html',
  styleUrls: ['./lista-planes.component.css']
})
export class ListaPlanesComponent implements OnInit {

  public planes: any
  constructor(
    private _planes: PlanesService,
    private _ruta: Router
  ) { }

  async ngOnInit() {
    this.planes = await this._planes.getPlanes();
  }

  async contratar(plan: string){
    var loged = JSON.parse(localStorage.getItem('needlog'));
    if (loged == null){
      this._ruta.navigate(['/login/'+plan])
    }else {
    this._ruta.navigate(['/directorio/pagarPlan/'+plan])
    }
  }

}
