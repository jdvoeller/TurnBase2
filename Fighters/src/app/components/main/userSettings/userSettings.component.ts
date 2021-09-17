import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { PasswordChangeDialogComponent } from './passwordChangeDialog/passwordChangeDialog.component';

@Component({
	selector: 'user-settings',
	templateUrl: 'userSettings.component.html',
	styleUrls: ['userSettings.component.css'],
})

export class UserSettingsComponent {
	public userSettingsFormGroup: FormGroup;
	constructor(
		private fb: FormBuilder,
		private dialog: MatDialog,
	) {
		this.userSettingsFormGroup = this.setForm();
	}

	public openPasswordChangeDialog() {
		this.dialog.open(PasswordChangeDialogComponent);
	}

	public cancel() {
		this.userSettingsFormGroup = this.setForm();
	}

	private setForm(): FormGroup {
		return this.fb.group({
			displayName: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			bio: ['', Validators.maxLength(250)],
		});
	}
}
