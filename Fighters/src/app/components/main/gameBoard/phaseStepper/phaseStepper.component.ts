import { Component, Input } from '@angular/core';
import { Phase } from 'src/app/models/game/phases';

export interface IPhaseStepperData {
	activeStep: Phase;
	playerOneTurn: boolean;
}

@Component({
	selector: 'phase-stepper',
	templateUrl: 'phaseStepper.component.html',
	styleUrls: ['phaseStepper.component.css'],
})

export class PhaseStepperComponent {
	@Input() public stepperData: IPhaseStepperData;

	constructor() { }
}
