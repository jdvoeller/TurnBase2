import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule } from '@angular/material';

import { YourTurnDialogComponent } from './yourTurnDialog.component';

@NgModule({
	imports: [
		CommonModule,
		MatDialogModule,
		MatButtonModule,
	],
	exports: [YourTurnDialogComponent],
	declarations: [YourTurnDialogComponent],
})
export class YourTurnDialogModule { }
