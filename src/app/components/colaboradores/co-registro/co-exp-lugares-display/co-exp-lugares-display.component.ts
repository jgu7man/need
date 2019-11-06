import { Component, OnInit, Input } from '@angular/core';
import { ItemExpLaboral } from '../../../../models/colaboradores/item.expLaboral.model';
import { ExpLaboralModel } from '../../../../models/colaboradores/expLaboral.model';

@Component({
  selector: 'app-co-exp-lugares-display',
  templateUrl: './co-exp-lugares-display.component.html',
  styleUrls: ['./co-exp-lugares-display.component.css']
})
export class CoExpLugaresDisplayComponent implements OnInit {

  @Input() lugares = []
  constructor() {
    
   }

  ngOnInit() {
  }

}
