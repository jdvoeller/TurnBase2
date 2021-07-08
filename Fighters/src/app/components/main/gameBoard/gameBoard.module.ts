import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { GameService } from '../../../services/gameService.service';

import { GameBoardComponent } from './gameBoard.component';
import { MessageDialogComponent } from './messageDialog/messageDialog.component';
import { MessageDialogModule } from './messageDialog/messageDialog.module';
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

		MessageDialogModule,
		PlayerDialogModule,
		StatsDialogModule,
	],
	exports: [GameBoardComponent],
	providers: [GameService],
	declarations: [GameBoardComponent],
	entryComponents: [
		MessageDialogComponent,
		PlayerDialogComponent,
		StatsDialogComponent,
	],
})
export class GameBoardModule { }
