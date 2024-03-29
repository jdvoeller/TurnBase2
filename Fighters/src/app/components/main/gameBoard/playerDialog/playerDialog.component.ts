import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { IPersonalPlayerDetails } from '../../../../models/player';

import { IGame } from '../../../../models/game/game';
import { GameService } from '../../../../services/game.service';

@Component({
	selector: 'player-dialog',
	templateUrl: 'playerDialog.component.html',
	styleUrls: ['playerDialog.component.css'],
})

export class PlayerDialogComponent {
	public createMatch = false;
	public joinMatch = false;
	public form: FormGroup;
	public showIdError = false;

	constructor(
		private dialogRef: MatDialogRef<PlayerDialogComponent>,
		private fb: FormBuilder,
		private gameService: GameService,
	) {
		this.form = this.newForm;
	}

	public create(create: boolean): void {
		if (create) {
			this.createMatch = true;
			this.joinMatch = false;
		} else {
			this.joinMatch = true;
			this.createMatch = false;
		}
	}

	public revert(): void {
		this.createMatch = false;
		this.joinMatch = false;
		this.form = this.newForm;
	}

	public setupGame() {
		if (this.createMatch) {
			this.gameService.setupGame(this.form.value).subscribe((details) => this.dialogRef.close(details));
		} else if (this.joinMatch) {
			this.gameService.getGame(this.form.get('gameId').value).subscribe((data: IGame) => {
				if (data) {
					this.showIdError = false;
					const game: IGame = {
						...data,
						id: data.id,
					};

					const joinDetails: IPersonalPlayerDetails = {
						player: {
							name: this.form.get('name').value,
							winTag: this.form.get('winTag').value,
							lossTag: this.form.get('lossTag').value,
							id: '',
						},
						gameId: data.id,
						player1: false,
					};

					this.gameService.joinGame(game.id, game, joinDetails).subscribe((details: any) => {
						this.dialogRef.close(details);
					});
				} else {
					this.showIdError = true;
				}
			});
		}
	}

	private get newForm(): FormGroup {
		return this.fb.group({
			name: ['', Validators.required],
			winTag: [''],
			lossTag: [''],
			gameId: [''],
		});
	}
}
