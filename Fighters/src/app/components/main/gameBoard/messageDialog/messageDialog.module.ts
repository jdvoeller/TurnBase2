import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatIconModule, MatInputModule } from '@angular/material';
import { GameService } from '../../../../services/gameService.service';

import { MessageDialogComponent } from './messageDialog.component';

@NgModule({
	imports: [
		CommonModule,
		MatDialogModule,
		MatInputModule,
		MatIconModule,
		MatButtonModule,
		FormsModule,
	],
	exports: [MessageDialogComponent],
	declarations: [MessageDialogComponent],
	providers: [GameService],
})
export class MessageDialogModule { }
