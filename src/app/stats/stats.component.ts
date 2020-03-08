import { Component, OnInit } from '@angular/core';
import { RestService } from './rest.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  coronaStatsResponse;

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.restService.getCoronaData().subscribe((data) => {
      this.coronaStatsResponse = data;
    })
  }

}
