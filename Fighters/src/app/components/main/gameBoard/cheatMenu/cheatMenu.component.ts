import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GameService } from 'src/app/services/game.service';

import { IGame } from '../../../../models/game/game';
import { IPlayingPlayer } from '../../../../models/player';

export interface ICheatData {
	player: IPlayingPlayer;
	game: IGame;
}

@Component({
	selector: 'cheat-menu-dialog',
	templateUrl: 'cheatMenu.component.html',
	styleUrls: ['cheatMenu.component.css'],
})

export class CheatMenuDialogComponent {
	public form: FormGroup;

	constructor(
		private dialogRef: MatDialogRef<CheatMenuDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: ICheatData,
		private fb: FormBuilder,
		private gameService: GameService,
	) {
		this.form = this.fb.group({
			attackDamage: [data.player.attackDamage],
			magicDamage: [data.player.magicDamage],
			magicResist: [data.player.magicResist],
			armorResist: [data.player.armorResist],
			health: [data.player.health],
		});
	}

	public updateStats(): void {
		const updatedGame: IGame = {
			...this.data.game,
			players: [
				...this.data.game.players.map((player) => {
					if (player.id === this.data.player.id) {
						return {
							...player,
							attackDamage: parseInt(this.form.get('attackDamage').value, 0),
							magicDamage: parseInt(this.form.get('magicDamage').value, 0),
							armorResist: parseInt(this.form.get('armorResist').value, 0),
							magicResist: parseInt(this.form.get('magicResist').value, 0),
							health: parseInt(this.form.get('health').value, 0),
						};
					}
					return player;
				}),
			],
		};
		this.gameService.updateGame(updatedGame).then(() => this.dialogRef.close());
	}

}
