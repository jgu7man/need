import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar/navbar.service';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css']
}) 
export class ColaboradoresComponent implements OnInit {

  constructor(private navbar: NavbarService) { }

  ngOnInit() {
    this.navbar.setRouteType('colaborador')
  }

}
  
