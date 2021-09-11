import { Injectable } from '@angular/core';

@Injectable()
export class IdService {
	public generateID(length: number): string {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const characterLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * characterLength));
		}

		return result;
	}
}
