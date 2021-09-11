import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MessagesComponent } from './messages.component';

@NgModule({
	imports: [
		CommonModule,
	],
	exports: [MessagesComponent],
	declarations: [MessagesComponent],
})
export class MessagesModule { }
