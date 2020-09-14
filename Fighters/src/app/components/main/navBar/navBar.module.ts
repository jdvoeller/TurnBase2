import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { NavBarComponent } from './navBar.component';
import { HostGameModule } from '../hostGame/hostGame.module';
import { JoinGameModule } from '../joinGame/joinGame.module';

@NgModule({
	imports: [
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatMenuModule,

		HostGameModule,
		JoinGameModule,
	],
	exports: [NavBarComponent],
	declarations: [NavBarComponent],
})
export class NavBarModule { }
