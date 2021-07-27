import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { PlayerDetailsComponent } from './playerDetails.component';

@NgModule({
	imports: [
		CommonModule,
		MatCardModule,
		MatProgressBarModule,
	],
	exports: [PlayerDetailsComponent],
	declarations: [PlayerDetailsComponent],
	providers: [],
})
export class PlayerDetailsModule { }
