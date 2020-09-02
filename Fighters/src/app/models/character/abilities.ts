export interface IAbilities {
	abilityOne: IAbility;
	abilityTwo: IAbility;
	abilityThree: IAbility;
}

export interface IAbility {
	name: string;
	rank: AbilityRank;
	abilityPower: number;
	attackDamage: number;
	active: boolean;
	special?: boolean;
}

export enum AbilityRank {
	One = 'One',
	Two = 'Two',
	Three = 'Three',
}
