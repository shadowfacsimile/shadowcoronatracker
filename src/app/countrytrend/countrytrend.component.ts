import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-countrytrend',
  templateUrl: './countrytrend.component.html',
  styleUrls: ['./countrytrend.component.css']
})
export class CountrytrendComponent implements OnInit, OnDestroy {

  public coronaCasesGrowthStatsSubscription: Subscription;
  public coronaCasesGrowthCountriesStatsSubscription: Subscription;
  public coronaCasesGrowthStatsResponse: any;
  public coronaCasesGrowthCountriesStatsResponse: any;
  public countryStat: any;
  public dates: any;
  public growths: any;
  public deltas: any;
  public countries: any;
  public country: any;
  public totalCases: any;
  public newCases: any;
  public showCountry: boolean = false;
  public showTotal: boolean = true;

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

  constructor(public restService: RestService) { }

  ngOnInit(): void {
    this.trendAllCountries();
  }

  ngOnDestroy(): void {
    this.coronaCasesGrowthStatsSubscription.unsubscribe();
    this.coronaCasesGrowthCountriesStatsSubscription.unsubscribe();
  }

  trendAllCountries(): void {
    if (!this.coronaCasesGrowthCountriesStatsResponse) {
      this.coronaCasesGrowthCountriesStatsSubscription = this.restService.getCoronaCasesGrowthAllCountriesStats().subscribe(data => this.storeCasesGrowthCountriesStats(data));
    }
    if (!this.coronaCasesGrowthStatsResponse) {
      this.coronaCasesGrowthStatsSubscription = this.restService.getCoronaCasesGrowthStats().subscribe(data => this.processCasesGrowthStats(data));
    } else {
      this.processCasesGrowthStats(this.coronaCasesGrowthStatsResponse);
    }
  }

  processCasesGrowthStats(data: any): void {
    this.processCasesGrowthStatsForGraphs(data);
    this.setGrowthStatsLineGraphConfiguration();
    this.growths = this.coronaCasesGrowthStatsResponse.map(x => x.delta);
    this.setGrowthStatsBarGraphConfiguration();
  }

  public processCasesGrowthStatsForGraphs(data: any): void {
    this.coronaCasesGrowthStatsResponse = data;
    this.dates = this.coronaCasesGrowthStatsResponse.map(x => this.getFormattedDate(x.date));
    this.growths = this.coronaCasesGrowthStatsResponse.map(x => x.growth);
    this.deltas = this.coronaCasesGrowthStatsResponse.map(x => x.delta);
    this.totalCases = this.growths[this.growths.length - 1].toLocaleString("us-US");
    this.newCases = this.deltas[this.deltas.length - 1].toLocaleString("us-US");
  }

  public setGrowthStatsLineGraphConfiguration(): void {
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
        text: 'All Countries / Total Cases ' + this.totalCases,
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
  }

  public setGrowthStatsBarGraphConfiguration(): void {
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
  }

  trendSearchByCountry(country: string): void {
    this.clearExistingGraphs();

    if (country.indexOf("All Countries") >= 0) {
      this.showTotal = true;
      this.showCountry = false;
      this.trendAllCountries();
    } else {
      if (!this.coronaCasesGrowthCountriesStatsResponse) {
        this.coronaCasesGrowthCountriesStatsSubscription = this.restService.getCoronaCasesGrowthAllCountriesStats().subscribe(data => this.processCasesGrowthCountriesStats(data, country));
      } else {
        this.processCasesGrowthCountriesStats(this.coronaCasesGrowthCountriesStatsResponse, country);
      }
    }
  }

  storeCasesGrowthCountriesStats(data) {
    this.coronaCasesGrowthCountriesStatsResponse = data;
    this.countries = this.countries ? this.countries : data.map(x => x.country);
  }

  public clearExistingGraphs() {
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
  }

  public processCasesGrowthCountriesStats(data: any, value: string) {
    this.processCasesGrowthCountriesStatsForGraphs(data, value);
    this.setCasesGrowthCountriesStatsLineGraphConfiguration(value);
    this.setCasesGrowthCountriesStatsBarGraphConfiguration(value);
    this.showTotal = false;
    this.showCountry = true;
  }

  public processCasesGrowthCountriesStatsForGraphs(data: any, value: string): void {
    this.coronaCasesGrowthCountriesStatsResponse = data;
    this.countryStat = this.coronaCasesGrowthCountriesStatsResponse.filter(x => x.country.indexOf(value) >= 0);
    this.dates = this.countryStat[0].growthStats.map(x => this.getFormattedDate(x.date));
    this.growths = this.countryStat[0].growthStats.map(x => x.growth);
    this.deltas = this.countryStat[0].growthStats.map(x => x.delta);
    this.totalCases = this.growths[this.growths.length - 1].toLocaleString("us-US");
    this.newCases = this.deltas[this.deltas.length - 1].toLocaleString("us-US");
  }

  public setCasesGrowthCountriesStatsLineGraphConfiguration(value: string): void {
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
        text: value.charAt(0).toUpperCase() + value.slice(1) + ' / Total Cases ' + this.totalCases,
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
  }

  public setCasesGrowthCountriesStatsBarGraphConfiguration(value: string) {
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
  }

  getFormattedDate(date) {
    var dt = new Date(date);
    var year = dt.getFullYear();
    var month = ("0" + (dt.getMonth() + 1)).slice(-2);
    var day = ("0" + dt.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}

