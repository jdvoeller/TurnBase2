import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatDialogModule, MatIconModule } from '@angular/material';
import { ItemDescriptionDialogComponent } from './itemDescriptionDialog/itemDescriptiondialog.component';
import { ItemDescriptionDialogModule } from './itemDescriptionDialog/itemDescriptionDialog.module';

import { ShopComponent } from './shop.component';

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatCardModule,
		MatDialogModule,

		ItemDescriptionDialogModule,
	],
	exports: [ShopComponent],
	declarations: [ShopComponent],
	entryComponents: [ItemDescriptionDialogComponent],
})
export class ShopModule { }
