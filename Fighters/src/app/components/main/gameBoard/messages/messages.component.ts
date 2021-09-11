import { Component, Input } from '@angular/core';

import { IMessage } from '../../../../models/game/message';

@Component({
	selector: 'messages',
	templateUrl: 'messages.component.html',
	styleUrls: ['messages.component.css'],
})
export class MessagesComponent {
	@Input() public messages: IMessage[];
	constructor() { }

}
