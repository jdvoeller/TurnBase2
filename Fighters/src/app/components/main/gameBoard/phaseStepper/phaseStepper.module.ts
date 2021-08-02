import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PhaseStepperComponent } from './phaseStepper.component';

@NgModule({
	imports: [
		CommonModule
	],
	exports: [PhaseStepperComponent],
	declarations: [PhaseStepperComponent],
	providers: [],
})
export class PhaseStepperModule { }
