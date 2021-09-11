import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { GameService } from '../../../services/game.service';
import { ActionService } from '../../../services/action.service';
import { PlayerService } from '../../../services/player.service';
import { MessageService } from '../../../services/message.service';
import { RngService } from '../../../services/rng.service';

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
import { YourTurnDialogModule } from '../yourTurnDialog/yourTurnDialog.module';
import { YourTurnDialogComponent } from '../yourTurnDialog/yourTurnDialog.component';
import { BlockingDialogModule } from './blockingDialog/blockingDialog.module';
import { BlockingDialogComponent } from './blockingDialog/blockingDialog.component';
import { IdService } from '../../../services/id.service';
import { MessagesModule } from './messages/messages.module';

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
		YourTurnDialogModule,
		BlockingDialogModule,
		MessagesModule,
	],
	exports: [GameBoardComponent],
	providers: [
		GameService,
		ActionService,
		PlayerService,
		MessageService,
		RngService,
		IdService,
	],
	declarations: [GameBoardComponent],
	entryComponents: [
		MessageDialogComponent,
		PlayerDialogComponent,
		StatsDialogComponent,
		ActionDialogComponent,
		YourTurnDialogComponent,
		BlockingDialogComponent,
	],
})
export class GameBoardModule { }
