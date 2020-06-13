import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  routeType: string
  _routeType: Subject<string> = new Subject()
  constructor () { }
  
  setRouteType( type: 'colaborador' | 'usuario' ) {
    console.log(type);
    this._routeType.next(type)
  }
  
}
