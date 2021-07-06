import { IPlayingPlayer } from '../player';
import { IMessage } from './message';

export interface IGame {
	// Game Details
	gameStarted: boolean;
	playerOneTurn: boolean;
	gameOver: boolean;
	id: string;

	// Player
	players: IPlayingPlayer[];

	// Messages
	messages: IMessage[];
}
