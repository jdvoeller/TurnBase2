import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSettingsComponent } from './userSettings/userSettings.component';

export const routes: Routes = [
	{ path: '', redirectTo: '/userSettings', pathMatch: 'full' },
	{ path: 'userSettings', component: UserSettingsComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]

})
export class MainRoutingModule { }
