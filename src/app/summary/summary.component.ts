import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  coronaStatsResponse;

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.restService.getCoronaStatsResponse().subscribe(data => {
      this.coronaStatsResponse = data['coronaSummaryStats'];
    });
  }

}
