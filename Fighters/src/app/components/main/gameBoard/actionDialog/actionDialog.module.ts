import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';
import { ShopModule } from '../shop/shop.module';

import { ActionDialogComponent } from './actionDialog.component';

@NgModule({
	imports: [
		CommonModule,
		MatDialogModule,
		MatButtonModule,
		MatIconModule,

		ShopModule,
	],
	exports: [ActionDialogComponent],
	declarations: [ActionDialogComponent],
})
export class ActionDialogModule { }
