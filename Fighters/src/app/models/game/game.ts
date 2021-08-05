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

export const MOCK_GAME_DATA: IGame = {
	gameStarted: true,
	playerOneTurn: true,
	gameOver: false,
	player1PickedStats: true,
	id: 'ID',
	phase: Phase.attack,
	players: [
		{
			player: {
				name: 'testPlayer',
				winTag: 'yay!',
				lossTag: 'nooooooo',
				id: 'playerId'
			},
			attackDamage: 5,
			magicDamage: 5,
			magicResist: 5,
			armorResist: 5,
			dead: false,
			health: 100,
			id: 'playerId',
			blocking: false,
			blockAmount: 0,
			currency: 0,
			items: []
		},
		{
			player: {
				name: 'testPlayer2',
				winTag: 'yay!',
				lossTag: 'nooooooo',
				id: 'playerId2'
			},
			attackDamage: 5,
			magicDamage: 5,
			magicResist: 5,
			armorResist: 5,
			dead: false,
			health: 100,
			id: 'playerId2',
			blocking: false,
			blockAmount: 0,
			currency: 0,
			items: []
		},
	],
	messages: [],
};
