import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { IGame } from 'src/app/models/game/game';
import { IMessage } from 'src/app/models/game/message';

import { GameService, IPersonalPlayerDetails } from '../../../services/gameService.service';
import { MessageDialogComponent } from './messageDialog/messageDialog.component';
import { PlayerDialogComponent } from './playerDialog/playerDialog.component';
import { StatsDialogComponent } from './statsDialog/statsDialog.component';

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
		// this.showStartDialog();
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
				this.listenToGame(this.id);
			} else {
				this.showStartGameButton = true;
			}
		});
	}

	public listenToGame(id: string) {
		this.gameService.listenToGame(id).subscribe((game: IGame) => {
			this.game = game;
			console.log(this.game);
			if (!game.gameStarted && game.players.length > 1) {
				if (this.playerDetails.player1 && !this.game.player1PickedStats) {
					this.openStatsDialog();
				} else if (!this.playerDetails.player1 && this.game.player1PickedStats) {
					this.openStatsDialog();
				}
			}
		});
	}

	public get player1Turn(): boolean {
		return this.game && this.game.gameStarted && this.game.playerOneTurn && this.playerDetails.player1;
	}

	private openStatsDialog(): void {
		this.dialog.open(StatsDialogComponent, {
			width: '300px',
			maxWidth: '300px',
			disableClose: true,
			data: {
				game: this.game,
				playerDetails: this.playerDetails,
			}
		});
	}
}
