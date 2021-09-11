import { IPlayingPlayer } from '../player';
import { GAME_ITEMS } from './item';
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
				name: 'Jordan',
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
			currency: 1000,
			items: GAME_ITEMS,
		},
		{
			player: {
				name: 'Brittney',
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
			currency: 1000,
			items: []
		},
	],
};
