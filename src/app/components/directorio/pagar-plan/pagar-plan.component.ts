import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PlanesService } from '../../../services/directorio/planes.service';
declare var $: any;

@Component({
  selector: 'app-pagar-plan',
  templateUrl: './pagar-plan.component.html',
  styleUrls: ['./pagar-plan.component.css']
})
export class PagarPlanComponent implements OnInit {

  public plan: any;
  public planName: string;
  constructor(
    private _url: ActivatedRoute,
    private _ruta: Router,
    private _planes: PlanesService
  ) { }

  ngOnInit() {
    $('#pagarPlan').scrollTop(0)
    this._url.params.subscribe( (params: Params) => {
      this.planName = params.plan;
    })
    this.plan = this._planes.getPlan(this.planName);
  }

}
