import { NgModule } from '@angular/core';
import { GameBoardModule } from '../gameBoard/gameBoard.module';

import { TestGameComponent } from './testGame.component';

@NgModule({
	imports: [
		GameBoardModule,
	],
	exports: [TestGameComponent],
	declarations: [TestGameComponent],
	providers: [],
})
export class TestGameModule { }
