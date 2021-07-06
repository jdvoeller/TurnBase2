import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserSettingsComponent } from './userSettings/userSettings.component';
import { HostGameComponent } from './hostGame/hostGame.component';
import { JoinGameComponent } from './joinGame/joinGame.component';
import { TestGameComponent } from './testGame/testGame.component';

export const routes: Routes = [
	{ path: '', redirectTo: '/userSettings', pathMatch: 'full' },
	{ path: 'userSettings', component: UserSettingsComponent },
	{ path: 'hostGame', component: HostGameComponent },
	{ path: 'joinGame', component: JoinGameComponent },
	{ path: 'testGame', component: TestGameComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]

})
export class MainRoutingModule { }
