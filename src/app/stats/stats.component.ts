import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit, OnDestroy {

  public coronaStatsSubscription: Subscription;
  public coronaStatsResponse: any;
  public tempCoronaStatsResponse: any;
  public sort: boolean = false;
  public country: string;

  constructor(public restService: RestService) { }

  ngOnInit(): void {
    this.coronaStatsSubscription = this.restService.getCoronaStatsResponse().subscribe(data => this.processStatsData(data));
  }

  ngOnDestroy(): void {
    this.coronaStatsSubscription.unsubscribe();
  }

  processStatsData(data: any): void {
    this.coronaStatsResponse = data['coronaCountryStats'];
    this.tempCoronaStatsResponse = this.coronaStatsResponse;
  }

  searchByCountry(value: string): void {
    this.coronaStatsResponse = this.tempCoronaStatsResponse;
    this.coronaStatsResponse = this.coronaStatsResponse.filter(stat => stat.country.toLowerCase().indexOf(value.toLowerCase()) >= 0);
  }

  sortByCountry(): void {
    this.sort = !this.sort;
    this.coronaStatsResponse = this.tempCoronaStatsResponse;
    this.coronaStatsResponse = this.coronaStatsResponse.sort((a, b) => this.sortByItem(a.country.toLowerCase(), b.country.toLowerCase()));
  }

  sortByCases(): void {
    this.sort = !this.sort;
    this.coronaStatsResponse = this.tempCoronaStatsResponse;
    this.coronaStatsResponse = this.coronaStatsResponse.sort((a, b) => this.sortByItem(a.cases, b.cases));
  }

  sortByNewCases(): void {
    this.sort = !this.sort;
    this.coronaStatsResponse = this.tempCoronaStatsResponse;
    this.coronaStatsResponse = this.coronaStatsResponse.sort((a, b) => this.sortByItem(a.casesSinceYesterday, b.casesSinceYesterday));
  }

  sortByDeaths(): void {
    this.sort = !this.sort;
    this.coronaStatsResponse = this.tempCoronaStatsResponse;
    this.coronaStatsResponse = this.coronaStatsResponse.sort((a, b) => this.sortByItem(a.deaths, b.deaths));
  }

  sortByNewDeaths(): void {
    this.sort = !this.sort;
    this.coronaStatsResponse = this.tempCoronaStatsResponse;
    this.coronaStatsResponse = this.coronaStatsResponse.sort((a, b) => this.sortByItem(a.deathsSinceYesterday, b.deathsSinceYesterday));
  }

  sortByMortalityRate(): void {
    this.sort = !this.sort;
    this.coronaStatsResponse = this.tempCoronaStatsResponse;
    this.coronaStatsResponse = this.coronaStatsResponse.sort((a, b) => this.sortByItem(a.mortalityRate, b.mortalityRate));
  }

  sortByRecoveries(): void {
    this.sort = !this.sort;
    this.coronaStatsResponse = this.tempCoronaStatsResponse;
    this.coronaStatsResponse = this.coronaStatsResponse.sort((a, b) => this.sortByItem(a.recoveries, b.recoveries));
  }

  sortByRecoveryRate(): void {
    this.sort = !this.sort;
    this.coronaStatsResponse = this.tempCoronaStatsResponse;
    this.coronaStatsResponse = this.coronaStatsResponse.sort((a, b) => this.sortByItem(a.recoveryRate, b.recoveryRate));
  }

  sortByItem(a, b): number {
    if ((this.sort && a < b) || (!this.sort && a > b)) return 1;
    if ((this.sort && a > b) || (!this.sort && a < b)) return -1;
    return 0;
  }

}
