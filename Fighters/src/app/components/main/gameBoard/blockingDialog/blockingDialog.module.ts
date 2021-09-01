import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';

import { BlockingDialogComponent } from './blockingDialog.component';

@NgModule({
	imports: [
		CommonModule,
		MatDialogModule,
		MatButtonModule,
		MatIconModule,
	],
	exports: [BlockingDialogComponent],
	declarations: [BlockingDialogComponent],
})
export class BlockingDialogModule { }
