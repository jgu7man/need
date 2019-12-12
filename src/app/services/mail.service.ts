import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(
    private _http: HttpClient
  ) { }

  notificarActivacionNegocio(body): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post('https://us-central1-need-f6bad.cloudfunctions.net/sendMail', body, {headers: headers});
  }
}
