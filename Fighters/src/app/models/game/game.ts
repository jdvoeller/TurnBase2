import { IPlayingPlayer } from '../player';
import { IMessage } from './message';
import { Phase } from './phases';

export interface IGame {
	// Game Details
	gameStarted: boolean;
	playerOneTurn: boolean;
	gameOver: boolean;
	player1PickedStats: boolean;
	id: string;
	phase: Phase;

	// Player
	players: IPlayingPlayer[];

	// Messages
	messages: IMessage[];
}
