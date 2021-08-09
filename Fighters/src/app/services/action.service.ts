import { Injectable } from '@angular/core';

import { IGame } from '../models/game/game';
import { IItem, IItemTotals, ItemNames } from '../models/game/item';
import { IPersonalPlayerDetails, IPlayingPlayer } from '../models/player';

import { GameService } from './game.service';
import { ItemDamageService } from './itemDamage.service';
import { MessageService } from './message.service';
import { PlayerService } from './player.service';
import { RngService } from './rng.service';

interface IDamageDetails {
	players: IPlayingPlayer[];
	damageDealt: number;
	playerDead: boolean;
}

@Injectable()
export class ActionService {
	constructor(
		private gameService: GameService,
		private playerService: PlayerService,
		private messageService: MessageService,
		private itemDamageService: ItemDamageService,
		private rngService: RngService,
	) { }

	public attack(myPlayer: IPlayingPlayer, opponent: IPlayingPlayer, game: IGame, playerDetails: IPersonalPlayerDetails): void {
		const dealDamage: IDamageDetails = this.dealDamageAndUpdatedPlayers(myPlayer, opponent);
		const updatedPlayers: IPlayingPlayer[] = dealDamage.players.map((player) => {
			if (this.playerService.playerHasItem(ItemNames.xRayPeak, player)) {
				player.items = player.items.filter((item: IItem) => item.name !== ItemNames.xRayPeak);
			}
			return player;
		});

		const updatedGame: IGame = {
			...game,
			players: updatedPlayers,
			playerOneTurn: !game.playerOneTurn,
			gameOver: dealDamage.playerDead,
		};

		this.gameService.updateGame(updatedGame).then(() => {
			const deadPlayer = updatedGame.players.filter((player) => player.dead);
			if (deadPlayer.length) {
				this.messageService.sendMessage(`${deadPlayer[0].player.name} is DEAD!`, updatedGame,
					playerDetails);
			} else {
				this.messageService.sendMessage(`
					${opponent.player.name} took ${dealDamage.damageDealt > 0 ?
						dealDamage.damageDealt.toString() : 0} damage!`,
						updatedGame, playerDetails);
			}
		});
	}

	public earnCoin(myPlayer: IPlayingPlayer, game: IGame, playerDetails: IPersonalPlayerDetails, showMessage = true) {
		const updatedPlayers: IPlayingPlayer[] = game.players.map((player) => {
			if (player.id === myPlayer.id) {
				player.currency += 1;

				if (this.playerService.playerHasItem(ItemNames.xRayPeak, player)) {
					player.items = player.items.filter((item: IItem) => item.name !== ItemNames.xRayPeak);
				}
			}
			return player;
		});


		const updatedGame: IGame = {
			...game,
			playerOneTurn: !game.playerOneTurn,
			players: updatedPlayers
		};

		this.gameService.updateGame(updatedGame).then(() => {
			if (showMessage) {
				this.messageService.sendMessage(`${myPlayer.player.name} earned a coin!`, updatedGame, playerDetails);
			}
		});
	}

	public block(myPlayer: IPlayingPlayer, game: IGame, playerDetails: IPersonalPlayerDetails) {
		const blockAmount = this.rngService.roll(10);
		// Great block
		// if (blockAmount > 8) {
		// 	blockAmount += 2;
		// }

		const updatedPlayers: IPlayingPlayer[] = game.players.map((player) => {
			if (player.id === myPlayer.id) {
				player.blockAmount = blockAmount;
				player.blocking = true;
			}
			return player;
		});

		const updatedGame: IGame = {
			...game,
			players: updatedPlayers,
			playerOneTurn: !game.playerOneTurn,
		};

		this.gameService.updateGame(updatedGame).then(() => {
			this.messageService.sendMessage(`${myPlayer.player.name} blocks!`, updatedGame, playerDetails);
		});
	}

	public healPlayer(healAmount: number, myPlayer: IPlayingPlayer, game: IGame, playerDetails: IPersonalPlayerDetails): void {
		const updatedPlayers: IPlayingPlayer[] = game.players.map((player) => {
			if (player.id === myPlayer.id) {
				player.health += healAmount;
			}
			return player;
		});

		const updatedGame: IGame = {
			...game,
			playerOneTurn: !game.playerOneTurn,
			players: updatedPlayers
		};

		this.gameService.updateGame(updatedGame).then(() => {
			this.messageService.sendMessage(`${myPlayer.player.name} healed ${healAmount} hp!`,	updatedGame, playerDetails);
		});
	}

	private dealDamageAndUpdatedPlayers(you: IPlayingPlayer, opponent: IPlayingPlayer): IDamageDetails {
		// tslint:disable-next-line
		let results: IPlayingPlayer[] = [];
		let totalDamage = 0;

		const itemDamage: IItemTotals = this.itemDamageService.itemTotals(you.items);
		const itemResist: IItemTotals = this.itemDamageService.itemTotals(opponent.items);

		const crit: number = this.rngService.totalCritDamage(this.critIncrease(you.items));
		const magicDamage = (you.magicDamage + itemDamage.magicDamage) - (opponent.magicResist + itemResist.magicResist);
		const attackDamage = (you.attackDamage + itemDamage.attackDamage) - (opponent.armorResist + itemResist.armorResist);

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

	private critIncrease(items: IItem[]): number {
		return items.filter((item) => item.critBonus).length;
	}
}
