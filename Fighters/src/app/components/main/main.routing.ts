import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestGameComponent } from './testGame/testGame.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: 'testGame', component: TestGameComponent },
	{ path: 'login', component: LoginComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]

})
export class MainRoutingModule { }
