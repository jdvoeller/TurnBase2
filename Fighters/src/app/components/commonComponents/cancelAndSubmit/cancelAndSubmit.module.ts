import { NgModule } from '@angular/core';

import { CancelAndSubmitComponent } from './cancelAndSubmit.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule
	],
	exports: [CancelAndSubmitComponent],
	declarations: [CancelAndSubmitComponent],
	providers: [],
})
export class CancelAndSubmitModule { }
