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
import { YourTurnDialogComponent } from '../yourTurnDialog/yourTurnDialog.component';
import { BlockingDialogComponent } from './blockingDialog/blockingDialog.component';
import { Phase } from 'src/app/models/game/phases';
import { isString } from 'util';

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

	public canShowYourTurnDialog = false;

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
		// this.openBlockingDialog();

		setInterval(() => {
			if (this.game) {
				const messageContainerElement = document.getElementById('message-details');
				messageContainerElement.scrollTo(0, messageContainerElement.scrollHeight);
			}
		}, 250);
	}

	public get stepperData(): IPhaseStepperData {
		return {
			activeStep: this.game.phase,
			playerOneTurn: this.game.playerOneTurn
		};
	}

	public get myTurn(): boolean {
		if (this.game.playerOneTurn) {
			if (this.playerDetails.player1) {
				return true;
			}
			return false;
		} else {
			if (this.playerDetails.player1) {
				return false;
			}
			return true;
		}
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
		return !!this.id && (!this.gameStarted  && (this.game && !this.game.player1PickedStats)) &&
			this.playerDetails.player1;
	}

	public get showOpponentSelecting(): boolean {
		return !this.gameStarted && (this.game && !this.game.player1PickedStats) &&
			!this.playerDetails.player1 || !this.gameStarted &&
			(this.game && this.game.player1PickedStats) && this.playerDetails.player1;
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
			if (!this.gameStarted && game.players.length > 1) {
				if (this.playerDetails.player1 && !this.game.player1PickedStats) {
					this.openStatsDialog();
				} else if (!this.playerDetails.player1 && this.game.player1PickedStats) {
					this.openStatsDialog();
				}
			}

			if (this.gameStarted && this.myTurn && this.dialog.openDialogs.length &&
					!this.dialog.getDialogById('statsDialog') && !this.dialog.getDialogById('yourTurnDialog') &&
					!this.dialog.getDialogById('blocking')) {
				this.dialog.open(YourTurnDialogComponent, {
					id: 'yourTurnDialog',
				}).afterClosed().subscribe((data) => {
					if (data) {
						this.dialog.closeAll();
					}
				});
			}

			if (game.phase === Phase.block && !this.dialog.getDialogById('blocking') && this.myTurn) {
				this.dialog.closeAll();
				this.openBlockingDialog();
			}
		});
	}

	public openActions(): void {
		this.dialog.open(ActionDialogComponent, {
			data: {
				player: this.myPlayer,
				game: this.game,
				canAction: this.myTurn,
				id: 'actionDialog',
			},
			width: '300px',
		}).afterClosed().subscribe((data) => {
			if (data) {
				if (data === 'attack') {
					this.actionService.initiateAttack(this.myPlayer, this.opponent, this.game, this.playerDetails);
				} else if (data === 'coin') {
					this.actionService.earnCoin(this.myPlayer, this.game, this.playerDetails);
				} else {
					// Player bought something
					const newItem = (data as IItem);
					if (newItem.name === ItemNames.healthPotion) {
						this.actionService.healPlayer(newItem.health, newItem.cost, this.myPlayer, this.game, this.playerDetails);
					} else {
						this.actionService.buyItem(this.game, newItem, this.myPlayer.id);
					}
				}
			}
		});
	}

	private openBlockingDialog() {
		this.dialog.open(BlockingDialogComponent, {
			id: 'blocking',
			disableClose: true,
		}).afterClosed().subscribe((action: string) => {
			switch (action) {
				case 'abstain':
					this.actionService.attack(this.opponent, this.myPlayer, this.game, this.playerDetails);
					break;
				case 'block':
					this.actionService.attack(this.opponent, this.myPlayer, this.game, this.playerDetails, true);
					break;
				case 'shop':
					this.dialog.open(ActionDialogComponent, {
						data: {
							player: this.myPlayer,
							game: this.game,
							canAction: false,
							id: 'actionDialog',
							openShopDirectly: true,
						}
					}).afterClosed().subscribe((data) => {
						if (data !== undefined && !isString(data)) {
							const newItem = (data as IItem);
							if (newItem.name === ItemNames.healthPotion) {
								this.actionService.healPlayer(newItem.health, newItem.cost, this.myPlayer, this.game, this.playerDetails);
							} else {
								this.actionService.buyItem(this.game, newItem, this.myPlayer.id);
							}
						}
						this.openBlockingDialog();
					});
					break;
				default:
					break;
			}
		});
	}

	private get gameStarted(): boolean {
		return this.game && this.game.gameStarted;
	}

	private openStatsDialog(): void {
		this.dialog.open(StatsDialogComponent, {
			width: '300px',
			maxWidth: '300px',
			disableClose: true,
			id: 'statsDialog',
			data: {
				game: this.game,
				playerDetails: this.playerDetails,
			}
		});
	}
}
