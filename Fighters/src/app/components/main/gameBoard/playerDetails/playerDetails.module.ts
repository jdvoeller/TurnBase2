import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { PlayerDetailsComponent } from './playerDetails.component';
import { PlayerDetailsDialogComponent } from './playerDetailsDialog/playerDetailsDialog.component';
import { PlayerDetailsDialogModule } from './playerDetailsDialog/playerDetailsDialog.module';

@NgModule({
	imports: [
		CommonModule,
		MatProgressBarModule,
		MatButtonModule,
		MatIconModule,

		PlayerDetailsDialogModule,
	],
	exports: [PlayerDetailsComponent],
	declarations: [PlayerDetailsComponent],
	entryComponents: [PlayerDetailsDialogComponent],
})
export class PlayerDetailsModule { }
