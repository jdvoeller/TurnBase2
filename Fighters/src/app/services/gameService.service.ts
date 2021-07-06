import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Collections, getCurrentEnvironment } from '../../environments/environment';
import { IGame } from '../models/game/game';
import { IPlayer, IPlayingPlayer } from '../models/player';

export interface IPersonalPlayerDetails {
	player: IPlayer;
	gameId: string;
}

@Injectable()
export class GameService {
	constructor(private db: AngularFirestore) { getCurrentEnvironment(Collections.message); }

	// Game
	/**
	 * Creates a new game and sets the current player as player 1
	 * @param setupPlayer Basic player
	 * @returns Promise of IPersonalPlayerDetails
	 */
	public setupGame(setupPlayer: IPlayer): Promise<IPersonalPlayerDetails> {
		const newGame: IGame = {
			gameStarted: false,
			playerOneTurn: false,
			gameOver: false,
			players: [this.createPlayingPlayerObj(setupPlayer)],
			id: '',
			messages: [],
		};

		return this.db.collection(getCurrentEnvironment(Collections.games)).add(newGame).then((data) => {
			const id: string = this.getNewId(data);
			this.db.collection(getCurrentEnvironment(Collections.games)).doc(id).set({
				...newGame,
				id: id,
			});

			const gameObj: IPersonalPlayerDetails = {
				player: newGame.players[0].player,
				gameId: id,
			};
			return gameObj;
		});
	}

	/**
	 * Joins the game and sets game info to start
	 * @param id The gameID
	 * @param game The game that the player is joining
	 * @param player Joining Player
	 * @returns We will see
	 */
	public joinGame(id: string, game: IGame, player: IPlayer): Promise<IPersonalPlayerDetails> {
		if (game.players.length < 2) {
			return this.db.collection(getCurrentEnvironment(Collections.games)).doc(id).set({
				...game,
				players: game.players.push(this.createPlayingPlayerObj(player)),
				gameStarted: true,
				playerOneTurn: true,
			}).then(() => {
				const playerObj: IPersonalPlayerDetails = {
					gameId: id,
					player: player,
				};

				return playerObj;
			});
		}
	}

	public getGame(id: string) {
		return new Promise((resolve, reject) => {
			this.db.collection(getCurrentEnvironment(Collections.games)).doc(id).get().subscribe((data) => resolve(data));
		});
	}

	// Messages
	public sendMessage(message: string, id: string) {
		this.db.collection(getCurrentEnvironment(Collections.games)).doc(id).valueChanges().subscribe((game) => {

		});
		// return this.db.collection(getCurrentEnvironment(Collections.message)).add(string);
	}

	public getMessages(): Observable<any[]> {
		return this.db.collection(getCurrentEnvironment(Collections.message)).valueChanges();
	}

	public formatGameData(data): IGame {
		const formattedData: IGame = {
			gameOver: data.gameOver.booleanValue,
			gameStarted: data.gameOver.booleanValue,
			id: data.id.stringValue,
			messages: data.messages.arrayValue,
			playerOneTurn: data.playerOneTurn.booleanValue,
			players: this.formattedPlayers(data.players.arrayValue.values),
		};
		return formattedData;
	}

	private formattedPlayers(data: any[]): IPlayingPlayer[] {
		const formattedPlayingPlayers: IPlayingPlayer[] = [];
		for (let i = 0; i < data.length; i++) {
			const playerFields = data[i].mapValue.fields;
			const playerDetails = playerFields.player.mapValue.fields;
			const formattedPlayer: IPlayingPlayer = {
				armorResist: playerFields.armorResist.integerValue,
				attackDamage: playerFields.attackDamage.integerValue,
				health: playerFields.health.integerValue,
				magicDamage: playerFields.magicDamage.integerValue,
				magicResist: playerFields.magicResist.integerValue,
				dead: playerFields.dead.booleanValue,
				player: {
					id: playerDetails.id.stringValue,
					lossTag: playerDetails.lossTag.stringValue,
					winTag: playerDetails.winTag.stringValue,
					name: playerDetails.name.stringValue,
				}
			};
			formattedPlayingPlayers.push(formattedPlayer);
		}

		return formattedPlayingPlayers;
	}

	private getNewId(data: any): string {
		return data.E_.path.segments[1];
	}

	private createPlayerId(): string {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const characterLength = characters.length;
		for (let i = 0; i < 14; i++) {
			result += characters.charAt(Math.floor(Math.random() * characterLength));
		}
		return result;
	}

	private createPlayingPlayerObj(player: IPlayer): IPlayingPlayer {
		return {
			player: {
				name: player.name,
				winTag: player.winTag,
				lossTag: player.lossTag,
				id: this.createPlayerId(),
			},
			attackDamage: 0,
			magicDamage: 0,
			magicResist: 0,
			armorResist: 0,
			dead: false,
			health: 100,
		};
	}
}
