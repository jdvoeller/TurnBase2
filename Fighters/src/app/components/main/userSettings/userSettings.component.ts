import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'user-settings',
	templateUrl: 'userSettings.component.html',
	styleUrls: ['userSettings.component.css'],
})

export class UserSettingsComponent {
	public userSettingsFormGroup: FormGroup;
	constructor(
		private fb: FormBuilder,
	) {
		this.userSettingsFormGroup = this.fb.group({
			displayName: ['', Validators.required],
			email: ['', Validators.required],
			bio: [''],
			password: this.fb.group({
				currentPassword: [''],
				newPassword: [''],
				newPasswordConfirmed: ['']
			}),
		});
	}

}
