import { Component, Input, OnInit } from '@angular/core';

import { IPlayingPlayer } from '../../../../models/player';

@Component({
	selector: 'player-details',
	templateUrl: 'playerDetails.component.html',
	styleUrls: ['playerDetails.component.css'],
})

export class PlayerDetailsComponent implements OnInit {
	@Input() public player: IPlayingPlayer;
	@Input() public showOtherData = false;
	constructor() { }

	ngOnInit() {
	}
}
