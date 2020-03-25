import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { StatsComponent } from './stats/stats.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CasegrowthComponent } from './casegrowth/casegrowth.component';
import { CountrytrendComponent } from './countrytrend/countrytrend.component';
import { CountrydeathtrendComponent } from './countrydeathtrend/countrydeathtrend.component';


const routes: Routes = [
  {path: 'summary-stats', component: SummaryComponent},
  {path: 'stats-by-country', component: StatsComponent},
  {path: 'cases-growth-factor', component: CasegrowthComponent},
  {path: 'cases-trend-by-country', component: CountrytrendComponent},
  {path: 'deaths-trend-by-country', component: CountrydeathtrendComponent},
  {path: '', redirectTo: '/summary-stats', pathMatch: 'full'},
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
