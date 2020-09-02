import { AbilityRank } from '../character/abilities';
import { Class } from '../character/class';
import { ICharacter, IActiveCharacter } from '../character/character';

/**
 * @Name Tyga
 * @Class Paladin
 */
export let Tyga: ICharacter = {
	name: 'Tyga',
	class: Class.Paladin,
	description: ``,
};
/**
 * @Name Tyga
 * @Class Paladin
 */
export let TygaActive: IActiveCharacter = {
	...Tyga,
	stats: {
		health: 100,
		attackDamage: 13,
		armor: 40,
		magicResist: 40,
		abilityPower: 7,
		invulnerable: false,
	},
	alive: true,
	abilities: {
		abilityOne: {
			name: 'Ferocious Punch',
			rank: AbilityRank.One,
			abilityPower: 2,
			attackDamage: 8,
			active: false,
		},
		abilityTwo: {
			name: 'Striped Kick',
			rank: AbilityRank.One,
			abilityPower: 8,
			attackDamage: 2,
			active: false,
		},
		abilityThree: {
			name: 'Volley of Fists',
			rank: AbilityRank.One,
			abilityPower: 12,
			attackDamage: 5,
			active: false,
			special: true,
		}
	}
};


/**
 * @Name Grunt
 * @Class Warrior
 */
export let Grunt: ICharacter = {
	name: 'Grunt',
	class: Class.Warrior,
	description: ``,
};
/**
 * @Name Grunt
 * @Class Warrior
 */
export let GruntActive: IActiveCharacter = {
	...Grunt,
	stats: {
		health: 100,
		attackDamage: 25,
		armor: 40,
		magicResist: 20,
		abilityPower: 5,
		invulnerable: false,
	},
	alive: true,
	abilities: {
		abilityOne: {
			name: 'Sword Slash',
			rank: AbilityRank.One,
			abilityPower: 2,
			attackDamage: 8,
			active: false,
		},
		abilityTwo: {
			name: 'Double stab',
			rank: AbilityRank.One,
			abilityPower: 8,
			attackDamage: 2,
			active: false,
		},
		abilityThree: {
			name: 'Whirl strike',
			rank: AbilityRank.One,
			abilityPower: 12,
			attackDamage: 5,
			active: false,
			special: true,
		}
	}
};

export const ALL_CHARACTERS: ICharacter[] = [
	Tyga,
	Grunt,
];

export const ALL_ACTIVE_CHARACTERS: IActiveCharacter[] = [
	TygaActive,
	GruntActive,
];
