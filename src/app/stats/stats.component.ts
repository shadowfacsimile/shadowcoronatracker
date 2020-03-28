import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit, OnDestroy {

  public coronaCountriesStatsSubscription: Subscription;
  public coronaCountriesStatsResponse: any;
  public tempCoronaCountriesStatsResponse: any;
  public sort: boolean = false;
  public country: string;

  constructor(public restService: RestService) { }

  ngOnInit(): void {
    this.coronaCountriesStatsSubscription = this.restService.getCoronaCountriesStats().subscribe(data => this.processStatsData(data));
  }

  ngOnDestroy(): void {
    this.coronaCountriesStatsSubscription.unsubscribe();
  }

  processStatsData(data: any): void {
    this.coronaCountriesStatsResponse = data;
    this.tempCoronaCountriesStatsResponse = this.coronaCountriesStatsResponse;
  }

  searchByCountry(value: string): void {
    this.coronaCountriesStatsResponse = this.tempCoronaCountriesStatsResponse;
    this.coronaCountriesStatsResponse = this.coronaCountriesStatsResponse.filter(stat => stat.location.country.toLowerCase().indexOf(value.toLowerCase()) >= 0);
  }

  sortByCountry(): void {
    this.sort = !this.sort;
    this.coronaCountriesStatsResponse = this.tempCoronaCountriesStatsResponse;
    this.coronaCountriesStatsResponse = this.coronaCountriesStatsResponse.sort((a, b) => this.sortByItem(a.location.country.toLowerCase(), b.location.country.toLowerCase()));
  }

  sortByCases(): void {
    this.sort = !this.sort;
    this.coronaCountriesStatsResponse = this.tempCoronaCountriesStatsResponse;
    this.coronaCountriesStatsResponse = this.coronaCountriesStatsResponse.sort((a, b) => this.sortByItem(a.cases, b.cases));
  }

  sortByNewCases(): void {
    this.sort = !this.sort;
    this.coronaCountriesStatsResponse = this.tempCoronaCountriesStatsResponse;
    this.coronaCountriesStatsResponse = this.coronaCountriesStatsResponse.sort((a, b) => this.sortByItem(a.casesSinceYesterday, b.casesSinceYesterday));
  }

  sortByDeaths(): void {
    this.sort = !this.sort;
    this.coronaCountriesStatsResponse = this.tempCoronaCountriesStatsResponse;
    this.coronaCountriesStatsResponse = this.coronaCountriesStatsResponse.sort((a, b) => this.sortByItem(a.deaths, b.deaths));
  }

  sortByNewDeaths(): void {
    this.sort = !this.sort;
    this.coronaCountriesStatsResponse = this.tempCoronaCountriesStatsResponse;
    this.coronaCountriesStatsResponse = this.coronaCountriesStatsResponse.sort((a, b) => this.sortByItem(a.deathsSinceYesterday, b.deathsSinceYesterday));
  }

  sortByMortalityRate(): void {
    this.sort = !this.sort;
    this.coronaCountriesStatsResponse = this.tempCoronaCountriesStatsResponse;
    this.coronaCountriesStatsResponse = this.coronaCountriesStatsResponse.sort((a, b) => this.sortByItem(a.mortalityRate, b.mortalityRate));
  }

  sortByRecoveries(): void {
    this.sort = !this.sort;
    this.coronaCountriesStatsResponse = this.tempCoronaCountriesStatsResponse;
    this.coronaCountriesStatsResponse = this.coronaCountriesStatsResponse.sort((a, b) => this.sortByItem(a.recoveries, b.recoveries));
  }

  sortByRecoveryRate(): void {
    this.sort = !this.sort;
    this.coronaCountriesStatsResponse = this.tempCoronaCountriesStatsResponse;
    this.coronaCountriesStatsResponse = this.coronaCountriesStatsResponse.sort((a, b) => this.sortByItem(a.recoveryRate, b.recoveryRate));
  }

  sortByItem(a, b): number {
    if ((this.sort && a < b) || (!this.sort && a > b)) return 1;
    if ((this.sort && a > b) || (!this.sort && a < b)) return -1;
    return 0;
  }

}
