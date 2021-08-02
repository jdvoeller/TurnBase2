import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { IPlayingPlayer } from 'src/app/models/player';

import { GAME_ITEMS, IItem } from '../../../../models/game/item';
import { ItemDescriptionDialogComponent } from './itemDescriptionDialog/itemDescriptiondialog.component';

@Component({
	selector: 'shop',
	templateUrl: 'shop.component.html',
	styleUrls: ['shop.component.css'],
})

export class ShopComponent {
	@Input() public player: IPlayingPlayer;
	public shopItems: IItem[] = GAME_ITEMS;

	constructor(public dialog: MatDialog) { }

	public openItem(item: IItem) {
		this.dialog.open(ItemDescriptionDialogComponent, { data: item }).afterClosed().subscribe((data) => {
			if (data) {
				console.log(data);
			}
		});
	}
}
