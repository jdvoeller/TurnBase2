import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IItem } from '../../../../../models/game/item';

@Component({
	selector: 'item-description-dialog',
	templateUrl: 'itemDescriptionDialog.component.html',
	styleUrls: ['itemDescriptionDialog.component.css'],
})

export class ItemDescriptionDialogComponent {
	constructor(
		public matDialogRef: MatDialogRef<ItemDescriptionDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public item: IItem,
	) { }

	public buy() {
		this.matDialogRef.close(this.item);
	}
}
