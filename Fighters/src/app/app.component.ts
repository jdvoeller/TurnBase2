import { Component } from '@angular/core';
import { TygaActive, ALL_ACTIVE_CHARACTERS } from './models/defaults/defaultCharacters';
import { IActiveCharacter } from './models/character/character';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor() {
		const tyga: IActiveCharacter = TygaActive;
		ALL_ACTIVE_CHARACTERS.forEach((char) => console.log(char));
	}
}
