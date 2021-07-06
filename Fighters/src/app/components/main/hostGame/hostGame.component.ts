import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { IGame } from 'src/app/models/game/game';

@Component({
	selector: 'host-game',
	templateUrl: 'hostGame.component.html',
	styleUrls: ['hostGame.component.css'],
})
export class HostGameComponent {
	public roomSetupForm: FormGroup;
	constructor(
		private fb: FormBuilder,
		public db: AngularFirestore,
	) {
		this.roomSetupForm = this.fb.group({
			hostName: ['', Validators.required],
			roomName: ['', Validators.required],
			password: ['', Validators.required],
			confirmPassword: [''],
		});

		this.roomSetupForm.get('confirmPassword').setValidators([Validators.required, this.bothPasswordFieldsMatch()]);
	}

	public submit() {
		// if (this.roomSetupForm.valid) {
		// 	const newGame: IGame = {
		// 		hostName: this.roomSetupForm.get('hostName').value,
		// 		password: this.roomSetupForm.get('password').value,
		// 		roomName: this.roomSetupForm.get('roomName').value,
		// 		active: true,
		// 	};
		// 	this.db.collection('/games').add(newGame).then((data) => console.log(data));
		// }
	}

	private bothPasswordFieldsMatch(): ValidatorFn {
		return (control: AbstractControl): {[key: string]: any} | null => {
			const passwordControl = this.roomSetupForm.get('password');
			const match = control.value === passwordControl.value;
			return !match ? { passwordsDoNotMatch: { value: `${control.value} !== ${passwordControl.value}` } } : null;
		};
	}
}
