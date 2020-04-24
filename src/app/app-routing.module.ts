import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { CountriesComponent } from './stats/countries/countries.component';
import { StatesComponent } from './stats/states/states.component';
import { IndiaComponent } from './trends/india/india.component';
import { CasesComponent } from './trends/cases/cases.component';
import { DeathsComponent } from './trends/deaths/deaths.component';
import { GrowthfactorComponent } from './trends/growthfactor/growthfactor.component';
import { AboutComponent } from './about/about.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


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
