import { Component, OnInit } from '@angular/core';
import { DocumentacionService } from 'src/app/services/documentacion.service';

@Component({
  selector: 'app-docs-menu',
  templateUrl: './docs-menu.component.html',
  styleUrls: ['./docs-menu.component.css']
})
export class DocsMenuComponent implements OnInit {

  constructor(private _documentacion: DocumentacionService) { }

  public indice

  ngOnInit() {
    this._documentacion.indice$.subscribe( res => this.indice = res)
  }

}
