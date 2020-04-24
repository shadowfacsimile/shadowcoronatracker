import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummaryComponent } from './modules/summary/summary.component';
import { CountriesComponent } from './modules/stats/countries/countries.component';
import { StatesComponent } from './modules/stats/states/states.component';
import { IndiaComponent } from './modules/trends/india/india.component';
import { CasesComponent } from './modules/trends/cases/cases.component';
import { DeathsComponent } from './modules/trends/deaths/deaths.component';
import { GrowthfactorComponent } from './modules/trends/growthfactor/growthfactor.component';
import { AboutComponent } from './modules/about/about.component';
import { PagenotfoundComponent } from './modules/pagenotfound/pagenotfound.component';


const routes: Routes = [
  {path: 'summary-stats', component: SummaryComponent},
  {path: 'stats-by-country', component: CountriesComponent},
  {path: 'stats-by-state/:country', component: StatesComponent, pathMatch: 'full'},
  {path: 'cases-growth-factor', component: GrowthfactorComponent},
  {path: 'cases-trend-by-country', component: CasesComponent},
  {path: 'deaths-trend-by-country', component: DeathsComponent},
  {path: 'india-stats', component: IndiaComponent},
  {path: 'about', component: AboutComponent},
  {path: '', redirectTo: '/summary-stats', pathMatch: 'full'},
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
