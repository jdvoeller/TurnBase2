import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';
import { IGame } from 'src/app/models/game/game';

@Component({
	selector: 'join-game',
	templateUrl: 'joinGame.component.html',
	styleUrls: ['joinGame.component.css'],
})

export class JoinGameComponent {
	public displayedColumns: string[] = ['roomName', 'hostName', 'join'];
	public dataSource: MatTableDataSource<any>;


	constructor(private db: AngularFirestore) {
		this.db.collection('/games').valueChanges().subscribe((games) => {
			// tslint:disable-next-line
			let element_data = [];
			games.forEach((game: IGame) => element_data.push({
				roomName: game.roomName,
				hostName: game.hostName,
				join: '',
			}));
			this.dataSource = new MatTableDataSource(element_data);
		});
	}
}
