import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndiaComponent } from './india/india.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { CasesComponent } from './cases/cases.component';
import { DeathsComponent } from './deaths/deaths.component';
import { GrowthfactorComponent } from './growthfactor/growthfactor.component';

@NgModule({
	declarations: [ IndiaComponent, CasesComponent, DeathsComponent, GrowthfactorComponent ],
	imports: [ CommonModule, FormsModule, ChartsModule ],
	exports: [ IndiaComponent, CasesComponent, GrowthfactorComponent ]
})
export class TrendsModule {}
