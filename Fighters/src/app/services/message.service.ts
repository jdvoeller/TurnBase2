import { Injectable } from '@angular/core';

import { IGame } from '../models/game/game';
import { IMessage } from '../models/game/message';
import { IPersonalPlayerDetails } from '../models/player';
import { GameService } from './game.service';

@Injectable()
export class MessageService {
	constructor(private gameService: GameService) {}

	public sendMessage(message: string, game: IGame, playerDetails: IPersonalPlayerDetails) {
		// tslint:disable-next-line
		const updatedMessages: IMessage[] = [...game.messages];
		updatedMessages.push({
			message: message,
			time: new Date,
			number: updatedMessages.length + 1,
			sender: playerDetails.player.name,
		});

		const updatedGame: IGame = {
			...game,
			messages: updatedMessages,
		};
		this.gameService.updateGame(updatedGame);
	}
}
