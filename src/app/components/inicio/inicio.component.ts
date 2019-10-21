import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private _ruta: Router
  ) { }

  ngOnInit() {
    var loged = JSON.parse(localStorage.getItem('login'));
    if (loged != null){
      this._ruta.navigate(['/usuario/perfil'])
    }
  }

  onSubmit(){
    
  }

}
