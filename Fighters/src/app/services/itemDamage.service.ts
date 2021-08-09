import { Injectable } from '@angular/core';

import { IItem, IItemTotals } from '../models/game/item';

@Injectable()
export class ItemDamageService {
	constructor() { }

	public itemTotals(items: IItem[]): IItemTotals {
		// tslint:disable-next-line
		let total: IItemTotals = {
			magicDamage: 0,
			attackDamage: 0,
			magicResist: 0,
			armorResist: 0,
		};

		items.forEach((item) => {
			total.magicDamage += !!item.magicDamage ? item.magicDamage : 0;
			total.attackDamage += !!item.attackDamage ? item.attackDamage : 0;
			total.magicResist += !!item.magicResist ? item.magicResist : 0;
			total.armorResist += !!item.armorResist ? item.armorResist : 0;
		});
		return total;
	}
}
