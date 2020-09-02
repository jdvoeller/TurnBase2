export interface IPublicPlayer {
	name: string;
	profilePicURL: string;
	wins: number;
	losses: number;
}

export interface IPrivatePlayer extends IPublicPlayer {
	id: string;
	email: string;
}
