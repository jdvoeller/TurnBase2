import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
	selector: 'your-turn-dialog',
	templateUrl: 'yourTurnDialog.component.html',
	styleUrls: ['yourTurnDialog.component.css'],
})

export class YourTurnDialogComponent {
	constructor(
		public dialogRef: MatDialogRef<YourTurnDialogComponent>,
	) { }

	public closeAll() {
		this.dialogRef.close(true);
	}

}
