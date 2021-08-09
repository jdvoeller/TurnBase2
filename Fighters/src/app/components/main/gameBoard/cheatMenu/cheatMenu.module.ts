import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatInputModule } from '@angular/material';

import { GameService } from '../../../../services/game.service';

import { CheatMenuDialogComponent } from './cheatMenu.component';

@NgModule({
	imports: [
		MatDialogModule,
		CommonModule,
		MatButtonModule,
		MatInputModule,
		ReactiveFormsModule,
	],
	exports: [CheatMenuDialogComponent],
	declarations: [CheatMenuDialogComponent],
	providers: [
		GameService,
	],
})
export class CheatMenuDialogModule { }
