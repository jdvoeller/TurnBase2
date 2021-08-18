import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { IGame } from '../../../../models/game/game';
import { IPlayingPlayer } from '../../../../models/player';

import { CheatMenuDialogComponent } from '../cheatMenu/cheatMenu.component';

export interface IActionData {
	player: IPlayingPlayer;
	game: IGame;
	canAction: boolean;
}

@Component({
	selector: 'action-dialog',
	templateUrl: 'actionDialog.component.html',
	styleUrls: ['actionDialog.component.css'],
})

export class ActionDialogComponent {
	public showShop = false;

	constructor(
		@Inject(MAT_DIALOG_DATA) public actionData: IActionData,
		public dialogRef: MatDialogRef<ActionDialogComponent>,
		private dialog: MatDialog,
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

	public openCheatMenu(): void {
		this.dialog.open(CheatMenuDialogComponent, { data: this.actionData });
	}
}
