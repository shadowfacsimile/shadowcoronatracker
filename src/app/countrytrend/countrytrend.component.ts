import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-countrytrend',
  templateUrl: './countrytrend.component.html',
  styleUrls: ['./countrytrend.component.css']
})
export class CountrytrendComponent implements OnInit {

  coronaStatsResponse;
  countryStat;
  dates;
  growths;
  countries;
  country;
  totalCase;
  showCountry = false;
  showTotal = true;

  public lineGraphGrowthLabels;
  public lineGraphGrowthType = 'line';
  public lineGraphGrowthLegend = true;
  public lineGraphGrowthData;
  public lineGraphGrowthCountryLabels;
  public lineGraphGrowthCountryType = 'line';
  public lineGraphGrowthCountryLegend = true;
  public lineGraphGrowthCountryData;
  public lineGraphGrowthCountryOptions;
  public lineGraphGrowthOptions;

  @ViewChild('chartGrowthCountryCanvas', { static: false }) chartGrowthCountryCanvas: ElementRef;
  public growthCountryCanvasContext: CanvasRenderingContext2D;

  @ViewChild('chartGrowthCanvas', { static: false }) chartGrowthCanvas: ElementRef;
  public growthCanvasContext: CanvasRenderingContext2D;

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.trendAllCountries();
  }

  trendSearchByCountry(value) {

    if (this.chartGrowthCanvas) {
      this.growthCanvasContext = (<HTMLCanvasElement>this.chartGrowthCanvas.nativeElement).getContext('2d');
    }

    if (this.growthCountryCanvasContext) {
      this.growthCountryCanvasContext = (<HTMLCanvasElement>this.chartGrowthCountryCanvas.nativeElement).getContext('2d');
    }

    if (this.growthCanvasContext) {
      this.growthCanvasContext.clearRect(0, 0, this.growthCanvasContext.canvas.width, this.growthCanvasContext.canvas.height);
    }

    if (this.growthCountryCanvasContext) {
      this.growthCountryCanvasContext.clearRect(0, 0, this.growthCountryCanvasContext.canvas.width, this.growthCountryCanvasContext.canvas.height);
    }

    if (value.indexOf("All Countries") >= 0) {
      this.showTotal = true;
      this.showCountry = false;
      this.trendAllCountries();
    } else {
      this.restService.getCoronaStatsResponse().subscribe(data => {
        this.coronaStatsResponse = data['coronaCaseGrowthCountryStats'];
        this.countryStat = this.coronaStatsResponse.filter(x => x.country.indexOf(value) >= 0);
        this.dates = this.countryStat[0].growthStats.map(x => this.getFormattedDate(x.date));
        this.growths = this.countryStat[0].growthStats.map(x => x.growth);
        this.totalCase = this.growths[this.growths.length - 1];
        this.lineGraphGrowthCountryLabels = this.dates;
        this.lineGraphGrowthCountryData = [{
          data: this.growths,
          label: 'Cases',
          borderColor: "#5093eb",
          fill: false
        }];

        this.lineGraphGrowthCountryOptions = {
          scaleShowVerticalLines: false,
          responsive: false,
          responsiveAnimationDuration: 0,
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Cases growth trend of ' + value.charAt(0).toUpperCase() + value.slice(1) + ' with total ' + this.totalCase + ' cases reported',
            fontSize: 14,
            fontStyle: 'normal',
            fontColor: '#5093eb'
          },
          scales: {
            xAxes: [{
              ticks: {
                display: false
              }
            }]
          }
        };

        this.showTotal = false;
        this.showCountry = true;
      });
    }
  }

  trendAllCountries() {
    this.restService.getCoronaStatsResponse().subscribe(data => {
      this.coronaStatsResponse = data['coronaCaseGrowthCountryStats'];
      this.countries = this.coronaStatsResponse.map(x => x.country);

      this.coronaStatsResponse = data['coronaCaseGrowthStats'];
      this.dates = this.coronaStatsResponse.map(x => this.getFormattedDate(x.date));
      this.growths = this.coronaStatsResponse.map(x => x.growth);
      this.totalCase = this.growths[this.growths.length - 1];

      this.lineGraphGrowthLabels = this.dates;
      this.lineGraphGrowthData = [{
        data: this.growths,
        label: 'Cases',
        borderColor: "#5093eb",
        fill: false
      }];

    this.lineGraphGrowthOptions = {
      scaleShowVerticalLines: false,
      responsive: false,
      responsiveAnimationDuration: 0,
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Cases growth trend of the world ' + 'with total ' + this.totalCase + ' cases reported',
        fontSize: 14,
        fontStyle: 'normal',
        fontColor: "#5093eb"
      },
      scales: {
        xAxes: [{
          ticks: {
            display: false
          }
        }]
      }
    };    
  });
}

  getFormattedDate(date) {
    var dt = new Date(date);
    var year = dt.getFullYear();
    var month = ("0" + (dt.getMonth() + 1)).slice(-2);
    var day = ("0" + dt.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}

