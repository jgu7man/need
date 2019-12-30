import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PlanesService } from '../../../services/directorio/planes.service';
import { NegocioService } from '../../../services/directorio/negocio.service';
declare var $: any;

@Component({
  selector: 'app-pagar-plan',
  templateUrl: './pagar-plan.component.html',
  styleUrls: ['./pagar-plan.component.css']
})
export class PagarPlanComponent implements OnInit {

  public plan: any;
  public planName: string;
  public costo: number
  constructor(
    private _url: ActivatedRoute,
    private router: Router,
    private _planes: PlanesService,
    private _negocios: NegocioService
  ) { }

  async ngOnInit() {
    $('#pagarPlan').scrollTop(0)
    this._url.params.subscribe( (params: Params) => {
      this.planName = params.plan;
    })
    this.plan = await this._planes.getPlan(this.planName);
    
  }

  sendSolicitud() {
    var user = JSON.parse(localStorage.getItem('needlog'))
    this._negocios.setSolicitud(user.uid, user.email).then(res => {
      this.router.navigate(['/usuario'])
    })
  }

}
