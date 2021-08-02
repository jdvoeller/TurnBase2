export interface IItem {
	icon: string;
	name: string;
	cost: number;
	description: string;
	attackDamage?: number;
	magicDamage?: number;
	magicResist?: number;
	armorResist?: number;
	critBonus?: boolean;
	health?: number;
}

const LIGHTNING_ROD_DAMAGE = 3;
const HAMON_CHI_DAMAGE = 8;
const STEEL_CAGE_ARMOR = 8;
const CURIOUS_CLOAK_MR = 8;
const HYPERTEX_ATTACK_DAMAGE = 4;
const HYPERTEX_MAGIC_DAMAGE = 4;
const SONIC_BEAM_DAMAGE = 5;
const FOCUSED_CHI_ARMOR = 4;
const FOCUSED_CHI_MR = 4;

export const GAME_ITEMS: IItem[] = [
	{
		icon: 'bolt',
		name: 'Lightning Rod',
		cost: 3,
		attackDamage: LIGHTNING_ROD_DAMAGE,
		critBonus: true,
		description: `Every attack, a lightning bolt strikes your enemy for an extra ${LIGHTNING_ROD_DAMAGE} damage. Crit chance increased.`,
	},
	{
		icon: 'pan_tool',
		name: 'Hamon Chi',
		cost: 5,
		magicDamage: HAMON_CHI_DAMAGE,
		description: `In the name of JOJO: Develop hamon energy that increase your magic damage by ${HAMON_CHI_DAMAGE}.`
	},
	{
		icon: 'lock',
		name: 'Steel Cage',
		cost: 2,
		armorResist: STEEL_CAGE_ARMOR,
		description: `Mighty chasity belt that gives you ${STEEL_CAGE_ARMOR} extra armor.`,
	},
	{
		icon: 'account_circle',
		name: 'Curious Cloak',
		cost: 2,
		magicResist: CURIOUS_CLOAK_MR,
		description: `A secret cloak that glows a vibrant purple... Seems to give ${CURIOUS_CLOAK_MR} extra magic resist.`,
	},
	{
		icon: 'mediation',
		name: 'Hypertex Gun',
		cost: 5,
		attackDamage: HYPERTEX_ATTACK_DAMAGE,
		magicDamage: HYPERTEX_MAGIC_DAMAGE,
		description: `This gun infused with magic & physical damage. Gives ${HYPERTEX_ATTACK_DAMAGE} attack damage & ${HYPERTEX_MAGIC_DAMAGE}.`,
	},
	{
		icon: 'contactless',
		name: 'Sonic Beam',
		cost: 5,
		magicDamage: SONIC_BEAM_DAMAGE,
		critBonus: true,
		description: `Powerful magic beam that increases damage by ${SONIC_BEAM_DAMAGE}.`,
	},
	{
		icon: 'fullscreen_exit',
		name: 'Focused Chi',
		cost: 4,
		magicResist: FOCUSED_CHI_ARMOR,
		armorResist: FOCUSED_CHI_MR,
		description: `Channelled chi that gives ${FOCUSED_CHI_MR} magic resist & ${FOCUSED_CHI_ARMOR} armor.`,
	},
];
