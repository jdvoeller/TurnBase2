export interface IItemTotals {
	magicDamage?: number;
	magicResist?: number;
	attackDamage?: number;
	armorResist?: number;
	health?: number;
}

export interface IItem extends IItemTotals {
	icon: string;
	name: string;
	cost: number;
	description: string;
	critBonus?: boolean;
}

export enum ItemNames {
	healthPotion = 'Health Potion',
	xRayEyes = 'X-Ray Eyes',
	xRayPeak = 'X-Ray Peak',
	lightningRod = 'Lightning Rod',
	hamonChi = 'Hamon Chi',
	steelCage = 'Steel Cage',
	curiousCloak = 'Curious Cloak',
	hypertexGun = 'Hypertex Gun',
	claymore = 'claymore',
	sonicBeam = 'Sonic Beam',
	focusedChi = 'Focused Chi',
}

// HEALTH
const HEALTH_POTION_HEALTH = 10;

// ATTACK DAMAGE
const LIGHTNING_ROD_ATTACK_DAMAGE = 4;
const HYPERTEX_ATTACK_DAMAGE = 5;
const CLAYMORE_ATTACK_DAMAGE = 8;

// MAGIC DAMAGE
const HAMON_CHI_MAGIC_DAMAGE = 8;
const HYPERTEX_MAGIC_DAMAGE = 4;
const SONIC_BEAM_MAGIC_DAMAGE = 5;

// ARMOR RESIST
const STEEL_CAGE_ARMOR = 8;
const FOCUSED_CHI_ARMOR = 4;

// MAGIC RESIST
const CURIOUS_CLOAK_MR = 8;
const FOCUSED_CHI_MR = 4;


export const GAME_ITEMS: IItem[] = [
	{
		icon: 'healing',
		name: ItemNames.healthPotion,
		cost: 2,
		health: HEALTH_POTION_HEALTH,
		description: `Heal yourself for ${HEALTH_POTION_HEALTH} hp!`,
	},
	{
		icon: 'folder_shared',
		name: ItemNames.xRayEyes,
		cost: 4,
		description: `See through your opponent and reveal their hidden stats!`,
	},
	{
		icon: 'contact_page',
		name: ItemNames.xRayPeak,
		cost: 1,
		description: `Temporarily see your opponents hidden stats!`,
	},
	{
		icon: 'bolt',
		name: ItemNames.lightningRod,
		cost: 3,
		attackDamage: LIGHTNING_ROD_ATTACK_DAMAGE,
		critBonus: true,
		description: `Every attack, a lightning bolt strikes your enemy for an extra ${LIGHTNING_ROD_ATTACK_DAMAGE} attack damage. Crit chance increased.`,
	},
	{
		icon: 'pan_tool',
		name: ItemNames.hamonChi,
		cost: 5,
		magicDamage: HAMON_CHI_MAGIC_DAMAGE,
		description: `In the name of JOJO: Develop hamon energy that increase your magic damage by ${HAMON_CHI_MAGIC_DAMAGE}.`
	},
	{
		icon: 'lock',
		name: ItemNames.steelCage,
		cost: 2,
		armorResist: STEEL_CAGE_ARMOR,
		description: `Mighty chasity belt that gives you ${STEEL_CAGE_ARMOR} extra armor.`,
	},
	{
		icon: 'account_circle',
		name: ItemNames.curiousCloak,
		cost: 2,
		magicResist: CURIOUS_CLOAK_MR,
		description: `A secret cloak that glows a vibrant purple... Seems to give ${CURIOUS_CLOAK_MR} extra magic resist.`,
	},
	{
		icon: 'mediation',
		name: ItemNames.hypertexGun,
		cost: 5,
		attackDamage: HYPERTEX_ATTACK_DAMAGE,
		magicDamage: HYPERTEX_MAGIC_DAMAGE,
		description: `Infused shotgun. Gives ${HYPERTEX_ATTACK_DAMAGE} attack damage & ${HYPERTEX_MAGIC_DAMAGE} magic damage.`,
	},
	{
		icon: 'contactless',
		name: ItemNames.sonicBeam,
		cost: 5,
		magicDamage: SONIC_BEAM_MAGIC_DAMAGE,
		critBonus: true,
		description: `Powerful magic beam that increases magic damage by ${SONIC_BEAM_MAGIC_DAMAGE}.`,
	},
	{
		icon: 'restaurant',
		name: ItemNames.claymore,
		cost: 5,
		attackDamage: CLAYMORE_ATTACK_DAMAGE,
		critBonus: true,
		description: `9 foot sword that pumbles your enemy for an extra ${CLAYMORE_ATTACK_DAMAGE} attack damage.`,
	},
	{
		icon: 'fullscreen_exit',
		name: ItemNames.focusedChi,
		cost: 4,
		magicResist: FOCUSED_CHI_ARMOR,
		armorResist: FOCUSED_CHI_MR,
		description: `Channelled chi that gives ${FOCUSED_CHI_MR} magic resist & ${FOCUSED_CHI_ARMOR} armor.`,
	},
];
