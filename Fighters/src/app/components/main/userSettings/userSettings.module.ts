import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';

import { UserSettingsComponent } from './userSettings.component';
import { PasswordChangeDialogModule } from './passwordChangeDialog/passwordChangeDialog.module';
import { PasswordChangeDialogComponent } from './passwordChangeDialog/passwordChangeDialog.component';
import { CancelAndSubmitModule } from '../../commonComponents/cancelAndSubmit/cancelAndSubmit.module';

@NgModule({
	imports: [
		CommonModule,
		MatCardModule,
		MatInputModule,
		MatButtonModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatDividerModule,
		MatDialogModule,

		PasswordChangeDialogModule,
		CancelAndSubmitModule,
	],
	exports: [UserSettingsComponent],
	declarations: [UserSettingsComponent],
	entryComponents: [PasswordChangeDialogComponent],
})
export class UserSettingsModule { }
