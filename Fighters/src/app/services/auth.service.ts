import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { IUser } from '../models/user';
import { Collections, getCurrentEnvironment } from '../../environments/environment';

export interface ISigningUser {
	email: string;
	password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
	user$: Observable<IUser>;

	constructor(
		private afAuth: AngularFireAuth,
		private db: AngularFirestore,
		private router: Router,
	) {
		this.user$ = this.afAuth.authState.pipe(
			switchMap((user) => {
				if (user) {
					return this.db.doc(getCurrentEnvironment(Collections.users)).valueChanges();
				} else {
					return of(null);
				}
			})
		);
	}

	public signUp(newUser: ISigningUser): Promise<firebase.auth.UserCredential> {
		return this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password).catch((e) => {
			console.log(e);
			return e;
		});
	}

	public login(newUser: ISigningUser): Promise<firebase.auth.UserCredential> {
		return this.afAuth.auth.signInWithEmailAndPassword(newUser.email, newUser.password);
	}

	public logout() {
		this.afAuth.auth.signOut();
	}
}
