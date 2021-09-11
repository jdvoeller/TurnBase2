export interface IMessage {
	message: string;
	time: Date;
	number: number;
	sender: string;
}

export interface IFireBaseMessages {
	messages: IMessage[];
}
