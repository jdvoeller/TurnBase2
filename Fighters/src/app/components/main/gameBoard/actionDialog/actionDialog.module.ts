import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatIconModule, MatProgressBarModule } from '@angular/material';
import { CheatMenuDialogComponent } from '../cheatMenu/cheatMenu.component';
import { CheatMenuDialogModule } from '../cheatMenu/cheatMenu.module';
import { ShopModule } from '../shop/shop.module';

import { ActionDialogComponent } from './actionDialog.component';

@NgModule({
	imports: [
		CommonModule,
		MatDialogModule,
		MatButtonModule,
		MatIconModule,
		MatProgressBarModule,

		ShopModule,
		CheatMenuDialogModule,
	],
	exports: [ActionDialogComponent],
	declarations: [ActionDialogComponent],
	entryComponents: [CheatMenuDialogComponent],
})
export class ActionDialogModule { }
