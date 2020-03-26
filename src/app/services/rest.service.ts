import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class RestService {

  public coronaStatsResponse: Observable<any>;

  constructor(public http: HttpClient) { }

  getCoronaStatsResponse(): any {
    if (!this.coronaStatsResponse) {
      this.coronaStatsResponse = this.http.get(environment.apiUrl, httpOptions);
      return this.coronaStatsResponse;
    }
    return this.coronaStatsResponse;
  }
}
