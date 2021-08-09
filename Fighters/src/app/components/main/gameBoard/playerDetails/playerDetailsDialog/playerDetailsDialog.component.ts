import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { IItem, IItemTotals } from '../../../../../models/game/item';
import { IPlayingPlayer } from '../../../../../models/player';
import { ItemDamageService } from '../../../../../services/itemDamage.service';
import { IItemDescriptionData, ItemDescriptionDialogComponent } from '../../shop/itemDescriptionDialog/itemDescriptiondialog.component';

@Component({
	selector: 'player-details-dialog',
	templateUrl: 'playerDetailsDialog.component.html',
	styleUrls: ['playerDetailsDialog.component.css'],
})

export class PlayerDetailsDialogComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA) public player: IPlayingPlayer,
		private dialog: MatDialog,
		private itemDamageService: ItemDamageService,
	) { }

	public openDetails(item: IItem): void {

		const DATA: IItemDescriptionData = {
			item,
			player: this.player,
			hideActions: true,
		};

		this.dialog.open(ItemDescriptionDialogComponent, { data: DATA });
	}

	public get playerItemTotals(): IItemTotals {
		return this.itemDamageService.itemTotals(this.player.items);
	}
}
