import { UserInfo } from 'firebase';

export interface IUser extends UserInfo {
	firstName: string;
	lastName?: string;
	wins: number;
	losses: number;
	winTag?: string;
	lossTag?: string;
}
