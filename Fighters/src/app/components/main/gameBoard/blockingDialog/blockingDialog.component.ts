import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
	selector: 'blocking-dialog',
	templateUrl: 'blockingDialog.component.html',
	styleUrls: ['blockingDialog.component.css'],
})

export class BlockingDialogComponent {
	constructor(
		private dialogRef: MatDialogRef<BlockingDialogComponent>,
	) { }

	public close(action: string) {
		this.dialogRef.close(action);
	}
}
