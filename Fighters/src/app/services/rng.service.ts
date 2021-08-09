import { Injectable } from '@angular/core';

@Injectable()
export class RngService {
	public roll(max: number): number {
		return 1 + Math.floor(Math.random() * (max - 1));
	}

	public totalCritDamage(critBonus: number): number {
		const ROLL = this.roll(13);

		if (ROLL + critBonus >= 7) {
			return this.roll(6);
		}
		return 0;
	}
}
