import { Class } from './class';
import { IStats } from './stats';
import { IAbilities } from './abilities';

export interface ICharacter {
	name: string;
	class: Class;
	description: string;
}

export interface IActiveCharacter extends ICharacter {
	stats: IStats;
	alive: boolean;
	abilities: IAbilities;
}
