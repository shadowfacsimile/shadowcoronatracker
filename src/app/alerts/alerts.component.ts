import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  public alertText: string[] = [];
  public coronaAlertSubscription: Subscription;
  public coronaSummaryStatsResponse: any;
  public coronaStatsResponse: any;
  public index: number;
  public indiaCases: number;
  public indiaDeaths: number;
  public usCases: number;
  public usDeaths: number;
  public ukCases: number;
  public ukDeaths: number;
  public italyCases: number;
  public italyDeaths: number;
  public totalCases: number;
  public totalDeaths: number;
  public showAlerts: boolean;

  constructor(public restService: RestService) { }

  ngOnInit(): void {
    this.showAlerts = false;
    this.coronaAlertSubscription = this.restService.getCoronaStatsResponse().subscribe(data => this.processSummaryData(data));
    interval(5000).subscribe(n => {
      this.index = n % this.alertText.length;
      this.showAlerts = true;
    });
  }

  ngOnDestroy(): void {
    this.coronaAlertSubscription.unsubscribe();
  }

  getDaysIntoLockdown(): number {
    let date1 = new Date("03/24/2020");
    let date2 = new Date();
    let diff = date2.getTime() - date1.getTime();
    return diff / (1000 * 3600 * 24);
  }

  processSummaryData(data: any): void {
    this.coronaSummaryStatsResponse = data['coronaSummaryStats'];
    this.coronaStatsResponse = data['coronaCountryStats'].filter(stat => stat.location.country === 'India')[0];
    this.indiaCases = this.coronaStatsResponse.cases;
    this.indiaDeaths = this.coronaStatsResponse.deaths;
    this.coronaStatsResponse = data['coronaCountryStats'].filter(stat => stat.location.country === 'US')[0];
    this.usCases = this.coronaStatsResponse.cases;
    this.usDeaths = this.coronaStatsResponse.deaths;
    this.coronaStatsResponse = data['coronaCountryStats'].filter(stat => stat.location.country === 'United Kingdom')[0];
    this.ukCases = this.coronaStatsResponse.cases;
    this.ukDeaths = this.coronaStatsResponse.deaths;
    this.coronaStatsResponse = data['coronaCountryStats'].filter(stat => stat.location.country === 'Italy')[0];
    this.italyCases = this.coronaStatsResponse.cases;
    this.italyDeaths = this.coronaStatsResponse.deaths;
    this.alertText.push('Day ' + (Math.floor(this.getDaysIntoLockdown()) + 1) + ' of 21 days lockdown in India');
    this.alertText.push(this.indiaCases.toLocaleString("us-US") + ' cases and ' + this.indiaDeaths.toLocaleString("us-US") + ' deaths in India');
    this.totalCases = this.coronaSummaryStatsResponse.totalCases;
    this.totalDeaths = this.coronaSummaryStatsResponse.totalDeaths;
    this.alertText.push('Data updated once a day around 23:59 (UTC)')
    this.alertText.push("Source: <a href='https://github.com/CSSEGISandData/COVID-19'>Johns Hopkins CSSE github repo</a>");
    this.alertText.push(this.totalCases.toLocaleString("us-US") + ' cases and ' + this.totalDeaths.toLocaleString("us-US") + ' deaths worldwide');
    this.alertText.push(this.usCases.toLocaleString("us-US") + ' cases and ' + this.usDeaths.toLocaleString("us-US") + ' deaths in United States');
    this.alertText.push(this.ukCases.toLocaleString("us-US") + ' cases and ' + this.ukDeaths.toLocaleString("us-US") + ' deaths in United Kingdom');
    this.alertText.push(this.italyCases.toLocaleString("us-US") + ' cases and ' + this.italyDeaths.toLocaleString("us-US") + ' deaths in Italy');    
  }
}
