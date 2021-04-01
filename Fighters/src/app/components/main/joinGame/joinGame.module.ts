import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { JoinGameComponent } from './joinGame.component';
import { MatIconModule } from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		MatCardModule,
		MatInputModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatTableModule,
		MatIconModule,
	],
	exports: [JoinGameComponent],
	declarations: [JoinGameComponent],
})
export class JoinGameModule { }
