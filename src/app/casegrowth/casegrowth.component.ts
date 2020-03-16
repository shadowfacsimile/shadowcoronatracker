import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-casegrowth',
  templateUrl: './casegrowth.component.html',
  styleUrls: ['./casegrowth.component.css']
})
export class CasegrowthComponent implements OnInit {

  coronaStatsResponse;
  
  constructor(private restService: RestService) { }

  ngOnInit() {
    this.restService.getCoronaStatsResponse().subscribe(data =>{
      this.coronaStatsResponse = data['coronaCaseGrowthStats']; 
    });
  }
}
