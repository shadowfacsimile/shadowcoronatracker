import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-casegrowth',
  templateUrl: './casegrowth.component.html',
  styleUrls: ['./casegrowth.component.css']
})
export class CasegrowthComponent implements OnInit{

  coronaStatsResponse;
  dates;
  growthFactors;
  growthFactorToday;
  growthFactorYesterday;
  growthFactorWeek;
  growthFactorThreeWeeks;
  growthFactorMonth;

  public lineGraphLabels;
  public lineGraphType = 'line';
  public lineGraphLegend = true;
  
  public lineGraphData;
  
  constructor(private restService: RestService) { }

  ngOnInit() {  
      this.restService.getCoronaStatsResponse().subscribe(data =>
        {
          this.coronaStatsResponse = data['coronaCaseGrowthStats'];          
          this.dates = this.coronaStatsResponse.map(x => this.getFormattedDate(x.date));
          this.growthFactors = this.coronaStatsResponse.map(x => x.growthFactor.toFixed(4));
          this.lineGraphLabels =  this.dates;
          this.growthFactorToday = this.coronaStatsResponse[this.coronaStatsResponse.length - 1];
          this.growthFactorYesterday = this.coronaStatsResponse[this.coronaStatsResponse.length - 2];
          this.growthFactorWeek = this.coronaStatsResponse[this.coronaStatsResponse.length - 8];
          this.growthFactorThreeWeeks = this.coronaStatsResponse[this.coronaStatsResponse.length - 22];
          this.growthFactorMonth = this.coronaStatsResponse[this.coronaStatsResponse.length - 31];
          this.lineGraphData = [{
            data: this.growthFactors, 
            label: 'Growth Factor',            
            borderColor: "#3e95cd",
            fill: false
          }];
    });
  }

  public lineGraphOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    responsiveAnimationDuration: 0,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
              ticks: {
                display: false
            }
        }]
    }
  };

  getFormattedDate(date) {
    var dt = new Date(date);
    var year = dt.getFullYear();
    var month = ("0" + (dt.getMonth() + 1)).slice(-2);
    var day = ("0" + dt.getDate()).slice(-2);
    console.log(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  }
}
