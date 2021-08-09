import { Injectable } from '@angular/core';

import { IItem, ItemNames } from '../models/game/item';
import { IPlayingPlayer } from '../models/player';

@Injectable()
export class PlayerService {
	public playerHasItem(item: ItemNames, player: IPlayingPlayer): boolean {
		return player.items.some((i: IItem) => i.name === item);
	}
}
