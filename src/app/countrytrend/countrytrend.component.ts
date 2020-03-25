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
  deltas;
  countries;
  country;
  totalCase;
  newCases;
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

  public barGraphGrowthLabels;
  public barGraphGrowthType = 'bar';
  public barGraphGrowthLegend = true;
  public barGraphGrowthData;
  public barGraphGrowthCountryLabels;
  public barGraphGrowthCountryType = 'bar';
  public barGraphGrowthCountryLegend = true;
  public barGraphGrowthCountryData;
  public barGraphGrowthCountryOptions;
  public barGraphGrowthOptions;

  @ViewChild('lineChartGrowthCountryCanvas', { static: false }) lineChartGrowthCountryCanvas: ElementRef;
  public lineGrowthCountryCanvasContext: CanvasRenderingContext2D;

  @ViewChild('lineChartGrowthCanvas', { static: false }) lineChartGrowthCanvas: ElementRef;
  public lineGrowthCanvasContext: CanvasRenderingContext2D;

  @ViewChild('barChartGrowthCountryCanvas', { static: false }) barChartGrowthCountryCanvas: ElementRef;
  public barGrowthCountryCanvasContext: CanvasRenderingContext2D;

  @ViewChild('barChartGrowthCanvas', { static: false }) barChartGrowthCanvas: ElementRef;
  public barGrowthCanvasContext: CanvasRenderingContext2D;

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.trendAllCountries();
  }

  trendSearchByCountry(value) {

    if (this.lineChartGrowthCanvas) {
      this.lineGrowthCanvasContext = (<HTMLCanvasElement>this.lineChartGrowthCanvas.nativeElement).getContext('2d');
    }

    if (this.lineGrowthCountryCanvasContext) {
      this.lineGrowthCountryCanvasContext = (<HTMLCanvasElement>this.lineChartGrowthCountryCanvas.nativeElement).getContext('2d');
    }

    if (this.lineGrowthCanvasContext) {
      this.lineGrowthCanvasContext.clearRect(0, 0, this.lineGrowthCanvasContext.canvas.width, this.lineGrowthCanvasContext.canvas.height);
    }

    if (this.lineGrowthCountryCanvasContext) {
      this.lineGrowthCountryCanvasContext.clearRect(0, 0, this.lineGrowthCountryCanvasContext.canvas.width, this.lineGrowthCountryCanvasContext.canvas.height);
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
        this.deltas = this.countryStat[0].growthStats.map(x => x.delta);
        this.totalCase = this.growths[this.growths.length - 1].toLocaleString("us-US");
        this.newCases = this.deltas[this.deltas.length - 1].toLocaleString("us-US");
        this.lineGraphGrowthCountryLabels = this.dates;
        this.lineGraphGrowthCountryData = [{
          data: this.growths,
          label: 'Cases',
          borderColor: "darkslategrey",
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
            text: value.charAt(0).toUpperCase() + value.slice(1) + ' / Total Cases ' + this.totalCase,
            fontSize: 14,
            fontStyle: 'normal',
            fontColor: 'darkslategrey'
          },
          scales: {
            xAxes: [{
              ticks: {
                display: false
              }
            }]
          }
        };

        this.barGraphGrowthCountryLabels = this.dates;
        this.barGraphGrowthCountryData = [{
          data: this.deltas,
          label: 'Cases',
          borderColor: "#008dc9",
          backgroundColor: "#008dc9",
          fill: false
        }];

        this.barGraphGrowthCountryOptions = {
          scaleShowVerticalLines: false,
          responsive: false,
          responsiveAnimationDuration: 0,
          legend: {
            display: false
          },
          title: {
            display: true,
            text: value.charAt(0).toUpperCase() + value.slice(1) + ' / New Cases ' + this.newCases,
            fontSize: 14,
            fontStyle: 'normal',
            fontColor: 'darkslategrey'
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
      this.deltas = this.coronaStatsResponse.map(x => x.delta);
      this.totalCase = this.growths[this.growths.length - 1].toLocaleString("us-US");
      this.newCases = this.deltas[this.deltas.length - 1].toLocaleString("us-US");

      this.lineGraphGrowthLabels = this.dates;
      this.lineGraphGrowthData = [{
        data: this.growths,
        label: 'Cases',
        borderColor: "darkslategrey",
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
          text: 'All Countries / Total Cases ' + this.totalCase,
          fontSize: 14,
          fontStyle: 'normal',
          fontColor: 'darkslategrey'
        },
        scales: {
          xAxes: [{
            ticks: {
              display: false
            }
          }]
        }
      };

      this.growths = this.coronaStatsResponse.map(x => x.delta);

      this.barGraphGrowthLabels = this.dates;
      this.barGraphGrowthData = [{
        data: this.deltas,
        label: 'Cases',
        borderColor: "#008dc9",
        backgroundColor: "#008dc9",
        fill: false
      }];

      this.barGraphGrowthOptions = {
        scaleShowVerticalLines: false,
        responsive: false,
        responsiveAnimationDuration: 0,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'All Countries / New Cases ' + this.newCases,
          fontSize: 14,
          fontStyle: 'normal',
          fontColor: 'darkslategrey'
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

