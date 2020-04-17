import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.css']
})
export class DirectorioComponent implements OnInit {

  public categorias:any;
  constructor(
  ) { }

  ngOnInit() {
  }

  getPage(outlet) {
    return outlet.activatedRouteData['nav'];
  }
  

}
