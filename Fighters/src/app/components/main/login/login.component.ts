import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
	public loginError: string;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router,
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
		if (this.loginForm) {
			this.form.removeControl('passwordConfirmation');
		} else {
			this.addPasswordConfirmationControl();
		}
		this.loginForm = !this.loginForm;
		this.restoreForm();
	}

	public submit(): void {
		this.loginError = '';
		if (this.form.valid) {
			if (!this.loginForm && this.form.get('password').value !== this.form.get('passwordConfirmation').value) {
				this.passwordsMatch = false;
			} else if (this.loginForm) {
				this.authService.login({
					email: this.form.get('email').value,
					password: this.form.get('password').value,
				}).then((data) => this.router.navigateByUrl('testGame')).catch((e) => this.setLoginError(e));
			} else {
				this.authService.signUp({
					email: this.form.get('email').value,
					password: this.form.get('password').value,
				}).then((value) => {
					if (value.message) {
						this.setLoginError(value.message);
					} else {
						this.authService.createNewUserObject(value.user.email, value.user.uid).then(() => this.router.navigateByUrl('testGame'));
					}
				});
			}
		}
	}

	public restoreForm(): void {
		this.setNewFormGroup();
		this.form.markAsPristine();
		this.form.markAsUntouched();
		this.passwordsMatch = true;
		this.visiblePassword = false;
		this.loginError = '';
		(<HTMLInputElement>document.getElementById('password')).type = 'password';

		if (!this.loginForm) {
			(<HTMLInputElement>document.getElementById('passwordConfirmation')).type = 'password';
		}
	}

	private setLoginError(error: any): void {
		console.log(error);
		this.loginError = error;
	}

	private setNewFormGroup(): void {
		this.form = this.fb.group({
			email: ['', [
				Validators.required,
				Validators.email,
			]],
			password: ['', [
				Validators.required,
				Validators.minLength(6),
			]],
		});

		if (!this.loginForm) {
			this.addPasswordConfirmationControl();
		}
	}

	private addPasswordConfirmationControl(): void {
		this.form.addControl('passwordConfirmation', new FormControl('', Validators.required));
	}
}
