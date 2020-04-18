import { Component, OnInit, Input } from '@angular/core';

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

  delExp (i) {
    this.lugares.splice(i, 1)
  }

}
