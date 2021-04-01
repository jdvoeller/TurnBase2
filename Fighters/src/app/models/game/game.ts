// import { IPublicPlayer } from '../player';

export interface IGame {
	password: string;
	roomName: string;
	active: boolean;
	hostName: string;
	// TODO: bring this in when you have auth setup
	// players: IPublicPlayer[];
}
