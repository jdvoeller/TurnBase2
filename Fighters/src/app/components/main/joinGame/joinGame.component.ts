import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';
import { IGame } from 'src/app/models/game/game';

const ELEMENT_DATA = [
	{roomName: 1, name: 'Hydrogen', weight: 1.0079 },
	{roomName: 2, name: 'Helium', weight: 4.0026 },
	{roomName: 3, name: 'Lithium', weight: 6.941 },
	{roomName: 4, name: 'Beryllium', weight: 9.0122 },
	{roomName: 5, name: 'Boron', weight: 10.811 },
	{roomName: 6, name: 'Carbon', weight: 12.0107 },
	{roomName: 7, name: 'Nitrogen', weight: 14.0067 },
	{roomName: 8, name: 'Oxygen', weight: 15.9994 },
	{roomName: 9, name: 'Fluorine', weight: 18.9984 },
	{roomName: 10, name: 'Neon', weight: 20.1797 },
];

@Component({
	selector: 'join-game',
	templateUrl: 'joinGame.component.html',
	styleUrls: ['joinGame.component.css'],
})

export class JoinGameComponent implements AfterViewInit {
	public displayedColumns: string[] = ['roomName', 'name', 'weight'];
	public dataSource: MatTableDataSource<IGame>;
	// = new MatTableDataSource(ELEMENT_DATA);


	constructor(private db: AngularFirestore) {
		this.db.collection('/games').valueChanges().subscribe((games) => {
			console.log(games);
			// tslint:disable-next-line
			let element_data: IGame[] = [];
			games.forEach((game) => element_data.push(game as IGame));
			this.dataSource = new MatTableDataSource(element_data);
		});
	}

	@ViewChild(MatSort) sort: MatSort;

	ngAfterViewInit() {
		// this.dataSource.sort = this.sort;
	}
}
