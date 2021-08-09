import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { ItemDamageService } from '../../../../../services/itemDamage.service';
import { ItemDescriptionDialogComponent } from '../../shop/itemDescriptionDialog/itemDescriptiondialog.component';
import { ItemDescriptionDialogModule } from '../../shop/itemDescriptionDialog/itemDescriptionDialog.module';

import { PlayerDetailsDialogComponent } from './playerDetailsDialog.component';

@NgModule({
	imports: [
		CommonModule,
		MatDialogModule,
		MatButtonModule,
		MatIconModule,
		MatDividerModule,

		ItemDescriptionDialogModule,
	],
	exports: [PlayerDetailsDialogComponent],
	declarations: [PlayerDetailsDialogComponent],
	providers: [
		ItemDamageService
	],
	entryComponents: [ItemDescriptionDialogComponent]
})
export class PlayerDetailsDialogModule { }
