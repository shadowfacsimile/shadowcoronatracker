import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  coronaStatsResponse;

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.restService.getCoronaData().subscribe((data) => {
      this.coronaStatsResponse = data['coronaStats'].filter(stat => stat.country === 'India')[0];
    })
  }

}
