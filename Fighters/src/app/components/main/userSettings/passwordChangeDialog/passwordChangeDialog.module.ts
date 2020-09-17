import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { PasswordChangeDialogComponent } from './passwordChangeDialog.component';

@NgModule({
	imports: [
		MatDialogModule,
		CommonModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
	],
	exports: [PasswordChangeDialogComponent],
	declarations: [PasswordChangeDialogComponent],
})
export class PasswordChangeDialogModule { }
