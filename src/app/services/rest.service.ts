import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    //'Access-Control-Allow-Origin': '*'
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class RestService {

  coronaStatsResponse: Observable<any>;

  constructor(private http: HttpClient) {
    this.getCoronaStatsResponse();
  }

  getCoronaStatsResponse() {
    if (!this.coronaStatsResponse) {
      this.coronaStatsResponse = this.http.get(environment.apiUrl, httpOptions);
      return this.coronaStatsResponse;
    }
    return this.coronaStatsResponse;
  }
}
