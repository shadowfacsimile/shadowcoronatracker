import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    //'Access-Control-Allow-Origin': '*'
    'Content-Type':  'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  getCoronaData(): Observable<any> {
    return this.http.get<any>(`https://shadowcoronatracker-api.eu-gb.mybluemix.net/ShadowCoronaTracker/api/fetchstats`, httpOptions);
  }
}
