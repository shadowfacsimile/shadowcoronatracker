import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { StatsComponent } from './stats/stats.component';


const routes: Routes = [
  {path: '', component: SummaryComponent},
  {path: 'summarystats', component: SummaryComponent},
  {path: 'statsbycountry', component: StatsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
