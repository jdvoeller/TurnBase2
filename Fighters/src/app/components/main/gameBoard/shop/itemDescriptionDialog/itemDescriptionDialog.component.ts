import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { IPlayingPlayer } from '../../../../../models/player';
import { IItem } from '../../../../../models/game/item';

export interface IItemDescriptionData {
	item: IItem;
	player: IPlayingPlayer;
	hideActions?: boolean;
	canAction: boolean;
}
@Component({
	selector: 'item-description-dialog',
	templateUrl: 'itemDescriptionDialog.component.html',
	styleUrls: ['itemDescriptionDialog.component.css'],
})

export class ItemDescriptionDialogComponent {
	constructor(
		public matDialogRef: MatDialogRef<ItemDescriptionDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: IItemDescriptionData,
	) { }

	public buy() {
		this.matDialogRef.close(this.data.item);
	}
}
