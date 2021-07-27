import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IGame } from 'src/app/models/game/game';
import { GameService } from 'src/app/services/gameService.service';
import { IMessage } from '../../../../models/game/message';

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
		private gameService: GameService,
		@Inject(MAT_DIALOG_DATA) public data: IMessageData,
	) { }

	public sendMessage() {
		const newMessage: IMessage = {
			message: this.message,
			time: new Date(),
			number: this.data.game.messages.length + 1,
			sender: this.data.sender,
		};
		const updatedMessages: IMessage[] = this.data.game.messages;
		updatedMessages.push(newMessage);

		const updatedGame: IGame = {
			...this.data.game,
			messages: updatedMessages,
		};
		this.gameService.updateGame(updatedGame).then(() => this.dialogRef.close());
	}

}
