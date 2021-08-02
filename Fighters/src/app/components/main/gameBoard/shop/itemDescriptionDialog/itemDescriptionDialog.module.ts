import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';

import { ItemDescriptionDialogComponent } from './itemDescriptiondialog.component';

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatDialogModule,
	],
	exports: [ItemDescriptionDialogComponent],
	declarations: [ItemDescriptionDialogComponent],
})
export class ItemDescriptionDialogModule { }
