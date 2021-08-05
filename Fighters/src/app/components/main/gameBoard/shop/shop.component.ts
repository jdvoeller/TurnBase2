import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { IPlayingPlayer } from '../../../../models/player';
import { GAME_ITEMS, IItem, ItemNames } from '../../../../models/game/item';
import { ActionDialogComponent } from '../actionDialog/actionDialog.component';
import { IItemDescriptionData, ItemDescriptionDialogComponent } from './itemDescriptionDialog/itemDescriptiondialog.component';

@Component({
	selector: 'shop',
	templateUrl: 'shop.component.html',
	styleUrls: ['shop.component.css'],
})

export class ShopComponent {
	@Input() public player: IPlayingPlayer;
	public shopItems: IItem[] = GAME_ITEMS;

	constructor(
		private dialog: MatDialog,
		private dialogRef: MatDialogRef<ActionDialogComponent>,
	) { }

	public openItem(item: IItem) {
		const ITEM_DESCRIPTION_DATA: IItemDescriptionData = {
			item: item,
			player: this.player,
		};

		this.dialog.open(ItemDescriptionDialogComponent, { data: ITEM_DESCRIPTION_DATA }).afterClosed().subscribe((data) => {
			if (data) {
				this.dialogRef.close(data);
			}
		});
	}

	public playerHasItem(item: IItem): boolean {
		if (item.name === ItemNames.xRayEyes) {
			return !!this.player.items.filter((playerItem) => playerItem.name === item.name).length;
		} else {
			return false;
		}
	}
}
