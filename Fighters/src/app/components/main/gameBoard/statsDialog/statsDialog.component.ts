import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { IGame } from '../../../../models/game/game';
import { GameService } from '../../../../services/game.service';
import { IPersonalPlayerDetails, IPlayingPlayer } from '../../../../models/player';

enum DropdownOption {
	attackDamage = 'attackDamage',
	magicDamage = 'magicDamage',
	armorResist = 'armorResist',
	magicResist = 'magicResist',
	health = 'health',
}

interface IDropdownOptions {
	controlName: DropdownOption;
	fieldString: string;
}

export interface IStatsDialogData {
	game: IGame;
	playerDetails: IPersonalPlayerDetails;
}

@Component({
	selector: 'stats-dialog',
	templateUrl: 'statsDialog.component.html',
	styleUrls: ['statsDialog.component.css']
})

export class StatsDialogComponent {
	public form: FormGroup;
	public maxPoints = 30;
	public totalPoints = this.maxPoints;
	public formValues: number[] = [
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
		10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
		20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
		30,
	];

	public dropDownOptions: IDropdownOptions[] = [
		{
			controlName: DropdownOption.armorResist,
			fieldString: 'Armor Resist',
		},
		{
			controlName: DropdownOption.attackDamage,
			fieldString: 'Attack Damage',
		},
		{
			controlName: DropdownOption.health,
			fieldString: 'Extra Health',
		},
		{
			controlName: DropdownOption.magicDamage,
			fieldString: 'Magic Damage',
		},
		{
			controlName: DropdownOption.magicResist,
			fieldString: 'Magic Resist',
		},
	];

	constructor(
		private fb: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public statsData: IStatsDialogData,
		private dialogRef: MatDialogRef<StatsDialogComponent>,
		private gameService: GameService,
	) {
		this.form = this.fb.group({
			attackDamage: [0],
			magicDamage: [0],
			armorResist: [0],
			magicResist: [0],
			health: [0],
		});

		this.form.valueChanges.subscribe((data) => {
			let pointsArray = Object.values(data);
			pointsArray = pointsArray.map((data2: string) => parseInt(data2, 0));

			let pointsTotal = 0;
			for (let i = 0; i < pointsArray.length; i++) {
				pointsTotal += (pointsArray[i] as number);
			}
			this.totalPoints = (this.maxPoints - pointsTotal);
		});
	}

	public revert(): void {
		this.form.get('attackDamage').setValue(0);
		this.form.get('magicDamage').setValue(0);
		this.form.get('armorResist').setValue(0);
		this.form.get('magicResist').setValue(0);
		this.form.get('health').setValue(0);
		this.totalPoints = this.maxPoints;
		this.form.markAsPristine();
		this.form.markAsUntouched();
	}

	public submit(): void {
		if (this.savable) {
			const newPlayerValues: Partial<IPlayingPlayer> = this.convertFormValuesToNumbers;
			// tslint:disable-next-line
			let updatedGame: IGame = {
				...this.statsData.game,
				players: [
					...this.statsData.game.players.map((player) => {
						if (player.id === this.statsData.playerDetails.player.id) {
							return {
								...player,
								attackDamage: player.attackDamage + newPlayerValues.attackDamage,
								magicDamage: player.magicDamage + newPlayerValues.magicDamage,
								armorResist: player.armorResist + newPlayerValues.armorResist,
								magicResist: player.magicResist + newPlayerValues.magicResist,
								health: player.health + newPlayerValues.health,
							};
						}
						return player;
					}),
				],
			};

			if (this.statsData.playerDetails.player1) {
				updatedGame.player1PickedStats = true;
			}

			if (!this.statsData.playerDetails.player1) {
				updatedGame.gameStarted = true;
				updatedGame.playerOneTurn = true;
			}

			this.gameService.updateGame(updatedGame).then(() => this.dialogRef.close());
		}
	}

	public get savable(): boolean {
		return this.form.valid && this.form.touched && (this.totalPoints >= 0 && this.totalPoints < 30);
	}

	private get convertFormValuesToNumbers(): Partial<IPlayingPlayer> {
		return {
			attackDamage: parseInt(this.form.get(DropdownOption.attackDamage).value, 0),
			magicDamage: parseInt(this.form.get(DropdownOption.magicDamage).value, 0),
			armorResist: parseInt(this.form.get(DropdownOption.armorResist).value, 0),
			magicResist: parseInt(this.form.get(DropdownOption.magicResist).value, 0),
			health: parseInt(this.form.get(DropdownOption.health).value, 0),
		};
	}
}
