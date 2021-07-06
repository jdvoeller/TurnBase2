import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { IGame } from 'src/app/models/game/game';
import { GameService } from 'src/app/services/gameService.service';

@Component({
	selector: 'player-dialog',
	templateUrl: 'playerDialog.component.html',
	styleUrls: ['playerDialog.component.css'],
})

export class PlayerDialogComponent {
	public createMatch = false;
	public joinMatch = false;
	public form: FormGroup;

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
			this.gameService.setupGame(this.form.value).then((details) => this.dialogRef.close(details));
		} else if (this.joinMatch) {
			this.gameService.getGame(this.form.get('gameId').value).then((data: any) => {
				const game: IGame = this.gameService.formatGameData(data.kf.nn.proto.mapValue.fields);
				this.gameService.joinGame(game.id, game, this.form.value).then((poop: any) => {
					console.log(poop);
					this.dialogRef.close(poop);
				});
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
