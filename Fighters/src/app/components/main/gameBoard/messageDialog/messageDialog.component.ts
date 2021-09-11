import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { IGame } from '../../../../models/game/game';
import { MessageService } from '../../../../services/message.service';

export interface IMessageData {
	game: IGame;
	sender: string;
}

@Component({
	selector: 'message-dialog',
	templateUrl: 'messageDialog.component.html',
	styleUrls: ['messageDialog.component.css'],
})

export class MessageDialogComponent {
	public message: string;
	constructor(
		private dialogRef: MatDialogRef<MessageDialogComponent>,
		private messageService: MessageService,
		@Inject(MAT_DIALOG_DATA) public data: IMessageData,
	) { }

	public sendMessage() {
		this.messageService.sendMessage(this.message, this.data.game.id, this.data.sender).subscribe(() => {
			this.dialogRef.close();
		});
	}

}
