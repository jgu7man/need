import { Component, OnInit } from '@angular/core';
import { HelpMessageModel } from 'src/app/models/help-message.model';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent implements OnInit {

  public contacto: HelpMessageModel
  constructor(
    public _contacto: ContactoService
  ) {
    this.contacto = new HelpMessageModel('','','','','', new Date())
   }

  ngOnInit() {
  }

  
}
