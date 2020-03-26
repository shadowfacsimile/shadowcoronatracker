import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit, OnDestroy {

  public coronaSummarySubscription: Subscription;
  public coronaSummaryStatsResponse: any;
  public coronaStatsResponse: any;

  constructor(public restService: RestService) { }

  ngOnInit(): void {
    this.coronaSummarySubscription = this.restService.getCoronaStatsResponse().subscribe(data => this.processSummaryData(data));
  }

  ngOnDestroy(): void {
    this.coronaSummarySubscription.unsubscribe();
  }

  processSummaryData(data: any): void {
    this.coronaSummaryStatsResponse = data['coronaSummaryStats'];
    this.coronaStatsResponse = data['coronaCountryStats'].filter(stat => stat.country === 'India')[0];
  }

}
