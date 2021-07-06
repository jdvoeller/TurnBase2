import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { IGame } from 'src/app/models/game/game';
import { IMessage } from 'src/app/models/game/message';

import { GameService, IPersonalPlayerDetails } from '../../../services/gameService.service';
import { MessageDialogComponent } from './messageDialog/messageDialog.component';
import { PlayerDialogComponent } from './playerDialog/playerDialog.component';

@Component({
	selector: 'game-board',
	templateUrl: 'gameBoard.component.html',
	styleUrls: ['gameBoard.component.css'],
})

export class GameBoardComponent {
	public details: IMessage[];
	public id: string;
	public game: IGame;
	public playerDetails: IPersonalPlayerDetails;
	public showStartGameButton = false;

	constructor(
		private dialog: MatDialog,
		private gameService: GameService,
	) {
		this.showStartDialog();
	}

	public openMessageDialog() {
		this.dialog.open(MessageDialogComponent, { data: this.details.length + 1}).afterClosed().subscribe(() => {
			const messageContainerElement = document.getElementById('game-details');
			messageContainerElement.scrollTo(0, messageContainerElement.scrollHeight);
		});
	}

	public showStartDialog() {
		this.dialog.open(PlayerDialogComponent).afterClosed().subscribe((playerDetails: IPersonalPlayerDetails) => {
			if (playerDetails) {
				this.playerDetails = playerDetails;
				this.showStartGameButton = false;
				this.id = playerDetails.gameId;
			} else {
				this.showStartGameButton = true;
			}

			this.gameService.listenToGame(this.id).subscribe((game) => this.game = game);
		});
	}
}
