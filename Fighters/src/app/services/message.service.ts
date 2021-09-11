import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Collections, getCurrentEnvironment } from '../../environments/environment';
import { IMessage } from '../models/game/message';

@Injectable()
export class MessageService {
	protected ENVIRONMENT = getCurrentEnvironment(Collections.message);

	constructor(private db: AngularFirestore) {	}

	public setUpMessageDocument(gameId: string) {
		const EMPTY_MESSAGE_DATA: IMessage[] = [];
		this.db.collection(this.ENVIRONMENT).doc(gameId).set({ messages: EMPTY_MESSAGE_DATA });
	}

	public sendMessage(message: string, gameId: string, sender?: string): Observable<any> {
		return this.db.collection(this.ENVIRONMENT).doc(gameId).get().pipe(
			map((data) => (data.data().messages as IMessage[])),
			tap((messageData) => {
				const NEW_MESSAGE: IMessage = {
					message,
					time: new Date,
					number: messageData.length + 1,
					sender: sender ? sender : 'System',
				};
				const UPDATED_MESSAGES: IMessage[] = messageData;
				UPDATED_MESSAGES.push(NEW_MESSAGE);

				this.db.collection(this.ENVIRONMENT).doc(gameId).set({
					messages: UPDATED_MESSAGES,
				});
			}),
		);
	}

	public listenToMessages(id: string) {
		return this.db.collection(this.ENVIRONMENT).doc(id).valueChanges();
	}
}
