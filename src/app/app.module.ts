import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { NavbarModule } from './navbar/navbar.module';
import { SummaryModule } from './summary/summary.module';
import { StatsModule } from './stats/stats.module';
import { TrendsModule } from './trends/trends.module';
import { AboutModule } from './about/about.module';
import { AlertsModule } from './alerts/alerts.module';
import { PagenotfoundModule } from './pagenotfound/pagenotfound.module';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [ AppComponent ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ChartsModule,
		RouterModule,
		NavbarModule,
		SummaryModule,
		StatsModule,
		TrendsModule,
		AboutModule,
		PagenotfoundModule,
		AlertsModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
