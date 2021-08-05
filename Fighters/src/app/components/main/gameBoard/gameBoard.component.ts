import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { IGame, MOCK_GAME_DATA } from '../../../models/game/game';
import { IItem, ItemNames } from '../../../models/game/item';
import { IMessage } from '../../../models/game/message';
import { IPlayer, IPlayerWithItems, IPlayingPlayer } from '../../../models/player';
import { GameService, IPersonalPlayerDetails } from '../../../services/gameService.service';
import { ActionDialogComponent } from './actionDialog/actionDialog.component';
import { IMessageData, MessageDialogComponent } from './messageDialog/messageDialog.component';
import { IPhaseStepperData } from './phaseStepper/phaseStepper.component';
import { PlayerDialogComponent } from './playerDialog/playerDialog.component';
import { StatsDialogComponent } from './statsDialog/statsDialog.component';

interface IDamageDetails {
	players: IPlayingPlayer[];
	damageDealt: number;
	playerDead: boolean;
}

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
		return !!this.id && (this.game && !this.game.gameStarted  && !this.game.player1PickedStats) && this.playerDetails.player1;
	}

	public get showOpponentSelecting(): boolean {
		return this.game && !this.game.gameStarted && !this.game.player1PickedStats && !this.playerDetails.player1 ||
			this.game && !this.game.gameStarted && this.game.player1PickedStats && this.playerDetails.player1;
	}

	public get isStatsDialogOpen(): boolean {
		return !!this.dialog.openDialogs.filter((dialog) => dialog.id === 'statDialog').length;
	}

	public get showOtherPlayersDetails(): boolean {
		return !!this.myPlayer.items.filter((item) => item.name === ItemNames.xRayEyes).length;
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
			data: this.myPlayer,
			width: '300px',
		}).afterClosed().subscribe((data) => {
			if (data) {
				if (data === 'attack') {
					this.attack();
				} else if (data === 'coin') {
					this.earnCoin();
				} else {
					// Player bought something
					const newItem = (data as IItem);
					if (newItem.name === ItemNames.healthPotion) {
						this.healPlayer(newItem.health);
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

	public earnCoin() {
		const updatedPlayers: IPlayingPlayer[] = this.game.players.map((player) => {
			if (player.id === this.myPlayer.id) {
				player.currency += 1;
			}
			return player;
		});

		const updatedGame: IGame = {
			...this.game,
			playerOneTurn: !this.game.playerOneTurn,
			players: updatedPlayers
		};

		this.gameService.updateGame(updatedGame).then(() => {
			this.sendMessage(`${this.myPlayer.player.name} earned a coin!`);
		});
	}

	public attack() {
		const dealDamage: IDamageDetails = this.dealDamageAndUpdatedPlayers(this.myPlayer, this.opponent);
		const updatedGame: IGame = {
			...this.game,
			players: dealDamage.players,
			playerOneTurn: !this.game.playerOneTurn,
			gameOver: dealDamage.playerDead,
		};

		this.gameService.updateGame(updatedGame).then(() => {
			const deadPlayer = this.game.players.filter((player) => player.dead);
			if (deadPlayer.length) {
				this.sendMessage(`${deadPlayer[0].player.name} is DEAD!`);
			} else {
				this.sendMessage(`${this.opponent.player.name} took ${dealDamage.damageDealt > 0 ? dealDamage.damageDealt.toString() : 0} damage!`);
			}
		});
	}

	public block() {
		let blockAmount = this.roll(10);
		// Great block
		if (blockAmount > 8) {
			blockAmount += 2;
		}
		const myPlayer: IPlayingPlayer = {...this.myPlayer};

		const updatedPlayers: IPlayingPlayer[] = this.game.players.map((player) => {
			if (player.id === myPlayer.id) {
				player.blockAmount = blockAmount;
				player.blocking = true;
			}
			return player;
		});

		const updatedGame: IGame = {
			...this.game,
			players: updatedPlayers,
			playerOneTurn: !this.game.playerOneTurn,
		};

		this.gameService.updateGame(updatedGame).then(() => {
			this.sendMessage(`${myPlayer.player.name} blocks!`);
		});
	}

	public sendMessage(message: string) {
		// tslint:disable-next-line
		let updatedMessages: IMessage[] = [...this.game.messages];
		updatedMessages.push({
			message: message,
			time: new Date,
			number: updatedMessages.length + 1,
			sender: this.playerDetails.player.name,
		});

		const updatedGame: IGame = {
			...this.game,
			messages: updatedMessages,
		};
		this.gameService.updateGame(updatedGame);
	}

	public get stepperData(): IPhaseStepperData {
		return {
			activeStep: this.game.phase,
			playerOneTurn: this.game.playerOneTurn
		};
	}

	private healPlayer(healAmount: number): void {
		const updatedPlayers: IPlayingPlayer[] = this.game.players.map((player) => {
			if (player.id === this.myPlayer.id) {
				player.health += healAmount;
			}
			return player;
		});

		const updatedGame: IGame = {
			...this.game,
			playerOneTurn: !this.game.playerOneTurn,
			players: updatedPlayers
		};

		this.gameService.updateGame(updatedGame).then(() => {
			this.sendMessage(`${this.myPlayer.player.name} healed ${healAmount} hp!`);
		});
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

	private dealDamageAndUpdatedPlayers(you: IPlayingPlayer, opponent: IPlayingPlayer): IDamageDetails {
		// tslint:disable-next-line
		let results: IPlayingPlayer[] = [];
		let totalDamage = 0;

		const crit: number = this.totalCritDamage(this.critIncrease(you.items));
		const magicDamage = this.totalMagicDamage(you) - this.totalMagicResist(opponent);
		const attackDamage = this.totalAttackDamage(you) - this.totalArmor(opponent);

		totalDamage = magicDamage + attackDamage + crit;

		if (opponent.blocking) {
			totalDamage -= opponent.blockAmount;
		}

		const opponentNewHealth = opponent.health - totalDamage;
		const isDead: boolean = opponentNewHealth <= 0;
		const updatedOpponent: IPlayingPlayer = {
			...opponent,
			health: totalDamage > 0 ? opponentNewHealth : opponent.health,
			dead: isDead,
			blocking: false,
			blockAmount: 0,
		};

		results.push(you);
		results.push(updatedOpponent);

		return {
			players: results,
			damageDealt: totalDamage,
			playerDead: isDead,
		};
	}

	private totalMagicDamage(player: IPlayingPlayer): number {
		let extraMagicDamage = 0;
		player.items.forEach((item) => {
			if (item.magicDamage) {
				extraMagicDamage += item.magicDamage;
			}
		});
		return extraMagicDamage + player.magicDamage;
	}

	private totalAttackDamage(player: IPlayingPlayer): number {
		let extraAttackDamage = 0;
		player.items.forEach((item) => {
			if (item.attackDamage) {
				extraAttackDamage += item.attackDamage;
			}
		});
		return extraAttackDamage + player.attackDamage;
	}

	private totalArmor(player: IPlayingPlayer): number {
		let extraArmor = 0;
		player.items.forEach((item) => {
			if (item.armorResist) {
				extraArmor += item.armorResist;
			}
		});
		return extraArmor + player.armorResist;
	}

	private totalMagicResist(player: IPlayingPlayer): number {
		let extraMagicResist = 0;
		player.items.forEach((item) => {
			if (item.magicResist) {
				extraMagicResist += item.magicResist;
			}
		});
		return extraMagicResist + player.magicResist;
	}

	private totalCritDamage(critBonus: number): number {
		const ROLL = this.roll(13);

		if (ROLL + critBonus >= 7) {
			return this.roll(6);
		}
		return 0;
	}

	private critIncrease(items: IItem[]): number {
		return items.filter((item) => item.critBonus).length;
	}

	private roll(max: number): number {
		return 1 + Math.floor(Math.random() * (max - 1));
	}
}
