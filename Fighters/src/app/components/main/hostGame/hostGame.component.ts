import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'host-game',
	templateUrl: 'hostGame.component.html',
	styleUrls: ['hostGame.component.css'],
})

export class HostGameComponent {
	public roomSetupForm: FormGroup;
	constructor(private fb: FormBuilder) {
		this.roomSetupForm = this.fb.group({
			roomName: ['', Validators.required],
			password: ['', Validators.required],
		});
	}
}
