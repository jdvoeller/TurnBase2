import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { CancelAndSubmitModule } from '../../commonComponents/cancelAndSubmit/cancelAndSubmit.module';
import { JoinGameComponent } from './joinGame.component';

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
	exports: [JoinGameComponent],
	declarations: [JoinGameComponent],
})
export class JoinGameModule { }
