import { Component, OnInit } from '@angular/core';
import { swipePublicAnimation } from "../../../assets/animations/public.animation";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css'],
  animations: [ swipePublicAnimation ]
})
export class PublicComponent implements OnInit {

  constructor(
    private _ruta: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  getPage(outlet) {
     console.groupCollapsed(outlet.activatedRouteData['nav'])
    return outlet.activatedRouteData['nav'];
  }
}
