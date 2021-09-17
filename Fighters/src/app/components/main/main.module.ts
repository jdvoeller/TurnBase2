import { NgModule } from '@angular/core';

import { MainComponent } from './main.component';
import { NavBarModule } from './navBar/navBar.module';
import { MainRoutingModule } from './main.routing';
import { LoginModule } from './login/login.module';

@NgModule({
	imports: [
		NavBarModule,

		MainRoutingModule,
		LoginModule,
	],
	exports: [MainComponent],
	declarations: [MainComponent],
})
export class MainModule { }
