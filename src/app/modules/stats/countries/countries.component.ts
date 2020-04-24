import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';

@Component({
	selector: 'app-countries',
	templateUrl: './countries.component.html',
	styleUrls: [ './countries.component.css' ]
})
export class CountriesComponent implements OnInit, OnDestroy {
	public coronaCountriesStatsSubscription: Subscription;
	public coronaCountriesStatsResponse: any;
	public tempCoronaCountriesStatsResponse: any;
	public sort: boolean = false;
	public country: string;

	constructor(public restService: RestService) {}

	ngOnInit(): void {
		this.coronaCountriesStatsSubscription = this.restService
			.getCoronaCountriesStats()
			.subscribe((data) => this.processStatsData(data));
	}

	processStatsData(data: any): void {
		this.coronaCountriesStatsResponse = data;
		this.tempCoronaCountriesStatsResponse = this.coronaCountriesStatsResponse;
	}

	searchByCountry(value: string): void {
		this.coronaCountriesStatsResponse = this.tempCoronaCountriesStatsResponse;
		this.coronaCountriesStatsResponse = this.coronaCountriesStatsResponse.filter(
			(stat) => stat.location.country.toLowerCase().indexOf(value.toLowerCase()) >= 0
		);
	}

	sortByCountry(): void {
		this.sort = !this.sort;
		this.coronaCountriesStatsResponse = this.tempCoronaCountriesStatsResponse;
		this.coronaCountriesStatsResponse = this.coronaCountriesStatsResponse.sort((a, b) =>
			this.sortByItem(a.location.country.toLowerCase(), b.location.country.toLowerCase())
		);
	}

	sortByCases(): void {
		this.sort = !this.sort;
		this.coronaCountriesStatsResponse = this.tempCoronaCountriesStatsResponse;
		this.coronaCountriesStatsResponse = this.coronaCountriesStatsResponse.sort((a, b) =>
			this.sortByItem(a.cases, b.cases)
		);
	}

	sortByNewCases(): void {
		this.sort = !this.sort;
		this.coronaCountriesStatsResponse = this.tempCoronaCountriesStatsResponse;
		this.coronaCountriesStatsResponse = this.coronaCountriesStatsResponse.sort((a, b) =>
			this.sortByItem(a.newCases, b.newCases)
		);
	}

	sortByDeaths(): void {
		this.sort = !this.sort;
		this.coronaCountriesStatsResponse = this.tempCoronaCountriesStatsResponse;
		this.coronaCountriesStatsResponse = this.coronaCountriesStatsResponse.sort((a, b) =>
			this.sortByItem(a.deaths, b.deaths)
		);
	}

	sortByNewDeaths(): void {
		this.sort = !this.sort;
		this.coronaCountriesStatsResponse = this.tempCoronaCountriesStatsResponse;
		this.coronaCountriesStatsResponse = this.coronaCountriesStatsResponse.sort((a, b) =>
			this.sortByItem(a.newDeaths, b.newDeaths)
		);
	}

	sortByMortalityRate(): void {
		this.sort = !this.sort;
		this.coronaCountriesStatsResponse = this.tempCoronaCountriesStatsResponse;
		this.coronaCountriesStatsResponse = this.coronaCountriesStatsResponse.sort((a, b) =>
			this.sortByItem(a.mortalityRate, b.mortalityRate)
		);
	}

	sortByRecoveries(): void {
		this.sort = !this.sort;
		this.coronaCountriesStatsResponse = this.tempCoronaCountriesStatsResponse;
		this.coronaCountriesStatsResponse = this.coronaCountriesStatsResponse.sort((a, b) =>
			this.sortByItem(a.recoveries, b.recoveries)
		);
	}

	sortByRecoveryRate(): void {
		this.sort = !this.sort;
		this.coronaCountriesStatsResponse = this.tempCoronaCountriesStatsResponse;
		this.coronaCountriesStatsResponse = this.coronaCountriesStatsResponse.sort((a, b) =>
			this.sortByItem(a.recoveryRate, b.recoveryRate)
		);
	}

	sortByItem(a, b): number {
		if ((this.sort && a < b) || (!this.sort && a > b)) return 1;
		if ((this.sort && a > b) || (!this.sort && a < b)) return -1;
		return 0;
	}

	ngOnDestroy(): void {
		this.coronaCountriesStatsSubscription.unsubscribe();
	}
}