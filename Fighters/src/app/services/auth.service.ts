import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs';

import { IUser } from '../models/user';
import { Collections, getCurrentEnvironment } from '../../environments/environment';
import * as firebase from 'firebase';

export interface ISigningUser {
	email: string;
	password: string;
}

export interface IAuthResults {
	error?: string;
	user?: firebase.auth.UserCredential;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
	protected ENVIRONMENT = getCurrentEnvironment(Collections.users);

	public validNewUser$: Observable<boolean>;

	constructor(
		private afAuth: AngularFireAuth,
		private db: AngularFirestore,
	) {	}

	public signUp(newUser: ISigningUser): Promise<any> {
		return this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
			.then((results) => results)
			.catch((e) => e);
	}

	public login(newUser: ISigningUser): Promise<firebase.auth.UserCredential> {
		return this.afAuth.auth.signInWithEmailAndPassword(newUser.email, newUser.password);
	}

	public logout() {
		this.afAuth.auth.signOut();
	}

	public createNewUserObject(email: string, uid: string): Promise<void> {
		const newUser: IUser = {
			email,
			uid
		};

		return this.db.collection(this.ENVIRONMENT).doc(uid).set(newUser);
	}
}
