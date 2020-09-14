import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'join-game',
	templateUrl: 'joinGame.component.html',
	styleUrls: ['joinGame.component.css'],
})

export class JoinGameComponent {
	public joinForm: FormGroup;
	constructor(private fb: FormBuilder) {
		this.joinForm = this.fb.group({
			roomName: ['', Validators.required],
			password: ['', Validators.required],
		});
	}
}
