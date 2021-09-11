import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Collections, getCurrentEnvironment } from '../../environments/environment';
import { IGame } from '../models/game/game';
import { Phase } from '../models/game/phases';
import { IPersonalPlayerDetails, IPlayer, IPlayingPlayer } from '../models/player';
import { IdService } from './id.service';
import { MessageService } from './message.service';

@Injectable()
export class GameService {
	public baseStat = 5;
	public baseHealth = 100;

	protected ENVIRONMENT = getCurrentEnvironment(Collections.games);

	constructor(
		private db: AngularFirestore,
		private idService: IdService,
		private messageService: MessageService,
	) { }

	//
	// Game
	//
	/**
	 * Creates a new game and sets the current player as player 1
	 * @param setupPlayer Basic player
	 */
	public setupGame(setupPlayer: IPlayer): Observable<IPersonalPlayerDetails> {
		let newGameId = this.idService.generateID(4);
		// tslint:disable-next-line
		let newGame: IGame = {
			gameStarted: false,
			playerOneTurn: false,
			gameOver: false,
			players: [this.createPlayingPlayerObj(setupPlayer)],
			id: newGameId,
			player1PickedStats: false,
			phase: Phase.attack,
		};

		return this.db.collection(this.ENVIRONMENT).get().pipe(
			tap((data) => {
				// Check to see if gameId already exists.
				// If so, add a character to the end of the newGameId until it's unique
				while (data.docs.filter((doc) => doc.data().id === newGameId).length) {
					newGameId = newGameId + this.idService.generateID(1);
					newGame.id = newGameId;
				}

				// Setup game document
				this.db.collection(this.ENVIRONMENT).doc(newGameId).set(newGame);

				// Setup message document
				this.messageService.setUpMessageDocument(newGameId);
			}),
			map(() => {
				const gameObj: IPersonalPlayerDetails = {
					player: newGame.players[0].player,
					gameId: newGameId,
					player1: true,
				};
				return gameObj;
			}),
		);
	}

	/**
	 * Joins the game and sets game info to start
	 * @param id The gameID
	 * @param game The game that the player is joining
	 * @param player Joining Player
	 */
	public joinGame(id: string, game: IGame, details: IPersonalPlayerDetails): Observable<IPersonalPlayerDetails> {
		const allPlayers: IPlayingPlayer[] = game.players;
		const updatedPlayer: IPlayer = {
			...details.player,
			id: this.idService.generateID(14),
		};

		if (game.players.length < 2) {
			allPlayers.push(this.createPlayingPlayerObj(updatedPlayer));
			return this.db.collection(this.ENVIRONMENT).get().pipe(
				map((data) => data.docs.filter((doc) => doc.data().id === id)[0]),
				tap((data) => {
					this.db.collection(this.ENVIRONMENT).doc(id).set({
						...data.data(),
						players: allPlayers,
					}).catch((err) => console.log(err));
				}),
				map(() => {
					const playerObj: IPersonalPlayerDetails = {
						gameId: id,
						player: updatedPlayer,
						player1: false,
					};
					return playerObj;
				}),
			);
		}
	}

	/**
	 * returns game based on ID
	 * @param id ID of game
	 */
	public getGame(id: string): Observable<IGame> {
		return this.db.collection(this.ENVIRONMENT).doc(id).get().pipe(
			map((data) => (data.data() as IGame)),
		);
	}

	public updateGame(game: IGame): Promise<void> {
		return this.db.collection(getCurrentEnvironment(Collections.games)).doc(game.id).set(game);
	}

	/**
	 * grabs observable of game based on ID
	 * @param id ID of game
	 * @returns Observable of game
	 */
	public listenToGame(id: string): Observable<any> {
		return this.db.collection(this.ENVIRONMENT).doc(id).valueChanges();
	}

	private createPlayingPlayerObj(player: IPlayer): IPlayingPlayer {
		const newPlayerId: string = this.idService.generateID(14);
		return {
			player: {
				name: player.name,
				winTag: player.winTag,
				lossTag: player.lossTag,
				id: player.id ? player.id : newPlayerId,
			},
			attackDamage: this.baseStat,
			magicDamage: this.baseStat,
			magicResist: this.baseStat,
			armorResist: this.baseStat,
			dead: false,
			health: this.baseHealth,
			id: player.id ? player.id : newPlayerId,
			blocking: false,
			blockAmount: 0,
			currency: 0,
			items: []
		};
	}
}
