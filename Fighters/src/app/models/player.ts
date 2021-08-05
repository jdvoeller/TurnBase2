import { IItem } from './game/item';

export interface IPlayer {
	name: string;
	winTag: string;
	lossTag: string;
	id: string;
	// profilePicURL: string;
	// wins: number;
	// losses: number;
}

export interface IPlayingPlayer {
	player: IPlayer;
	attackDamage: number;
	magicDamage: number;
	magicResist: number;
	armorResist: number;
	dead: boolean;
	health: number;
	id: string;
	blocking: boolean;
	blockAmount: number;
	currency: number;
	items: IItem[];
}

export interface IPlayerWithItems extends IPlayingPlayer {
	crit: boolean;
}
