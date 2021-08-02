import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IPlayingPlayer } from 'src/app/models/player';

@Component({
	selector: 'action-dialog',
	templateUrl: 'actionDialog.component.html',
	styleUrls: ['actionDialog.component.css'],
})

export class ActionDialogComponent {
	public showShop = false;

	constructor(
		@Inject(MAT_DIALOG_DATA) public player: IPlayingPlayer,
		public dialogRef: MatDialogRef<ActionDialogComponent>
	) {	}

	public attack(): void {
		this.dialogRef.close('attack');
	}

	public shop(): void {
		this.showShop = true;
	}

	public earnCoin(): void {
		this.dialogRef.close('coin');
	}
}
