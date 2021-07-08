import { IPlayingPlayer } from '../player';
import { IMessage } from './message';

export interface IGame {
	// Game Details
	gameStarted: boolean;
	playerOneTurn: boolean;
	gameOver: boolean;
	player1PickedStats: boolean;
	id: string;

	// Player
	players: IPlayingPlayer[];

	// Messages
	messages: IMessage[];
}
