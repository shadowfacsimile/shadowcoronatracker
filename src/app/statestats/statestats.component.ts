import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RestService } from '../services/rest.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-statestats',
  templateUrl: './statestats.component.html',
  styleUrls: ['./statestats.component.css']
})
export class StatestatsComponent implements OnInit, OnDestroy {

  public coronaStatsSubscription: Subscription;
  public coronaStatsResponse: any;
  public tempCoronaStatsResponse: any;
  public sort: boolean = false;
  public state: string;
  public filterCountry: string;

  constructor(public restService: RestService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.filterCountry = params.country;
    });
  }

  ngOnInit(): void {
    this.coronaStatsSubscription = this.restService.getCoronaStatsResponse().subscribe(data => this.processStatsData(data));
  }

  ngOnDestroy(): void {
    this.coronaStatsSubscription.unsubscribe();
  }

  processStatsData(data: any): void {
    console.log("derp: " + this.filterCountry);
    this.coronaStatsResponse = data['coronaStateStats'].filter(stat => stat.location.country.toLowerCase().indexOf(this.filterCountry.toLowerCase()) >= 0);
    this.tempCoronaStatsResponse = this.coronaStatsResponse;
  }

  searchByState(value: string): void {
    this.coronaStatsResponse = this.tempCoronaStatsResponse;
    this.coronaStatsResponse = this.coronaStatsResponse.filter(stat => stat.location.state.toLowerCase().indexOf(value.toLowerCase()) >= 0);
  }

  sortByState(): void {
    this.sort = !this.sort;
    this.coronaStatsResponse = this.tempCoronaStatsResponse;
    this.coronaStatsResponse = this.coronaStatsResponse.sort((a, b) => this.sortByItem(a.location.state.toLowerCase(), b.location.state.toLowerCase()));
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
