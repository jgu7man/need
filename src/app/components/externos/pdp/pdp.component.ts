import { Component, OnInit } from '@angular/core';
import { PreciosPersonal } from '../../../models/precios.personal';

@Component({
  selector: 'app-pdp',
  templateUrl: './pdp.component.html',
  styleUrls: ['./pdp.component.css']
})
export class PdpComponent implements OnInit {

  public precios = PreciosPersonal
  constructor(
  ) { }

  ngOnInit() {
  }

}
