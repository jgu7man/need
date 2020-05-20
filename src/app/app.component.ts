import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {

  public title: string
  public url: string

  constructor (
    private _title: Title,
    private _routing: ActivatedRoute,
    private _route: Router
  ) {
    const appTitle = this._title.getTitle();
    this._route
      .events.pipe(
        filter( event => event instanceof NavigationEnd ),
        map( () => {
          let child = this._routing.firstChild;
          while ( child.firstChild ) {
            child = child.firstChild;
          }
          if ( child.snapshot.data[ 'title' ] ) {
            return child.snapshot.data[ 'title' ];
          }
          return appTitle;
        } )
      ).subscribe( ( ttl: string ) => {
        if ( ttl ) this._title.setTitle( ttl );
      } );
    this.url = window.location.href
   }

}
