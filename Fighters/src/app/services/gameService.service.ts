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
	public joinGame(id: string, game: IGame, details: IPersonalPlayerDetails): Promise<IPersonalPlayerDetails> {
		const allPlayers: IPlayingPlayer[] = game.players;
		const updatedPlayer: IPlayer = {
			...details.player,
			id: this.createPlayerId(),
		};

		if (game.players.length < 2) {
			allPlayers.push(this.createPlayingPlayerObj(updatedPlayer));
			return this.db.collection(getCurrentEnvironment(Collections.games)).doc(id).set({
				...game,
				players: allPlayers,
				gameStarted: true,
				playerOneTurn: true,
			}).then(() => {
				const playerObj: IPersonalPlayerDetails = {
					gameId: id,
					player: updatedPlayer,
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

	public listenToGame(id: string): Observable<any> {
		return this.db.collection(getCurrentEnvironment(Collections.games)).doc(id).valueChanges();
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
				id: playerDetails.id.stringValue,
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
		const newPlayerId: string = this.createPlayerId();
		return {
			player: {
				name: player.name,
				winTag: player.winTag,
				lossTag: player.lossTag,
				id: player.id ? player.id : newPlayerId,
			},
			attackDamage: 0,
			magicDamage: 0,
			magicResist: 0,
			armorResist: 0,
			dead: false,
			health: 100,
			id: player.id ? player.id : newPlayerId,
		};
	}
}
