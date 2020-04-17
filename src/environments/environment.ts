// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  summaryUrl: 'http://localhost:9080/ShadowCoronaTracker/api/stats/summary/',
  countriesStatsUrl: 'http://localhost:9080/ShadowCoronaTracker/api/stats/countries/',
  statesStatsUrl: 'http://localhost:9080/ShadowCoronaTracker/api/stats/states/',
  casesGrowthStatsUrl: 'http://localhost:9080/ShadowCoronaTracker/api/growth/cases/',
  casesGrowthCountriesStatsUrl: 'http://localhost:9080/ShadowCoronaTracker/api/growth/cases/countries/',
  casesGrowthFactorStatsUrl: 'http://localhost:9080/ShadowCoronaTracker/api/growth/factors/',
  deathsGrowthStatsUrl: 'http://localhost:9080/ShadowCoronaTracker/api/growth/deaths/',
  deathsGrowthCountriesStatsUrl: 'http://localhost:9080/ShadowCoronaTracker/api/growth/deaths/countries/',
  indiaStatsUrl: 'http://localhost:9080/ShadowCoronaTracker/api/stats/indiastats'
};

export const IndiaStates = {
	an: 'Andaman and Nicobar Islands',
	ap: 'Andhra Pradesh',
	ar: 'Arunachal Pradesh',
	as: 'Assam',
	br: 'Bihar',
	ch: 'Chandigarh',
	ct: 'Chhattisgarh',
	dd: 'Daman and Diu',
	dl: 'New Delhi',
	dn: 'Dadra and Nagar Haveli',
	ga: 'Goa',
	gj: 'Gujarat',
	hp: 'Himachal Pradesh',
	hr: 'Haryana',
	jh: 'Jharkhand',
	jk: 'Jammu and Kashmir',
	ka: 'Karnataka',
	kl: 'Kerala',
	la: 'Ladakh',
	ld: 'Lakshadweep',
	mh: 'Maharashtra',
	ml: 'Meghalaya',
	mn: 'Manipur',
	mp: 'Madhya Pradesh',
	mz: 'Mizoram',
	nl: 'Nagaland',
	or: 'Odisha',
	pb: 'Punjab',
	py: 'Puducherry',
	rj: 'Rajasthan',
	sk: 'Sikkim',
	tg: 'Telangana',
	tn: 'Tamil Nadu',
	tr: 'Tripura',
	up: 'Uttar Pradesh',
	ut: 'Uttarakhand',
	wb: 'West Bengal'
};