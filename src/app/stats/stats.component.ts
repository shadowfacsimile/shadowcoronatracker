import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  coronaStatsResponse;
  tempCoronaStatsResponse;
  country;
  sort = false;

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.restService.getCoronaStatsResponse().subscribe(data => {
      this.coronaStatsResponse = data['coronaCountryStats'];
      this.tempCoronaStatsResponse = this.coronaStatsResponse;
    });
  }

  searchByCountry(value) {
    this.coronaStatsResponse = this.tempCoronaStatsResponse;
    this.coronaStatsResponse = this.coronaStatsResponse.filter(stat => stat.country.toLowerCase().indexOf(value.toLowerCase()) >= 0);
  }

  sortByCountry(value) {
    this.sort = !this.sort;
    this.coronaStatsResponse = this.tempCoronaStatsResponse;
    this.coronaStatsResponse = this.coronaStatsResponse.sort((a, b) => this.sortByItem(a.country.toLowerCase(), b.country.toLowerCase()));
  }

  sortByCases(value) {
    this.sort = !this.sort;
    this.coronaStatsResponse = this.tempCoronaStatsResponse;
    this.coronaStatsResponse = this.coronaStatsResponse.sort((a, b) => this.sortByItem(a.cases, b.cases));
  }

  sortByNewCases(value) {
    this.sort = !this.sort;
    this.coronaStatsResponse = this.tempCoronaStatsResponse;
    this.coronaStatsResponse = this.coronaStatsResponse.sort((a, b) => this.sortByItem(a.casesSinceYesterday, b.casesSinceYesterday));
  }

  sortByDeaths(value) {
    this.sort = !this.sort;
    this.coronaStatsResponse = this.tempCoronaStatsResponse;
    this.coronaStatsResponse = this.coronaStatsResponse.sort((a, b) => this.sortByItem(a.deaths, b.deaths));
  }

  sortByNewDeaths(value) {
    this.sort = !this.sort;
    this.coronaStatsResponse = this.tempCoronaStatsResponse;
    this.coronaStatsResponse = this.coronaStatsResponse.sort((a, b) => this.sortByItem(a.deathsSinceYesterday, b.deathsSinceYesterday));
  }

  sortByMortalityRate(value) {
    this.sort = !this.sort;
    this.coronaStatsResponse = this.tempCoronaStatsResponse;
    this.coronaStatsResponse = this.coronaStatsResponse.sort((a, b) => this.sortByItem(a.mortalityRate, b.mortalityRate));
  }

  sortByRecoveries(value) {
    this.sort = !this.sort;
    this.coronaStatsResponse = this.tempCoronaStatsResponse;
    this.coronaStatsResponse = this.coronaStatsResponse.sort((a, b) => this.sortByItem(a.recoveries, b.recoveries));
  }

  sortByRecoveryRate(value) {
    this.sort = !this.sort;
    this.coronaStatsResponse = this.tempCoronaStatsResponse;
    this.coronaStatsResponse = this.coronaStatsResponse.sort((a, b) => this.sortByItem(a.recoveryRate, b.recoveryRate));
  }

  sortByItem(a, b) {
    if ((this.sort && a < b) || (!this.sort && a > b)) return 1;
    if ((this.sort && a > b) || (!this.sort && a < b)) return -1;
    return 0;
  }

}
