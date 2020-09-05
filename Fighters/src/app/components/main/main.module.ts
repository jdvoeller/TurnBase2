import { NgModule } from '@angular/core';

import { MainComponent } from './main.component';
import { NavBarModule } from './navBar/navBar.module';
import { UserSettingsModule } from './userSettings/userSettings.module';
import { MainRoutingModule } from './main.routing';

@NgModule({
	imports: [
		NavBarModule,

		UserSettingsModule,
		MainRoutingModule,
	],
	exports: [MainComponent],
	declarations: [MainComponent],
})
export class MainModule { }
