import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  coronaStatsResponse;
  countries;

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.restService.getCoronaStatsResponse().subscribe(data => {
      this.countries = data['coronaStats'].filter(stat => stat.country !== "Cruise Ship").map(stat => stat.country.replace(",", " ")).filter(this.onlyUnique).length;
      this.coronaStatsResponse = data['coronaStats'].filter(stat => stat.country === 'India')[0];
    });
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

}
