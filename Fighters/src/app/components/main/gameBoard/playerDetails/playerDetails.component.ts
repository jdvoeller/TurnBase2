import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { IPlayingPlayer } from '../../../../models/player';
import { PlayerDetailsDialogComponent } from './playerDetailsDialog/playerDetailsDialog.component';

@Component({
	selector: 'player-details',
	templateUrl: 'playerDetails.component.html',
	styleUrls: ['playerDetails.component.css'],
})

export class PlayerDetailsComponent {
	@Input() public enemy: boolean;
	@Input() public player: IPlayingPlayer;
	@Input() public showOtherData = false;
	@Input() public myTurn = false;
	constructor(
		private dialog: MatDialog,
	) { }

	public openDetails(): void {
		this.dialog.open(PlayerDetailsDialogComponent, { data: this.player });
	}
}
