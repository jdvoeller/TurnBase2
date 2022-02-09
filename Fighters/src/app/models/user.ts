export interface IUser {
	email: string;
	uid: string;
	firstName?: string;
	lastName?: string;
	wins?: number;
	losses?: number;
	winTag?: string;
	lossTag?: string;
}
