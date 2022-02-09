import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatIconModule, MatInputModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { LoginComponent } from './login.component';

@NgModule({
	imports: [
		CommonModule,
		MatCardModule,
		MatButtonModule,
		MatInputModule,
		MatIconModule,
		ReactiveFormsModule,
		RouterModule,
	],
	exports: [LoginComponent],
	declarations: [LoginComponent],
	providers: [AuthService],
})
export class LoginModule { }
