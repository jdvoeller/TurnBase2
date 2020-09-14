import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'nav-bar',
	templateUrl: 'navBar.component.html',
	styleUrls: ['navBar.component.css']
})

export class NavBarComponent {
	constructor(private router: Router) {
	}

	public navToHostGame() {
		this.router.navigateByUrl('hostGame');
	}

	public navToUserSettings() {
		this.router.navigateByUrl('userSettings');
	}

	public navToJoinGame() {
		this.router.navigateByUrl('joinGame');
	}
}
