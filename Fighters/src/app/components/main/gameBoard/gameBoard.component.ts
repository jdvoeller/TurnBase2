import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { GameService } from '../../../services/game.service';

import { IGame, MOCK_GAME_DATA } from '../../../models/game/game';
import { IItem, ItemNames } from '../../../models/game/item';
import { IPersonalPlayerDetails, IPlayer, IPlayingPlayer } from '../../../models/player';
import { ActionDialogComponent } from './actionDialog/actionDialog.component';
import { IMessageData, MessageDialogComponent } from './messageDialog/messageDialog.component';
import { IPhaseStepperData } from './phaseStepper/phaseStepper.component';
import { PlayerDialogComponent } from './playerDialog/playerDialog.component';
import { StatsDialogComponent } from './statsDialog/statsDialog.component';
import { ActionService } from 'src/app/services/action.service';

@Component({
	selector: 'game-board',
	templateUrl: 'gameBoard.component.html',
	styleUrls: ['gameBoard.component.css'],
})

export class GameBoardComponent {
	public id: string;
	public game: IGame;
	public playerDetails: IPersonalPlayerDetails;
	public showStartGameButton = false;
	public isLoading =  false;

	constructor(
		private dialog: MatDialog,
		private gameService: GameService,
		private actionService: ActionService,
	) {
		this.showStartDialog();

		// TESTING ACTIONS
		// this.game = MOCK_GAME_DATA;
		// this.playerDetails = {
		// 	player: this.game.players[0].player,
		// 	player1: true,
		// 	gameId: this.game.id,
		// };
		// this.openActions();

		setInterval(() => {
			if (this.game) {
				const messageContainerElement = document.getElementById('message-details');
				messageContainerElement.scrollTo(0, messageContainerElement.scrollHeight);
			}
		}, 250);
	}

	public get disableActions(): boolean {
		if (!this.game || !(this.game && this.game.gameStarted) || !this.allPlayersAlive) {
			return true;
		} else if (this.myPlayersTurn) {
			return false;
		}
		return true;
	}

	public get myTurn(): boolean {
		return this.game.gameStarted && !this.disableActions;
	}

	public get myPlayer(): IPlayingPlayer {
		return this.game.players.filter((player) => player.player.id === this.playerDetails.player.id)[0];
	}

	public get opponent(): IPlayingPlayer {
		return this.game.players.filter((player) => player.player.id !== this.playerDetails.player.id)[0];
	}

	public get allPlayersAlive(): boolean {
		return this.game.players.filter((player) => player.dead).length === 0;
	}

	public get enableMessageButton(): boolean {
		return !!this.game;
	}

	public get gameWinner(): IPlayer {
		return this.game.players.filter((player) => player.health > 0)[0].player;
	}

	public get gameLoser(): IPlayer {
		return this.game.players.filter((player) => player.health <= 0)[0].player;
	}

	public get showShareId(): boolean {
		return !!this.id && (this.game && !this.game.gameStarted  && !this.game.player1PickedStats) &&
			this.playerDetails.player1;
	}

	public get showOpponentSelecting(): boolean {
		return this.game && !this.game.gameStarted && !this.game.player1PickedStats &&
			!this.playerDetails.player1 || this.game && !this.game.gameStarted &&
			this.game.player1PickedStats && this.playerDetails.player1;
	}

	public get isStatsDialogOpen(): boolean {
		return !!this.dialog.openDialogs.filter((dialog) => dialog.id === 'statDialog').length;
	}

	public get showOtherPlayersDetails(): boolean {
		return !!this.myPlayer.items.filter((item) => item.name === ItemNames.xRayEyes ||
			item.name === ItemNames.xRayPeak).length;
	}

	public openMessageDialog() {
		const messageData: IMessageData = {
			game: this.game,
			sender: this.playerDetails.player.name
		};
		this.dialog.open(MessageDialogComponent, { data: messageData });
	}

	public showStartDialog() {
		this.dialog.open(PlayerDialogComponent, { id: 'startDialog'}).afterClosed().subscribe((playerDetails: IPersonalPlayerDetails) => {
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
			if (!game.gameStarted && game.players.length > 1) {
				if (this.playerDetails.player1 && !this.game.player1PickedStats) {
					this.openStatsDialog();
				} else if (!this.playerDetails.player1 && this.game.player1PickedStats) {
					this.openStatsDialog();
				}
			}
		});
	}

	public openActions(): void {
		this.dialog.open(ActionDialogComponent, {
			data: {
				player: this.myPlayer,
				game: this.game,
			},
			width: '300px',
		}).afterClosed().subscribe((data) => {
			if (data) {
				if (data === 'attack') {
					this.actionService.attack(this.myPlayer, this.opponent, this.game, this.playerDetails);
				} else if (data === 'coin') {
					this.actionService.earnCoin(this.myPlayer, this.game, this.playerDetails);
				} else {
					// Player bought something
					const newItem = (data as IItem);
					if (newItem.name === ItemNames.healthPotion) {
						this.actionService.healPlayer(newItem.health, this.myPlayer, this.game, this.playerDetails);
					} else {
						const updatedPlayers: IPlayingPlayer[] = this.game.players.map((player) => {
							if (player.id === this.myPlayer.id) {
								player.items.push(newItem);
								player.currency -= newItem.cost;
							}
							return player;
						});

						const updatedGame: IGame = {
							...this.game,
							players: updatedPlayers,
						};
						this.gameService.updateGame(updatedGame);
					}
				}
			}
		});
	}

	public get stepperData(): IPhaseStepperData {
		return {
			activeStep: this.game.phase,
			playerOneTurn: this.game.playerOneTurn
		};
	}

	private get myPlayersTurn(): boolean {
		if (this.playerDetails.player1 && this.game.playerOneTurn) {
			return true;
		} else if (!this.playerDetails.player1 && !this.game.playerOneTurn) {
			return true;
		}
		return false;
	}

	private openStatsDialog(): void {
		this.dialog.open(StatsDialogComponent, {
			width: '300px',
			maxWidth: '300px',
			disableClose: true,
			id: 'statDialog',
			data: {
				game: this.game,
				playerDetails: this.playerDetails,
			}
		});
	}
}
