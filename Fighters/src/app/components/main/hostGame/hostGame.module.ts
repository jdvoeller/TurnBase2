import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { HostGameComponent } from './hostGame.component';
import { CancelAndSubmitModule } from '../../commonComponents/cancelAndSubmit/cancelAndSubmit.module';

@NgModule({
	imports: [
		CommonModule,
		MatCardModule,
		MatInputModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatButtonModule,

		CancelAndSubmitModule,
	],
	exports: [HostGameComponent],
	declarations: [HostGameComponent],
})
export class HostGameModule { }
