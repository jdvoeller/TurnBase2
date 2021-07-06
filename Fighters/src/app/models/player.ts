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
}
