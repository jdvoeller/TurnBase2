import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { MainModule } from './components/main/main.module';
import { environment } from '../environments/environment';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		MainModule,
		BrowserAnimationsModule,

		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
