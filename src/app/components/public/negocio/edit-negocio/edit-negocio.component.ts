import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-negocio',
  templateUrl: './edit-negocio.component.html',
  styleUrls: ['./edit-negocio.component.css']
})
export class EditNegocioComponent implements OnInit {

  public negocioId
  constructor(
    private href: ActivatedRoute
  ) { }

  ngOnInit() {
    this.href.params.subscribe((params: Params)=> {
      this.negocioId = params.neg
    })
  }

}
