import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
}

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  public getCoronaData(){
    return this.http.get(`https://shadowcoronatracker-api.eu-gb.mybluemix.net/ShadowCoronaTracker/api/fetchstats`, httpOptions);
  }
}
