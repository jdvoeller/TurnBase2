import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatIconModule, MatInputModule } from '@angular/material';

import { GameService } from '../../../../services/gameService.service';
import { PlayerDialogComponent } from './playerDialog.component';

@NgModule({
	imports: [
		CommonModule,
		MatDialogModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		ReactiveFormsModule,
	],
	exports: [PlayerDialogComponent],
	declarations: [PlayerDialogComponent],
	providers: [GameService],
})
export class PlayerDialogModule { }
