import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'cancel-and-submit',
	templateUrl: 'cancelAndSubmit.component.html',
	styleUrls: ['cancelAndSubmit.component.css']
})

export class CancelAndSubmitComponent {
	@Input() public dialog = false;
	@Input() public dialogRef: MatDialogRef<any>;
	@Input() public submitFunction: () => {};
	@Input() public cancelFunction: () => { };

	public cancel() {
		if (this.dialog && this.dialogRef) {
			this.dialogRef.close();
		} else {
			this.cancelFunction();
		}
	}
}
