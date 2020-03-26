import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  coronaSummaryStatsResponse;
  coronaStatsResponse;
  countries;

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.restService.getCoronaStatsResponse().subscribe(data => {
      this.coronaSummaryStatsResponse = data['coronaSummaryStats'];
      this.countries = data['coronaCountryStats'].filter(stat => stat.country !== "Cruise Ship").map(stat => stat.country.replace(",", " ")).filter(this.onlyUnique).length;
      this.coronaStatsResponse = data['coronaCountryStats'].filter(stat => stat.country === 'India')[0];
    });
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

}
