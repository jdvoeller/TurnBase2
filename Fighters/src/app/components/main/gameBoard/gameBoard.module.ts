import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { GameService } from '../../../services/gameService.service';
import { ActionDialogComponent } from './actionDialog/actionDialog.component';
import { ActionDialogModule } from './actionDialog/actionDialog.module';
import { GameBoardComponent } from './gameBoard.component';
import { MessageDialogComponent } from './messageDialog/messageDialog.component';
import { MessageDialogModule } from './messageDialog/messageDialog.module';
import { PhaseStepperModule } from './phaseStepper/phaseStepper.module';
import { PlayerDetailsModule } from './playerDetails/playerDetails.module';
import { PlayerDialogComponent } from './playerDialog/playerDialog.component';
import { PlayerDialogModule } from './playerDialog/playerDialog.module';
import { StatsDialogComponent } from './statsDialog/statsDialog.component';
import { StatsDialogModule } from './statsDialog/statsDialog.module';

@NgModule({
	imports: [
		CommonModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		MatProgressSpinnerModule,

		MessageDialogModule,
		PlayerDialogModule,
		StatsDialogModule,
		PlayerDetailsModule,
		PhaseStepperModule,
		ActionDialogModule,
	],
	exports: [GameBoardComponent],
	providers: [GameService],
	declarations: [GameBoardComponent],
	entryComponents: [
		MessageDialogComponent,
		PlayerDialogComponent,
		StatsDialogComponent,
		ActionDialogComponent,
	],
})
export class GameBoardModule { }
