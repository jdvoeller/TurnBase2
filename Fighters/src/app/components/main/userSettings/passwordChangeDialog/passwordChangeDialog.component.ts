import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'password-change-dialog',
	templateUrl: 'passwordChangeDialog.component.html',
	styleUrls: ['passwordChangeDialog.component.css'],
})

export class PasswordChangeDialogComponent {
	public passwordChangeForm: FormGroup;
	constructor(
		public dialogRef: MatDialogRef<PasswordChangeDialogComponent>,
		private fb: FormBuilder,
	) {
		this.passwordChangeForm = this.fb.group({
			currentPassword: ['', Validators.required],
			newPassword: ['', Validators.required],
			newPasswordConfirm: ['', Validators.required],
		});
	}

	public cancel() {
		this.dialogRef.close();
	}
}
