import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';
import { GameService } from 'src/app/services/gameService.service';
import { IMessage } from '../../../../models/game/message';

@Component({
	selector: 'message-dialog',
	templateUrl: 'messageDialog.component.html',
	styleUrls: ['messageDialog.component.css'],
})

export class MessageDialogComponent {
	public message: string;
	constructor(
		private dialogRef: MatDialogRef<MessageDialogComponent>,
		private gameService: GameService,
		@Inject(MAT_DIALOG_DATA) public messageNumber: number,
	) { }

	public sendMessage() {
		const message: IMessage = {
			message: this.message,
			time: new Date(),
			number: this.messageNumber,
		};
		// this.gameService.sendMessage(message).then((data) => {
		// 	console.log(data);
		// 	this.dialogRef.close();
		// });
	}

}
