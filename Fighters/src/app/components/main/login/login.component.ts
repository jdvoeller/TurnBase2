import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
	selector: 'login',
	templateUrl: 'login.component.html',
	styleUrls: ['login.component.css'],
})
export class LoginComponent {
	public form: FormGroup;
	public loginForm = true;
	public passwordsMatch = true;
	public visiblePassword = false;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
	) {
		this.setNewFormGroup();
	}

	public get disableCancel(): boolean {
		return !this.form.touched && this.form.pristine;
	}

	public get disableSubmit(): boolean {
		return !this.form.valid;
	}

	public toggleVisibility(): void {
		if (this.visiblePassword) {
			(<HTMLInputElement>document.getElementById('password')).type = 'password';
			if (!this.loginForm) {
				(<HTMLInputElement>document.getElementById('passwordConfirmation')).type = 'password';
			}
		} else {
			(<HTMLInputElement>document.getElementById('password')).type = 'text';
			if (!this.loginForm) {
				(<HTMLInputElement>document.getElementById('passwordConfirmation')).type = 'text';
			}
		}
		this.visiblePassword = !this.visiblePassword;
	}

	public toggleForm(): void {
		this.loginForm = !this.loginForm;
		if (this.loginForm) {
			this.form.removeControl('passwordConfirmation');
		} else {
			this.addPasswordConfirmationControl();
		}
		this.restoreForm();
	}

	public submit(): void {
		if (this.form.valid) {
			if (!this.loginForm && this.form.get('password').value !== this.form.get('passwordConfirmation').value) {
				this.passwordsMatch = false;
			} else if (this.loginForm) {
				this.authService.login({
					email: this.form.get('email').value,
					password: this.form.get('password').value,
				});
			} else {
			}
		}
	}

	public restoreForm(): void {
		console.log(this.form.get('email'));
		this.setNewFormGroup();
		this.form.markAsPristine();
		this.form.markAsUntouched();
		this.passwordsMatch = true;
		this.visiblePassword = false;
		(<HTMLInputElement>document.getElementById('password')).type = 'password';

		if (!this.loginForm) {
			(<HTMLInputElement>document.getElementById('passwordConfirmation')).type = 'password';
		}
	}

	private setNewFormGroup(): void {
		this.form = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
		});

		if (!this.loginForm) {
			this.addPasswordConfirmationControl();
		}
	}

	private addPasswordConfirmationControl(): void {
		this.form.addControl('passwordConfirmation', new FormControl('', Validators.required));
	}
}
