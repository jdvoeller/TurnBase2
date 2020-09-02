import { IPublicPlayer } from '../player';

export interface IGame {
	password: string;
	hostName: string;
	started: boolean;
	completed: boolean;
	players: IPublicPlayer[];
	id: number;
}
