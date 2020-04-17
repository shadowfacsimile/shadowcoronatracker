import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatsComponent } from './stats/stats.component';
import { AlertsComponent } from './alerts/alerts.component';
import { SummaryComponent } from './summary/summary.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CasegrowthComponent } from './casegrowth/casegrowth.component';
import { CountrytrendComponent } from './countrytrend/countrytrend.component';
import { CountrydeathtrendComponent } from './countrydeathtrend/countrydeathtrend.component';
import { StatestatsComponent } from './statestats/statestats.component';
import { RouterModule } from '@angular/router';
import { IndiastatsComponent } from './indiastats/indiastats.component';

@NgModule({
  declarations: [
    AppComponent,
    StatsComponent,
    AlertsComponent,
    SummaryComponent,
    PagenotfoundComponent,
    CasegrowthComponent,
    CountrytrendComponent,
    CountrydeathtrendComponent,
    StatestatsComponent,
    IndiastatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
