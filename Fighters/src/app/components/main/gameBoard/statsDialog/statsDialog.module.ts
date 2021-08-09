import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatInputModule } from '@angular/material';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';

import { StatsDialogComponent } from './statsDialog.component';
import { GameService } from 'src/app/services/game.service';

@NgModule({
	imports: [
		CommonModule,
		MatDialogModule,
		MatButtonModule,
		ReactiveFormsModule,
		MatInputModule,
		MatSliderModule,
		MatSelectModule,
	],
	exports: [StatsDialogComponent],
	declarations: [StatsDialogComponent],
	providers: [GameService],
})
export class StatsDialogModule { }
